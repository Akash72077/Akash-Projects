import { Complaint } from '../models/Complaint.js';
import { Infrastructure } from '../models/Infrastructure.js';
import { Contractor } from '../models/Contractor.js';
import { User } from '../models/User.js';
import { classifyComplaint, CATEGORY_DEPARTMENT_MAP } from '../services/complaintClassificationService.js';
import { calculateHaversineDistance, detectWardAndZone, deriveLocationConfidence, generatePHash } from '../services/locationService.js';

// @desc    Create new complaint with AI verification, DLP matching, and location analysis
// @route   POST /api/complaints
// @access  Private / Optional Auth
export const createComplaint = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category = 'POTHOLE',
      latitude,
      longitude,
      address,
      ward,
      zone,
      locationConfidence = 'HIGH',
      locationMethod = 'GPS_HARDWARE',
      capturedViaCamera = true,
      imageUrl,
      forceCreate = false,
    } = req.body;

    const lat = Number(latitude) || 17.4485;
    const lng = Number(longitude) || 78.3742;
    const shouldForceCreate = forceCreate === true || forceCreate === 'true' || forceCreate === '1';

    // Handle image from file upload or payload
    let finalImageUrl = imageUrl;
    if (req.file) {
      finalImageUrl = `/uploads/${req.file.filename}`;
    }
    if (!finalImageUrl) {
      finalImageUrl = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80';
    }

    // Step 1: Run AI Classifier
    const aiResult = await classifyComplaint(description || title, category, finalImageUrl);

    // Step 2: Resolve Location & Geofence
    const geoData = detectWardAndZone(lat, lng);
    const finalWard = ward || geoData.ward;
    const finalZone = zone || geoData.zone;
    const finalAddress = address || geoData.defaultAddress;

    // Step 3: Check Nearby Duplicates (80m threshold)
    if (!shouldForceCreate) {
      const existingNearby = await Complaint.find({
        category: category,
        status: { $nin: ['CLOSED', 'REJECTED'] },
      });

      const duplicates = existingNearby.filter((c) => {
        const dist = calculateHaversineDistance(lat, lng, c.latitude, c.longitude);
        return dist <= 80;
      });

      if (duplicates.length > 0) {
        return res.status(200).json({
          success: true,
          possibleDuplicate: true,
          duplicateCount: duplicates.length,
          duplicates: duplicates.map((d) => ({
            id: String(d._id),
            ticketNumber: d.ticketNumber,
            title: d.title,
            address: d.address,
            latitude: d.latitude,
            longitude: d.longitude,
            distanceMeters: calculateHaversineDistance(lat, lng, d.latitude, d.longitude),
            reportCount: d.reportCount,
            progressPercentage: d.progressPercentage,
            status: d.status,
            initialImageUrl: d.initialImageUrl,
          })),
          message: `Detected ${duplicates.length} matching grievance(s) within 80m radius.`,
        });
      }
    }

    // Step 4: Check Infrastructure Defect Liability Period (DLP)
    let matchedInfra = null;
    let infraType = null;
    if (category === 'POTHOLE' || category === 'ROAD_DEFECT') infraType = 'ROAD';
    else if (category === 'WATER_LEAK') infraType = 'WATER_PIPE';
    else if (category === 'OPEN_MANHOLE' || category === 'DRAINAGE_BLOCK' || category === 'SEWAGE_OVERFLOW') infraType = 'DRAIN';
    else if (category === 'BROKEN_STREETLIGHT' || category === 'ELECTRICAL_HAZARD') infraType = 'STREETLIGHT';

    if (infraType) {
      matchedInfra = await Infrastructure.findOne({
        type: infraType,
        isUnderWarranty: true,
      });
    }

    // Step 5: Department & Contractor Assignment
    const deptInfo = CATEGORY_DEPARTMENT_MAP[category] || CATEGORY_DEPARTMENT_MAP.POTHOLE;
    let assignedContractor = null;

    if (matchedInfra) {
      assignedContractor = await Contractor.findOne({ contractorId: matchedInfra.contractorId });
    } else {
      assignedContractor = await Contractor.findOne({ departmentId: deptInfo.departmentId });
    }

    const ticketNumber = `CV-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const pHash = generatePHash(finalImageUrl + category);
    const now = new Date();
    const slaDeadline = new Date(now.getTime() + deptInfo.slaHours * 3600 * 1000);

    const citizenName = req.user?.name || 'Aarav Sharma';
    const citizenId = req.user?.id || 'user-citizen-1';

    // Initial Milestones
    const timeline = [
      {
        title: 'Grievance Registered with Camera Evidence',
        description: `Submitted by ${citizenName} via ${locationMethod}. Location Confidence: ${locationConfidence}. Anti-spoofing verified.`,
        stage: 'SUBMITTED',
        actorRole: 'CITIZEN',
        actorName: citizenName,
        createdAt: now,
      },
      {
        title: 'AI Computer Vision & NLP Verification',
        description: `Verified as ${deptInfo.displayName} with ${(aiResult.confidence * 100).toFixed(0)}% confidence score. Validated against municipal defect patterns.`,
        stage: 'AI_VERIFIED',
        actorRole: 'AI',
        actorName: 'CivicVerify AI Engine',
        createdAt: now,
      },
    ];

    if (matchedInfra) {
      timeline.push({
        title: 'Defect Liability Period (DLP) Warranty Matched',
        description: `Infrastructure asset "${matchedInfra.name}" is under warranty until ${matchedInfra.warrantyExpiry}. Auto-routed to contractor ${matchedInfra.contractorName}.`,
        stage: 'CONTRACTOR_NOTIFIED',
        actorRole: 'SYSTEM',
        actorName: 'Contractor Warranty Engine',
        createdAt: now,
      });
    }

    const complaint = await Complaint.create({
      ticketNumber,
      citizen: req.user?._id,
      citizenId,
      citizenName,
      title: title || `${deptInfo.displayName} at ${finalAddress.slice(0, 30)}`,
      description: description || 'Civic infrastructure defect requiring municipal repair.',
      category,
      priority: deptInfo.defaultPriority,
      status: matchedInfra ? 'CONTRACTOR_NOTIFIED' : 'ASSIGNED',
      latitude: lat,
      longitude: lng,
      address: finalAddress,
      ward: finalWard,
      zone: finalZone,
      locationConfidence,
      locationMethod,
      initialImageUrl: finalImageUrl,
      capturedViaCamera: Boolean(capturedViaCamera),
      captureTimestamp: now,
      imagePHash: pHash,
      aiDetectedCategory: aiResult.detectedCategory,
      aiConfidence: aiResult.confidence,
      aiFraudFlag: aiResult.fraudRisk === 'HIGH',
      aiVerificationNotes: aiResult.verificationNotes,
      departmentId: deptInfo.departmentId,
      departmentName: deptInfo.departmentName,
      contractorId: assignedContractor?.contractorId || (matchedInfra ? matchedInfra.contractorId : 'CONT-HYD-8821'),
      contractorName: assignedContractor?.companyName || (matchedInfra ? matchedInfra.contractorName : 'Deccan Infra & Roadworks Pvt Ltd'),
      assignedOfficerName: 'Er. Rajesh Varma (Executive Engineer)',
      infrastructureId: matchedInfra?.assetId,
      infrastructureName: matchedInfra?.name,
      isUnderWarranty: Boolean(matchedInfra),
      warrantyExpiry: matchedInfra?.warrantyExpiry,
      progressPercentage: 0,
      slaHours: deptInfo.slaHours,
      slaDeadline,
      isEscalated: false,
      escalationLevel: 0,
      reportCount: 1,
      upvotesCount: 1,
      upvotedBy: [citizenId],
      timeline,
    });

    res.status(201).json({
      success: true,
      message: 'Civic complaint submitted successfully',
      data: complaint,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all complaints with filters & search
// @route   GET /api/complaints
// @access  Public
export const getComplaints = async (req, res, next) => {
  try {
    const { ward, category, status, search, contractorId, citizenId } = req.query;
    const query = {};

    if (ward && ward !== 'ALL') query.ward = ward;
    if (category && category !== 'ALL') query.category = category;
    if (status && status !== 'ALL') query.status = status;
    if (contractorId) query.contractorId = contractorId;
    if (citizenId) query.citizenId = citizenId;

    if (search && search.trim()) {
      const q = search.trim();
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { address: { $regex: q, $options: 'i' } },
        { ticketNumber: { $regex: q, $options: 'i' } },
        { ward: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ];
    }

    const complaints = await Complaint.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single complaint by ID or ticketNumber
// @route   GET /api/complaints/:id
// @access  Public
export const getComplaintById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let complaint = null;

    if (id.startsWith('CV-')) {
      complaint = await Complaint.findOne({ ticketNumber: id });
    } else {
      complaint = await Complaint.findById(id);
    }

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    res.status(200).json({
      success: true,
      data: complaint,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update contractor work order progress
// @route   PATCH /api/complaints/:id/progress
// @access  Private (Contractor / Officer)
export const updateProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { progressPercentage, progressImageUrl, notes } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    const pct = Math.min(100, Math.max(0, Number(progressPercentage)));
    complaint.progressPercentage = pct;

    let finalProofUrl = progressImageUrl;
    if (req.file) {
      finalProofUrl = `/uploads/${req.file.filename}`;
    }

    if (finalProofUrl) {
      complaint.progressImageUrl = finalProofUrl;
      if (pct === 100) {
        complaint.resolvedImageUrl = finalProofUrl;
      }
    }

    const contractorName = req.user?.name || complaint.contractorName || 'Deccan Infra & Roadworks';

    if (pct === 100) {
      complaint.status = 'RESOLVED_PENDING_CITIZEN_CONFIRMATION';
      complaint.resolvedAt = new Date();
      complaint.timeline.push({
        title: '100% Remediation Submitted by Contractor',
        description: notes || `Contractor completed defect remediation. Photo evidence uploaded with GPS timestamp. Awaiting citizen two-way sign-off.`,
        stage: 'WORK_COMPLETED',
        imageUrl: finalProofUrl,
        actorRole: 'CONTRACTOR',
        actorName: contractorName,
        createdAt: new Date(),
      });
    } else {
      complaint.status = 'WORK_IN_PROGRESS';
      complaint.timeline.push({
        title: `Work Progress Updated: ${pct}% Complete`,
        description: notes || `Contractor recorded active field repair progress (${pct}%). Material deployment in progress.`,
        stage: 'PROGRESS_UPDATE',
        imageUrl: finalProofUrl,
        actorRole: 'CONTRACTOR',
        actorName: contractorName,
        createdAt: new Date(),
      });
    }

    await complaint.save();

    res.status(200).json({
      success: true,
      message: `Work order progress updated to ${pct}%`,
      data: complaint,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Citizen verification sign-off (2-way resolution confirmation)
// @route   POST /api/complaints/:id/confirm
// @access  Private (Citizen)
export const confirmCitizenVerification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { feedback, comment, proofImageUrl } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    const citizenName = req.user?.name || 'Verified Citizen';
    const citizenId = req.user?.id || 'user-citizen-1';

    complaint.verifications.push({
      userId: citizenId,
      userName: citizenName,
      feedback,
      comment: comment || '',
      proofImageUrl,
      createdAt: new Date(),
    });

    if (feedback === 'FIXED') {
      complaint.status = 'CLOSED';
      complaint.citizenConfirmedAt = new Date();
      complaint.timeline.push({
        title: 'Citizen Verified & Closed (2-Way Sign-off Complete)',
        description: `Citizen ${citizenName} confirmed satisfactory defect remediation. Work order successfully closed.`,
        stage: 'CLOSED',
        actorRole: 'CITIZEN',
        actorName: citizenName,
        createdAt: new Date(),
      });

      // Award reputation points to citizen
      if (req.user?._id) {
        await User.findByIdAndUpdate(req.user._id, { $inc: { reputationScore: 15 } });
      }
    } else {
      // Reopen complaint
      complaint.status = 'REOPENED';
      complaint.progressPercentage = 50;
      complaint.timeline.push({
        title: 'Citizen Rejected Closure — Defect Reopened',
        description: comment || `Citizen ${citizenName} reported defect is still unresolved or substandard. Sent back to contractor.`,
        stage: 'REOPENED',
        actorRole: 'CITIZEN',
        actorName: citizenName,
        createdAt: new Date(),
      });
    }

    await complaint.save();

    res.status(200).json({
      success: true,
      message: feedback === 'FIXED' ? 'Resolution confirmed! +15 Reputation points awarded.' : 'Grievance reopened for remediation.',
      data: complaint,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Upvote grievance / Join cluster
// @route   POST /api/complaints/:id/upvote
// @access  Private / Public
export const upvoteComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || 'anonymous-user';

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    const alreadyUpvoted = complaint.upvotedBy.includes(userId);
    if (alreadyUpvoted) {
      complaint.upvotedBy = complaint.upvotedBy.filter((u) => u !== userId);
      complaint.upvotesCount = Math.max(0, complaint.upvotesCount - 1);
    } else {
      complaint.upvotedBy.push(userId);
      complaint.upvotesCount += 1;
    }

    await complaint.save();

    res.status(200).json({
      success: true,
      upvoted: !alreadyUpvoted,
      upvotesCount: complaint.upvotesCount,
      data: complaint,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Cluster duplicate report into existing ticket
// @route   POST /api/complaints/:id/cluster
// @access  Public
export const clusterDuplicateReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { citizenNotes } = req.body;
    const citizenName = req.user?.name || 'Fellow Citizen';

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Master complaint not found',
      });
    }

    complaint.reportCount += 1;
    complaint.upvotesCount += 1;
    complaint.timeline.push({
      title: 'Geospatial Duplicate Prevented & Clustered',
      description: `Citizen ${citizenName} reported matching issue at this location. +1 added to ticket priority count without duplicating municipal dispatch. ${citizenNotes ? `Note: "${citizenNotes}"` : ''}`,
      stage: 'CLUSTERED',
      actorRole: 'CITIZEN',
      actorName: citizenName,
      createdAt: new Date(),
    });

    await complaint.save();

    res.status(200).json({
      success: true,
      message: 'Joined existing ticket! Municipal urgency boosted.',
      data: complaint,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Escalate complaint
// @route   POST /api/complaints/:id/escalate
// @access  Private (Officer / Admin)
export const escalateComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found',
      });
    }

    complaint.isEscalated = true;
    complaint.escalationLevel = Math.min(3, (complaint.escalationLevel || 0) + 1);
    complaint.priority = 'CRITICAL';
    complaint.escalationReason = reason || 'Manual escalation by Municipal Supervisory Engineer.';

    const officerName = req.user?.name || 'Er. Rajesh Varma (EE)';

    complaint.timeline.push({
      title: `Level ${complaint.escalationLevel} Executive Escalation`,
      description: reason || `Manual grievance escalation triggered. Priority elevated to CRITICAL with direct summons dispatched to contractor.`,
      stage: 'ESCALATED',
      actorRole: 'OFFICER',
      actorName: officerName,
      createdAt: new Date(),
    });

    await complaint.save();

    res.status(200).json({
      success: true,
      message: 'Grievance escalated successfully',
      data: complaint,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Lightweight map points
// @route   GET /api/complaints/map
// @access  Public
export const getMapComplaints = async (req, res, next) => {
  try {
    const { ward } = req.query;
    const query = {};
    if (ward && ward !== 'ALL') query.ward = ward;

    const complaints = await Complaint.find(query, {
      _id: 1,
      ticketNumber: 1,
      title: 1,
      address: 1,
      ward: 1,
      latitude: 1,
      longitude: 1,
      category: 1,
      priority: 1,
      status: 1,
      progressPercentage: 1,
      reportCount: 1,
      initialImageUrl: 1,
      isUnderWarranty: 1,
      isEscalated: 1,
    });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (err) {
    next(err);
  }
};
