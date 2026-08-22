import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  Complaint,
  Contractor,
  Department,
  Infrastructure,
  AwarenessAlert,
  User,
  Role,
  ComplaintCategory,
  LocationConfidence,
  LocationMethod,
  TimelineEvent,
  VerificationFeedback
} from '../types';
import { 
  MOCK_COMPLAINTS, 
  MOCK_CONTRACTORS, 
  MOCK_DEPARTMENTS, 
  MOCK_INFRASTRUCTURE, 
  MOCK_ALERTS, 
  MOCK_USERS 
} from '../data/mockData';
import { calculateHaversineDistance, generatePHash } from '../utils/geo';
import { CATEGORY_DEPARTMENT_MAP } from '../utils/aiSimulator';

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface CivicContextType {
  currentUser: User;
  setCurrentRole: (role: Role) => void;
  complaints: Complaint[];
  departments: Department[];
  contractors: Contractor[];
  infrastructure: Infrastructure[];
  alerts: AwarenessAlert[];
  
  // Navigation & Modals
  activeTab: 'FEED' | 'MAP' | 'MY_REPORTS' | 'AUTHORITY' | 'CONTRACTOR' | 'ANALYTICS';
  setActiveTab: (tab: 'FEED' | 'MAP' | 'MY_REPORTS' | 'AUTHORITY' | 'CONTRACTOR' | 'ANALYTICS') => void;
  selectedWard: string;
  setSelectedWard: (ward: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  activeComplaintForModal: Complaint | null;
  setActiveComplaintForModal: (complaint: Complaint | null) => void;
  isComplaintWizardOpen: boolean;
  setIsComplaintWizardOpen: (open: boolean) => void;
  
  toast: ToastNotification | null;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  
  // Core Business Actions
  submitComplaint: (data: {
    title: string;
    description: string;
    category: ComplaintCategory;
    latitude: number;
    longitude: number;
    address: string;
    ward: string;
    zone: string;
    locationConfidence: LocationConfidence;
    locationMethod: LocationMethod;
    imageUrl: string;
    capturedViaCamera: boolean;
    aiConfidence?: number;
    aiNotes?: string;
  }) => Complaint;
  
  upvoteComplaint: (complaintId: string) => void;
  clusterDuplicateReport: (parentComplaintId: string, citizenNotes?: string) => void;
  
  updateContractorProgress: (
    complaintId: string, 
    progressPercentage: number, 
    progressImageUrl?: string, 
    notes?: string
  ) => void;
  
  submitCitizenVerification: (
    complaintId: string, 
    feedback: 'FIXED' | 'PARTIALLY_FIXED' | 'NOT_FIXED', 
    comment?: string, 
    proofImageUrl?: string
  ) => void;
  
  escalateComplaint: (complaintId: string, reason: string) => void;
  checkNearbyDuplicates: (lat: number, lng: number, category: ComplaintCategory) => Complaint[];
  resetData: () => void;
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

const STORAGE_KEY = 'civic_verify_state_v1';

export const CivicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved complaints', e);
      }
    }
    return MOCK_COMPLAINTS;
  });

  const [departments] = useState<Department[]>(MOCK_DEPARTMENTS);
  const [contractors] = useState<Contractor[]>(MOCK_CONTRACTORS);
  const [infrastructure] = useState<Infrastructure[]>(MOCK_INFRASTRUCTURE);
  const [alerts, setAlerts] = useState<AwarenessAlert[]>(MOCK_ALERTS);

  const [activeTab, setActiveTab] = useState<'FEED' | 'MAP' | 'MY_REPORTS' | 'AUTHORITY' | 'CONTRACTOR' | 'ANALYTICS'>('FEED');
  const [selectedWard, setSelectedWard] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [activeComplaintForModal, setActiveComplaintForModal] = useState<Complaint | null>(null);
  const [isComplaintWizardOpen, setIsComplaintWizardOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  }, [complaints]);

  // SLA Escalation Background Tick Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      setComplaints((prev) =>
        prev.map((c) => {
          if (c.status === 'CLOSED' || c.status === 'RESOLVED_PENDING_CITIZEN_CONFIRMATION') return c;
          const deadline = new Date(c.slaDeadline).getTime();
          if (now > deadline && !c.isEscalated && (c.priority === 'CRITICAL' || c.priority === 'HIGH')) {
            return {
              ...c,
              isEscalated: true,
              escalationLevel: Math.min(3, (c.escalationLevel || 0) + 1),
              escalationReason: `Automatic SLA Overdue Trigger: ${c.slaHours}h response window breached. Escalated to Zonal Authority.`,
              updatedAt: new Date().toISOString(),
              timeline: [
                ...c.timeline,
                {
                  id: `t-esc-${Date.now()}`,
                  complaintId: c.id,
                  title: `Level ${(c.escalationLevel || 0) + 1} Automated SLA Escalation`,
                  description: `SLA resolution deadline passed without closure proof. Alert dispatched to Municipal Zonal Office.`,
                  stage: 'ESCALATED',
                  actorRole: 'SYSTEM',
                  actorName: 'Automated Escalation Engine',
                  createdAt: new Date().toISOString(),
                }
              ]
            };
          }
          return c;
        })
      );
    }, 15000); // Check every 15s for demo

    return () => clearInterval(interval);
  }, []);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const newToast = { id: String(Date.now()), title, message, type };
    setToast(newToast);
    setTimeout(() => {
      setToast((current) => (current?.id === newToast.id ? null : current));
    }, 4500);
  };

  const setCurrentRole = (role: Role) => {
    const targetUser = MOCK_USERS.find((u) => u.role === role) || {
      id: `user-${role.toLowerCase()}`,
      name: role === 'OFFICER' ? 'Er. Rajesh Varma (EE)' : role === 'CONTRACTOR' ? 'Vikram Reddy (Deccan Infra)' : 'Aarav Sharma (Citizen)',
      email: `${role.toLowerCase()}@civicverify.org`,
      role,
      reputationScore: 120,
    };
    setCurrentUser(targetUser);
    showToast('Switched Perspective', `Now acting as ${targetUser.name} (${role})`, 'info');
  };

  // Find nearby complaints for duplicate clustering
  const checkNearbyDuplicates = (lat: number, lng: number, category: ComplaintCategory): Complaint[] => {
    return complaints.filter((c) => {
      if (c.status === 'CLOSED' || c.status === 'REJECTED') return false;
      if (c.category !== category) return false;
      const dist = calculateHaversineDistance(lat, lng, c.latitude, c.longitude);
      return dist <= 80; // Within 80 meters
    });
  };

  // Submit new complaint with auto-routing and DLP match
  const submitComplaint = (data: {
    title: string;
    description: string;
    category: ComplaintCategory;
    latitude: number;
    longitude: number;
    address: string;
    ward: string;
    zone: string;
    locationConfidence: LocationConfidence;
    locationMethod: LocationMethod;
    imageUrl: string;
    capturedViaCamera: boolean;
    aiConfidence?: number;
    aiNotes?: string;
  }): Complaint => {
    const deptInfo = CATEGORY_DEPARTMENT_MAP[data.category];
    const ticketId = `CV-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    const pHash = generatePHash(data.imageUrl + data.category);

    // Check if location falls under active infrastructure warranty (DLP)
    let matchedInfra: Infrastructure | undefined;
    if (data.category === 'POTHOLE' || data.category === 'ROAD_DEFECT') {
      matchedInfra = infrastructure.find((inf) => inf.type === 'ROAD' && inf.isUnderWarranty);
    } else if (data.category === 'WATER_LEAK') {
      matchedInfra = infrastructure.find((inf) => inf.type === 'WATER_PIPE' && inf.isUnderWarranty);
    } else if (data.category === 'OPEN_MANHOLE' || data.category === 'DRAINAGE_BLOCK') {
      matchedInfra = infrastructure.find((inf) => inf.type === 'DRAIN' && inf.isUnderWarranty);
    }

    const assignedContractor = matchedInfra 
      ? contractors.find((con) => con.id === matchedInfra?.contractorId)
      : contractors.find((con) => con.departmentId === deptInfo.departmentId);

    const nowIso = new Date().toISOString();
    const slaDeadlineIso = new Date(Date.now() + deptInfo.slaHours * 3600 * 1000).toISOString();

    const initialTimeline: TimelineEvent[] = [
      {
        id: `t-${ticketId}-1`,
        complaintId: `comp-${ticketId}`,
        title: 'Grievance Registered with Camera Evidence',
        description: `Submitted by ${currentUser.name} via ${data.locationMethod}. Location Confidence: ${data.locationConfidence}.`,
        stage: 'SUBMITTED',
        actorRole: 'CITIZEN' as const,
        actorName: currentUser.name,
        createdAt: nowIso,
      },
      {
        id: `t-${ticketId}-2`,
        complaintId: `comp-${ticketId}`,
        title: 'AI Computer Vision Verification',
        description: data.aiNotes || `Verified as ${deptInfo.displayName} with ${(Number(data.aiConfidence || 0.94) * 100).toFixed(0)}% confidence score.`,
        stage: 'AI_VERIFIED',
        actorRole: 'AI' as const,
        actorName: 'CivicVerify AI Engine',
        createdAt: nowIso,
      }
    ];

    if (matchedInfra) {
      initialTimeline.push({
        id: `t-${ticketId}-3`,
        complaintId: `comp-${ticketId}`,
        title: 'Defect Liability Period (DLP) Warranty Matched',
        description: `Infrastructure asset "${matchedInfra.name}" is under warranty until ${matchedInfra.warrantyExpiry}. Auto-routed to contractor ${matchedInfra.contractorName}.`,
        stage: 'CONTRACTOR_NOTIFIED',
        actorRole: 'SYSTEM' as const,
        actorName: 'Contractor Warranty Engine',
        createdAt: nowIso,
      });
    }

    const newComplaint: Complaint = {
      id: `comp-${Date.now()}`,
      ticketNumber: ticketId,
      title: data.title || `${deptInfo.displayName} at ${data.address.slice(0, 30)}`,
      description: data.description,
      category: data.category,
      priority: deptInfo.defaultPriority,
      status: matchedInfra ? 'CONTRACTOR_NOTIFIED' : 'ASSIGNED',
      latitude: data.latitude,
      longitude: data.longitude,
      address: data.address,
      ward: data.ward,
      zone: data.zone,
      locationConfidence: data.locationConfidence,
      locationMethod: data.locationMethod,
      initialImageUrl: data.imageUrl,
      capturedViaCamera: data.capturedViaCamera,
      captureTimestamp: nowIso,
      imagePHash: pHash,
      aiDetectedCategory: deptInfo.displayName,
      aiConfidence: data.aiConfidence || 0.95,
      aiFraudFlag: false,
      aiVerificationNotes: data.aiNotes || 'AI validated genuine camera capture signature.',
      departmentId: deptInfo.departmentId,
      departmentName: deptInfo.departmentName,
      contractorId: assignedContractor?.id,
      contractorName: assignedContractor?.companyName,
      assignedOfficerName: 'Er. Rajesh Varma (EE)',
      infrastructureId: matchedInfra?.id,
      infrastructureName: matchedInfra?.name,
      isUnderWarranty: matchedInfra?.isUnderWarranty || false,
      warrantyExpiry: matchedInfra?.warrantyExpiry,
      progressPercentage: 10,
      slaHours: deptInfo.slaHours,
      slaDeadline: slaDeadlineIso,
      isEscalated: false,
      escalationLevel: 0,
      reportCount: 1,
      upvotesCount: 1,
      hasUserUpvoted: true,
      timeline: initialTimeline,
      verifications: [],
      createdAt: nowIso,
      updatedAt: nowIso,
      citizenId: ''
    };

    setComplaints((prev) => [newComplaint, ...prev]);
    showToast('Grievance Created', `Ticket ${ticketId} registered and assigned to ${deptInfo.departmentName}.`, 'success');
    return newComplaint;
  };

  // Upvote complaint
  const upvoteComplaint = (complaintId: string) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          const hasUpvoted = c.hasUserUpvoted;
          const newCount = hasUpvoted ? Math.max(1, c.upvotesCount - 1) : c.upvotesCount + 1;
          return {
            ...c,
            upvotesCount: newCount,
            hasUserUpvoted: !hasUpvoted,
          };
        }
        return c;
      })
    );
  };

  // Cluster duplicate report into master ticket
  const clusterDuplicateReport = (parentComplaintId: string, citizenNotes?: string) => {
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === parentComplaintId) {
          const newReportCount = c.reportCount + 1;
          const newUpvotes = c.upvotesCount + 1;
          const nowIso = new Date().toISOString();
          const newTimelineEvent = {
            id: `t-dup-${Date.now()}`,
            complaintId: c.id,
            title: `Citizen Report Clustered (+1 Supporter)`,
            description: `${currentUser.name} reported matching defect at this coordinate. Total citizens reporting: ${newReportCount}. Note: "${citizenNotes || 'Confirmed active problem.'}"`,
            stage: c.status,
            actorRole: 'CITIZEN' as const,
            actorName: currentUser.name,
            createdAt: nowIso,
          };

          return {
            ...c,
            reportCount: newReportCount,
            upvotesCount: newUpvotes,
            hasUserUpvoted: true,
            timeline: [...c.timeline, newTimelineEvent],
            updatedAt: nowIso,
          };
        }
        return c;
      })
    );
    showToast('Report Clustered', `You joined ${parentComplaintId} cluster. You will receive live resolution updates.`, 'success');
  };

  // Contractor updates progress
  const updateContractorProgress = (
    complaintId: string,
    progressPercentage: number,
    progressImageUrl?: string,
    notes?: string
  ) => {
    const nowIso = new Date().toISOString();
    const isCompleted = progressPercentage >= 100;
    const newStatus = isCompleted ? 'RESOLVED_PENDING_CITIZEN_CONFIRMATION' : 'WORK_IN_PROGRESS';

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          const eventTitle = isCompleted
            ? 'Contractor Marked 100% Resolved (Awaiting Citizen Confirmation)'
            : `Repair Progress Updated to ${progressPercentage}%`;

          const eventDescription = notes || (isCompleted
            ? 'Contractor uploaded final completion photo proof. Dispatched confirmation request to reporting citizens.'
            : `Sub-base repair and material staging underway.`);

          const newTimelineEvent = {
            id: `t-prog-${Date.now()}`,
            complaintId: c.id,
            title: eventTitle,
            description: eventDescription,
            stage: newStatus,
            imageUrl: progressImageUrl,
            actorRole: 'CONTRACTOR' as const,
            actorName: currentUser.name,
            createdAt: nowIso,
          };

          return {
            ...c,
            progressPercentage,
            status: newStatus,
            progressImageUrl: progressImageUrl && !isCompleted ? progressImageUrl : c.progressImageUrl,
            resolvedImageUrl: isCompleted ? (progressImageUrl || c.resolvedImageUrl) : c.resolvedImageUrl,
            timeline: [...c.timeline, newTimelineEvent],
            updatedAt: nowIso,
          };
        }
        return c;
      })
    );

    showToast(
      isCompleted ? 'Resolution Submitted' : 'Progress Updated',
      isCompleted ? `Marked 100% complete. Awaiting citizen re-verification.` : `Progress set to ${progressPercentage}%.`,
      'success'
    );
  };

  // Citizen confirms resolution (Two-Way Accountability)
  const submitCitizenVerification = (
    complaintId: string,
    feedback: 'FIXED' | 'PARTIALLY_FIXED' | 'NOT_FIXED',
    comment?: string,
    proofImageUrl?: string
  ) => {
    const nowIso = new Date().toISOString();
    const isFixed = feedback === 'FIXED';
    const isPartiallyFixed = feedback === 'PARTIALLY_FIXED';
    
    let nextStatus: Complaint['status'] = 'CLOSED';
    let nextEscalationLevel = 0;
    let nextEscalated = false;

    if (!isFixed) {
      nextStatus = 'REOPENED';
      nextEscalated = true;
      nextEscalationLevel = 2; // Immediate escalation on dispute
    }

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          const verificationRecord: VerificationFeedback = {
            id: `v-${Date.now()}`,
            complaintId: c.id,
            userId: currentUser.id,
            userName: currentUser.name,
            feedback,
            comment,
            proofImageUrl,
            createdAt: nowIso,
          };

          const eventTitle = isFixed
            ? 'Citizen Verified & Closed Grievance'
            : isPartiallyFixed
            ? 'Citizen Reported Incomplete Work'
            : 'Citizen Disputed Resolution: Issue Still Exists!';

          const eventDescription = isFixed
            ? `Verified fixed by citizen ${currentUser.name}. Audit closed. Contractor SLA met.`
            : `Citizen reported: "${comment || 'Problem not resolved as claimed.'}". Penalty inspection initiated.`;

          const newTimelineEvent = {
            id: `t-ver-${Date.now()}`,
            complaintId: c.id,
            title: eventTitle,
            description: eventDescription,
            stage: nextStatus,
            imageUrl: proofImageUrl,
            actorRole: 'CITIZEN' as const,
            actorName: currentUser.name,
            createdAt: nowIso,
          };

          return {
            ...c,
            status: nextStatus,
            isEscalated: nextEscalated,
            escalationLevel: nextEscalationLevel,
            progressPercentage: isFixed ? 100 : 50,
            verifications: [...c.verifications, verificationRecord],
            timeline: [...c.timeline, newTimelineEvent],
            updatedAt: nowIso,
          };
        }
        return c;
      })
    );

    if (isFixed) {
      showToast('Grievance Closed', 'Thank you! You verified this repair. +15 Citizen Reputation Points earned.', 'success');
    } else {
      showToast('Grievance Reopened', 'Dispute recorded. Escalated to Executive Engineer for immediate inspection.', 'warning');
    }
  };

  // Manual escalation trigger
  const escalateComplaint = (complaintId: string, reason: string) => {
    const nowIso = new Date().toISOString();
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === complaintId) {
          const newLevel = Math.min(3, (c.escalationLevel || 0) + 1);
          const newTimelineEvent = {
            id: `t-esc-${Date.now()}`,
            complaintId: c.id,
            title: `Manual Escalation to Level ${newLevel}`,
            description: `Escalated by ${currentUser.name}. Reason: ${reason}`,
            stage: 'ESCALATED',
            actorRole: 'OFFICER' as const,
            actorName: currentUser.name,
            createdAt: nowIso,
          };

          return {
            ...c,
            isEscalated: true,
            escalationLevel: newLevel,
            status: 'ESCALATED',
            escalationReason: reason,
            timeline: [...c.timeline, newTimelineEvent],
            updatedAt: nowIso,
          };
        }
        return c;
      })
    );
    showToast('Complaint Escalated', `Ticket escalated to Level ${(complaints.find(c => c.id === complaintId)?.escalationLevel || 0) + 1}.`, 'warning');
  };

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setComplaints(MOCK_COMPLAINTS);
    setAlerts(MOCK_ALERTS);
    showToast('Reset Demo Data', 'Platform restored to initial pre-populated municipal state.', 'info');
  };

  return (
    <CivicContext.Provider
      value={{
        currentUser,
        setCurrentRole,
        complaints,
        departments,
        contractors,
        infrastructure,
        alerts,
        activeTab,
        setActiveTab,
        selectedWard,
        setSelectedWard,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        searchQuery,
        setSearchQuery,
        activeComplaintForModal,
        setActiveComplaintForModal,
        isComplaintWizardOpen,
        setIsComplaintWizardOpen,
        toast,
        showToast,
        submitComplaint,
        upvoteComplaint,
        clusterDuplicateReport,
        updateContractorProgress,
        submitCitizenVerification,
        escalateComplaint,
        checkNearbyDuplicates,
        resetData,
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = (): CivicContextType => {
  const context = useContext(CivicContext);
  if (!context) {
    throw new Error('useCivic must be used within a CivicProvider');
  }
  return context;
};
