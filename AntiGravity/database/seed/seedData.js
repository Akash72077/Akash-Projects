/**
 * CivicVerify MongoDB Seed Script
 * Run: node database/seed/seedData.js
 * Or:  npm run seed (from backend directory)
 *
 * Populates: Users, Departments, Contractors, Infrastructure, AwarenessAlerts, Complaints
 * Demo Credentials are printed after seeding completes.
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '..', 'backend', '.env') });

// --- Models (inline to keep seeder self-contained) ---
import User from '../../backend/src/models/User.js';
import { Department } from '../../backend/src/models/Department.js';
import { Contractor } from '../../backend/src/models/Contractor.js';
import { Infrastructure } from '../../backend/src/models/Infrastructure.js';
import { AwarenessAlert } from '../../backend/src/models/AwarenessAlert.js';
import { Complaint } from '../../backend/src/models/Complaint.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/civicverify';

async function seed() {
  console.log('\n🌱 CivicVerify Database Seeder Starting...\n');

  await mongoose.connect(MONGO_URI);
  console.log(`✅ Connected to MongoDB: ${mongoose.connection.host}/${mongoose.connection.name}\n`);

  // Clear all collections
  await Promise.all([
    User.deleteMany({}),
    Department.deleteMany({}),
    Contractor.deleteMany({}),
    Infrastructure.deleteMany({}),
    AwarenessAlert.deleteMany({}),
    Complaint.deleteMany({}),
  ]);
  console.log('🗑️  Cleared existing data\n');

  // --- USERS ---
  const users = await User.create([
    {
      name: 'Aarav Sharma',
      email: 'citizen@civicverify.org',
      password: 'Password@123',
      phone: '+91 98765 43210',
      role: 'CITIZEN',
      reputationScore: 140,
      ward: 'Ward 104 - Kondapur / Madhapur',
    },
    {
      name: 'Er. Rajesh Varma (Executive Engineer)',
      email: 'officer@civicverify.org',
      password: 'Password@123',
      phone: '+91 94401 22334',
      role: 'OFFICER',
      reputationScore: 200,
      ward: 'Serilingampally West Zone',
    },
    {
      name: 'Vikram Reddy (Deccan Infra Ltd)',
      email: 'contractor@civicverify.org',
      password: 'Password@123',
      phone: '+91 98491 00123',
      role: 'CONTRACTOR',
      reputationScore: 180,
      ward: 'Serilingampally West Zone',
    },
    {
      name: 'Admin - Municipal Corp',
      email: 'admin@civicverify.org',
      password: 'Password@123',
      phone: '+91 40 2345 6789',
      role: 'ADMIN',
      reputationScore: 500,
      ward: 'All Zones',
    },
  ]);
  console.log(`👤 Created ${users.length} users`);

  // --- DEPARTMENTS ---
  const departments = await Department.create([
    { departmentId: 'dept-roads', name: 'Roads & Infrastructure Engineering', code: 'ROADS', slaHours: 48, headName: 'Er. Rajesh Varma', headEmail: 'roads@ghmc.gov.in', color: '#F59E0B', iconName: 'Hammer', keywords: ['pothole', 'road', 'pavement', 'asphalt'] },
    { departmentId: 'dept-water', name: 'Water Supply & Sewerage Board', code: 'WATER', slaHours: 24, headName: 'Er. Srinivas Babu', headEmail: 'water@hmwssb.gov.in', color: '#3B82F6', iconName: 'Droplets', keywords: ['water', 'pipeline', 'leak'] },
    { departmentId: 'dept-sanitation', name: 'Solid Waste Management (SWM)', code: 'SWM', slaHours: 24, headName: 'M. Shobha Rani', headEmail: 'swm@ghmc.gov.in', color: '#10B981', iconName: 'Trash2', keywords: ['garbage', 'waste', 'litter'] },
    { departmentId: 'dept-drainage', name: 'Underground Drainage & Sewerage', code: 'DRAIN', slaHours: 36, headName: 'Er. Praveen Kumar', headEmail: 'drainage@hmwssb.gov.in', color: '#8B5CF6', iconName: 'Waves', keywords: ['drain', 'sewage', 'manhole'] },
    { departmentId: 'dept-electricity', name: 'State Electricity Distribution Corp', code: 'ELEC', slaHours: 12, headName: 'Er. Suresh Reddy', headEmail: 'elec@tsspdcl.gov.in', color: '#EF4444', iconName: 'Zap', keywords: ['electricity', 'wire', 'streetlight'] },
  ]);
  console.log(`🏛️  Created ${departments.length} departments`);

  // --- CONTRACTORS ---
  const contractors = await Contractor.create([
    { contractorId: 'CONT-HYD-8821', name: 'Vikram Reddy', companyName: 'Deccan Infra & Roadworks Pvt Ltd', email: 'vikram@deccaninfra.com', phone: '+91 98491 00123', rating: 4.8, departmentId: 'dept-roads', activeProjectsCount: 5, totalResolvedCount: 42, slaCompliancePercentage: 96.2 },
    { contractorId: 'CONT-HYD-4412', name: 'Anand Krishnan', companyName: 'Hyderabad Waterworks Consortium', email: 'anand@hwconsortium.com', phone: '+91 91234 56789', rating: 4.5, departmentId: 'dept-water', activeProjectsCount: 3, totalResolvedCount: 28, slaCompliancePercentage: 93.5 },
    { contractorId: 'CONT-HYD-7731', name: 'Lakshmi Narayana', companyName: 'GreenCity Civic Works', email: 'ln@greencity.com', phone: '+91 93456 78901', rating: 4.6, departmentId: 'dept-sanitation', activeProjectsCount: 4, totalResolvedCount: 35, slaCompliancePercentage: 94.8 },
    { contractorId: 'CONT-HYD-3301', name: 'Raju Prasad', companyName: 'TRIDENT Utility Services', email: 'raju@tridentutil.com', phone: '+91 87654 32109', rating: 4.3, departmentId: 'dept-drainage', activeProjectsCount: 6, totalResolvedCount: 19, slaCompliancePercentage: 91.2 },
    { contractorId: 'CONT-HYD-9910', name: 'K. Bhaskar Rao', companyName: 'Volt Solutions (Telangana)', email: 'bhaskar@voltsol.com', phone: '+91 99887 76655', rating: 4.7, departmentId: 'dept-electricity', activeProjectsCount: 2, totalResolvedCount: 53, slaCompliancePercentage: 97.1 },
  ]);
  console.log(`🔧 Created ${contractors.length} contractors`);

  // --- INFRASTRUCTURE ---
  const infrastructure = await Infrastructure.create([
    { assetId: 'INF-RD-001', name: 'Hitec City Main Arterial Road — Phase II Resurfacing', type: 'ROAD', contractorId: 'CONT-HYD-8821', contractorName: 'Deccan Infra & Roadworks Pvt Ltd', startDate: '2024-01-15', completionDate: '2024-07-20', warrantyExpiry: '2027-07-20', isUnderWarranty: true, projectCost: '₹ 3.45 Cr', ward: 'Ward 104 - Kondapur / Madhapur', zone: 'Serilingampally West Zone', latitude: 17.4485, longitude: 78.3742 },
    { assetId: 'INF-WP-002', name: 'Jubilee Hills Water Supply Main Pipeline — Zone 3', type: 'WATER_PIPE', contractorId: 'CONT-HYD-4412', contractorName: 'Hyderabad Waterworks Consortium', startDate: '2024-03-10', completionDate: '2024-11-05', warrantyExpiry: '2027-11-05', isUnderWarranty: true, projectCost: '₹ 1.85 Cr', ward: 'Ward 98 - Jubilee Hills', zone: 'Khairatabad Central Zone', latitude: 17.4321, longitude: 78.4112 },
    { assetId: 'INF-DR-003', name: 'Kondapur Storm Drain Network — Expansion Phase I', type: 'DRAIN', contractorId: 'CONT-HYD-3301', contractorName: 'TRIDENT Utility Services', startDate: '2023-11-01', completionDate: '2024-05-15', warrantyExpiry: '2027-05-15', isUnderWarranty: true, projectCost: '₹ 2.10 Cr', ward: 'Ward 104 - Kondapur / Madhapur', zone: 'Serilingampally West Zone', latitude: 17.4623, longitude: 78.3562 },
    { assetId: 'INF-SL-004', name: 'Madhapur LED Streetlight Upgrade Project', type: 'STREETLIGHT', contractorId: 'CONT-HYD-9910', contractorName: 'Volt Solutions (Telangana)', startDate: '2024-05-20', completionDate: '2024-12-31', warrantyExpiry: '2026-12-31', isUnderWarranty: true, projectCost: '₹ 0.95 Cr', ward: 'Ward 105 - Madhapur Tech Corridor', zone: 'Serilingampally West Zone', latitude: 17.4415, longitude: 78.3916 },
    { assetId: 'INF-RD-005', name: 'Secunderabad Inner Ring Road — Annual Maintenance', type: 'ROAD', contractorId: 'CONT-HYD-8821', contractorName: 'Deccan Infra & Roadworks Pvt Ltd', startDate: '2025-01-10', completionDate: '2025-06-30', warrantyExpiry: '2028-06-30', isUnderWarranty: true, projectCost: '₹ 4.20 Cr', ward: 'Ward 142 - Secunderabad Cantt', zone: 'Secunderabad North Zone', latitude: 17.4418, longitude: 78.5021 },
  ]);
  console.log(`🏗️  Created ${infrastructure.length} infrastructure assets`);

  // --- AWARENESS ALERTS ---
  const alerts = await AwarenessAlert.create([
    { title: 'CRITICAL: Live Electrical Wire Down — Kondapur Flyover', message: 'A high-tension wire has fallen near Kondapur Flyover (NH-65 Service Road). Citizens advised to avoid the area. TSSPDCL crews en route. SLA: 4 hours.', type: 'CRITICAL', ward: 'Ward 104 - Kondapur / Madhapur', issuedBy: 'Er. Rajesh Varma (Zonal EE)', relatedCategory: 'ELECTRICAL_HAZARD' },
    { title: 'Planned Water Outage — Jubilee Hills Sector 3 (7 AM - 2 PM)', message: 'Pipeline maintenance work will cause scheduled water disruption in Ward 98 areas on Friday. Store 2-3 days of water supply. Tankers deployed to community tanks.', type: 'WARNING', ward: 'Ward 98 - Jubilee Hills', issuedBy: 'HMWSSB North Zone Office', relatedCategory: 'WATER_LEAK' },
    { title: 'Monsoon Flood Risk — Low-lying Areas of Madhapur', message: 'Weather Bureau has issued Orange Alert for heavy rainfall. Citizens in low-lying areas near Durgam Cheruvu are advised to shift vehicles to higher ground. Municipal pumping stations on standby.', type: 'WARNING', ward: 'Ward 105 - Madhapur Tech Corridor', issuedBy: 'GHMC Emergency Control Room' },
  ]);
  console.log(`📢 Created ${alerts.length} awareness alerts`);

  // --- COMPLAINTS (Realistic Demo Data) ---
  const citizenId = users[0]._id;
  const citizenName = users[0].name;
  const now = new Date();

  const complaints = await Complaint.create([
    {
      ticketNumber: 'CV-2026-1042',
      citizen: citizenId,
      citizenId: users[0]._id.toString(),
      citizenName,
      title: 'Large Pothole Crater Near HITEC City Metro Station — Traffic Risk',
      description: 'A massive pothole approximately 3 feet wide and 8 inches deep has opened at the main exit road from HITEC City metro station. 2-wheelers are at extreme risk of accidents.',
      category: 'POTHOLE',
      priority: 'HIGH',
      status: 'WORK_IN_PROGRESS',
      latitude: 17.4485,
      longitude: 78.3742,
      address: 'HITEC City Road Near Metro Pillar #4, Serilingampally',
      ward: 'Ward 104 - Kondapur / Madhapur',
      zone: 'Serilingampally West Zone',
      locationConfidence: 'HIGH',
      locationMethod: 'GPS_HARDWARE',
      initialImageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      progressImageUrl: 'https://images.unsplash.com/photo-1584463699039-44e2b027d14d?auto=format&fit=crop&w=800&q=80',
      capturedViaCamera: true,
      imagePHash: 'a9f3c21d8e4b7056',
      aiDetectedCategory: 'POTHOLE',
      aiConfidence: 0.94,
      aiVerificationNotes: 'AI CV verified Road Pothole / Crater with 94% confidence. Edge anomaly detected.',
      departmentId: 'dept-roads',
      departmentName: 'Roads & Infrastructure Engineering',
      contractorId: 'CONT-HYD-8821',
      contractorName: 'Deccan Infra & Roadworks Pvt Ltd',
      assignedOfficerName: 'Er. Rajesh Varma (Executive Engineer)',
      infrastructureId: 'INF-RD-001',
      infrastructureName: 'Hitec City Main Arterial Road — Phase II Resurfacing',
      isUnderWarranty: true,
      warrantyExpiry: '2027-07-20',
      progressPercentage: 65,
      slaHours: 48,
      slaDeadline: new Date(now.getTime() + 12 * 3600000),
      isEscalated: false,
      escalationLevel: 0,
      reportCount: 7,
      upvotesCount: 12,
      upvotedBy: [users[0]._id.toString(), users[1]._id.toString()],
      timeline: [
        { title: 'Grievance Registered with Camera Evidence', description: `Submitted by ${citizenName} via GPS_HARDWARE. Location Confidence: HIGH.`, stage: 'SUBMITTED', actorRole: 'CITIZEN', actorName: citizenName, createdAt: new Date(now.getTime() - 3600000 * 36) },
        { title: 'AI Computer Vision Verification', description: 'AI CV verified Road Pothole / Crater with 94% confidence score.', stage: 'AI_VERIFIED', actorRole: 'AI', actorName: 'CivicVerify AI Engine', createdAt: new Date(now.getTime() - 3600000 * 35.5) },
        { title: 'DLP Warranty Matched & Contractor Auto-Notified', description: 'Hitec City Road Phase II asset under warranty. Auto-routed to Deccan Infra.', stage: 'CONTRACTOR_NOTIFIED', actorRole: 'SYSTEM', actorName: 'Warranty Engine', createdAt: new Date(now.getTime() - 3600000 * 35) },
        { title: 'Field Engineer Deployed', description: 'Er. Rajesh Varma assigned field engineer team. Bitumen patcher truck dispatched.', stage: 'WORK_IN_PROGRESS', actorRole: 'OFFICER', actorName: 'Er. Rajesh Varma (Executive Engineer)', createdAt: new Date(now.getTime() - 3600000 * 20) },
        { title: 'Work Progress Updated: 65% Complete', description: 'Contractor applied base course bitumen compaction. Final sealing layer pending.', stage: 'PROGRESS_UPDATE', actorRole: 'CONTRACTOR', actorName: 'Deccan Infra & Roadworks', createdAt: new Date(now.getTime() - 3600000 * 4) },
      ],
      verifications: [],
    },
    {
      ticketNumber: 'CV-2026-2187',
      citizen: citizenId,
      citizenId: users[0]._id.toString(),
      citizenName,
      title: 'Open Manhole on Road No. 36 — Extreme Fall Hazard',
      description: 'Manhole cover has been missing for 3 days near Jubilee Hills Checkpost. No barricading. Night-time fall hazard for vehicles and pedestrians.',
      category: 'OPEN_MANHOLE',
      priority: 'CRITICAL',
      status: 'ASSIGNED',
      latitude: 17.4321,
      longitude: 78.4112,
      address: 'Road No. 36, Near Checkpost, Jubilee Hills',
      ward: 'Ward 98 - Jubilee Hills',
      zone: 'Khairatabad Central Zone',
      locationConfidence: 'HIGH',
      locationMethod: 'GPS_HARDWARE',
      initialImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80',
      capturedViaCamera: true,
      aiDetectedCategory: 'OPEN_MANHOLE',
      aiConfidence: 0.97,
      aiVerificationNotes: 'AI CV confirmed Open/Broken Manhole Hazard with 97% confidence. Critical infrastructure risk.',
      departmentId: 'dept-drainage',
      departmentName: 'Underground Drainage & Sewerage',
      contractorId: 'CONT-HYD-3301',
      contractorName: 'TRIDENT Utility Services',
      assignedOfficerName: 'Er. Rajesh Varma (Executive Engineer)',
      progressPercentage: 10,
      slaHours: 12,
      slaDeadline: new Date(now.getTime() - 6 * 3600000),
      isEscalated: true,
      escalationLevel: 2,
      escalationReason: 'SLA Overdue: 12h resolution window expired. Zonal Commissioner alerted.',
      reportCount: 12,
      upvotesCount: 21,
      upvotedBy: [users[0]._id.toString()],
      timeline: [
        { title: 'Grievance Registered', description: `Submitted by ${citizenName} via GPS_HARDWARE.`, stage: 'SUBMITTED', actorRole: 'CITIZEN', actorName: citizenName, createdAt: new Date(now.getTime() - 3600000 * 24) },
        { title: 'AI Verification — CRITICAL Priority', description: 'Open Manhole confirmed at 97% confidence. Priority elevated to CRITICAL.', stage: 'AI_VERIFIED', actorRole: 'AI', actorName: 'CivicVerify AI Engine', createdAt: new Date(now.getTime() - 3600000 * 23.5) },
        { title: 'Contractor Notified', description: 'TRIDENT Utility Services dispatched manhole cover replacement crew.', stage: 'ASSIGNED', actorRole: 'OFFICER', actorName: 'Er. Rajesh Varma (Executive Engineer)', createdAt: new Date(now.getTime() - 3600000 * 22) },
        { title: 'Level 2 Automated SLA Escalation', description: 'SLA resolution deadline (12h) passed without closure proof. Alert dispatched to Municipal Zonal Office.', stage: 'ESCALATED', actorRole: 'SYSTEM', actorName: 'Automated Escalation Engine', createdAt: new Date(now.getTime() - 3600000 * 8) },
      ],
      verifications: [],
    },
    {
      ticketNumber: 'CV-2026-3305',
      citizen: citizenId,
      citizenId: users[0]._id.toString(),
      citizenName,
      title: 'Sewage Overflow Flooding Residential Street — Health Hazard',
      description: 'Raw sewage overflowing from blocked drain and flooding the road in front of Society apartments. Strong odour, children and elderly residents unable to exit homes.',
      category: 'SEWAGE_OVERFLOW',
      priority: 'HIGH',
      status: 'RESOLVED_PENDING_CITIZEN_CONFIRMATION',
      latitude: 17.4623,
      longitude: 78.3562,
      address: 'Kondapur Village Road, Near Tech Hub Society, Kondapur',
      ward: 'Ward 104 - Kondapur / Madhapur',
      zone: 'Serilingampally West Zone',
      locationConfidence: 'HIGH',
      locationMethod: 'GPS_HARDWARE',
      initialImageUrl: 'https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?auto=format&fit=crop&w=800&q=80',
      progressImageUrl: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=800&q=80',
      resolvedImageUrl: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=800&q=80',
      capturedViaCamera: true,
      aiDetectedCategory: 'SEWAGE_OVERFLOW',
      aiConfidence: 0.91,
      aiVerificationNotes: 'AI CV confirmed Sewage Overflow on Street with 91% confidence.',
      departmentId: 'dept-drainage',
      departmentName: 'Underground Drainage & Sewerage',
      contractorId: 'CONT-HYD-3301',
      contractorName: 'TRIDENT Utility Services',
      assignedOfficerName: 'Er. Rajesh Varma (Executive Engineer)',
      progressPercentage: 100,
      slaHours: 24,
      slaDeadline: new Date(now.getTime() + 4 * 3600000),
      isEscalated: false,
      escalationLevel: 0,
      reportCount: 5,
      upvotesCount: 8,
      upvotedBy: [users[0]._id.toString()],
      resolvedAt: new Date(now.getTime() - 3600000 * 2),
      timeline: [
        { title: 'Grievance Registered', description: `Submitted by ${citizenName}.`, stage: 'SUBMITTED', actorRole: 'CITIZEN', actorName: citizenName, createdAt: new Date(now.getTime() - 3600000 * 20) },
        { title: 'AI Verification', description: 'Sewage overflow confirmed at 91% confidence.', stage: 'AI_VERIFIED', actorRole: 'AI', actorName: 'CivicVerify AI Engine', createdAt: new Date(now.getTime() - 3600000 * 19.5) },
        { title: 'Work Started', description: 'TRIDENT crew deployed jet-flush equipment.', stage: 'WORK_IN_PROGRESS', actorRole: 'CONTRACTOR', actorName: 'TRIDENT Utility Services', createdAt: new Date(now.getTime() - 3600000 * 12) },
        { title: '100% Remediation Submitted', description: 'Drain deblocked, area sanitised, road cleaned. Photo proof submitted with GPS timestamp.', stage: 'WORK_COMPLETED', actorRole: 'CONTRACTOR', actorName: 'TRIDENT Utility Services', createdAt: new Date(now.getTime() - 3600000 * 2) },
      ],
      verifications: [],
    },
    {
      ticketNumber: 'CV-2026-4419',
      citizen: citizenId,
      citizenId: users[0]._id.toString(),
      citizenName,
      title: 'Broken Streetlight — Entire Street Dark Since 5 Days',
      description: 'All 4 streetlights on the inner lane of Madhapur Tech Hub road have been non-functional for 5 days. Road is completely dark, causing security concerns for night-shift workers.',
      category: 'BROKEN_STREETLIGHT',
      priority: 'LOW',
      status: 'CLOSED',
      latitude: 17.4415,
      longitude: 78.3916,
      address: 'Madhapur Inner Tech Hub Lane, Near Building #7',
      ward: 'Ward 105 - Madhapur Tech Corridor',
      zone: 'Serilingampally West Zone',
      locationConfidence: 'HIGH',
      locationMethod: 'GPS_HARDWARE',
      initialImageUrl: 'https://images.unsplash.com/photo-1509390144018-eecea6820a65?auto=format&fit=crop&w=800&q=80',
      resolvedImageUrl: 'https://images.unsplash.com/photo-1502101872923-d48509bff386?auto=format&fit=crop&w=800&q=80',
      capturedViaCamera: true,
      aiDetectedCategory: 'BROKEN_STREETLIGHT',
      aiConfidence: 0.89,
      aiVerificationNotes: 'Verified Broken/Dark Streetlight at 89% confidence.',
      departmentId: 'dept-electricity',
      departmentName: 'State Electricity Distribution Corp',
      contractorId: 'CONT-HYD-9910',
      contractorName: 'Volt Solutions (Telangana)',
      assignedOfficerName: 'Er. Rajesh Varma (Executive Engineer)',
      isUnderWarranty: true,
      warrantyExpiry: '2026-12-31',
      progressPercentage: 100,
      slaHours: 48,
      slaDeadline: new Date(now.getTime() - 24 * 3600000),
      isEscalated: false,
      escalationLevel: 0,
      reportCount: 3,
      upvotesCount: 5,
      upvotedBy: [users[0]._id.toString()],
      resolvedAt: new Date(now.getTime() - 3600000 * 10),
      citizenConfirmedAt: new Date(now.getTime() - 3600000 * 6),
      timeline: [
        { title: 'Grievance Registered', description: `Submitted by ${citizenName}.`, stage: 'SUBMITTED', actorRole: 'CITIZEN', actorName: citizenName, createdAt: new Date(now.getTime() - 3600000 * 48) },
        { title: 'AI Verified', description: 'Broken streetlight confirmed.', stage: 'AI_VERIFIED', actorRole: 'AI', actorName: 'CivicVerify AI Engine', createdAt: new Date(now.getTime() - 3600000 * 47.5) },
        { title: 'Repair Completed', description: '4 LED luminaires replaced. Cables tested and certified safe.', stage: 'WORK_COMPLETED', actorRole: 'CONTRACTOR', actorName: 'Volt Solutions (Telangana)', createdAt: new Date(now.getTime() - 3600000 * 10) },
        { title: 'Citizen Verified & Closed', description: `${citizenName} confirmed streetlights are working. +15 reputation points awarded.`, stage: 'CLOSED', actorRole: 'CITIZEN', actorName: citizenName, createdAt: new Date(now.getTime() - 3600000 * 6) },
      ],
      verifications: [{ userId: users[0]._id.toString(), userName: citizenName, feedback: 'FIXED', comment: 'All 4 lights are now working. Good work!', createdAt: new Date(now.getTime() - 3600000 * 6) }],
      citizenRating: 5,
      citizenFeedback: 'Quick resolution. Lights are working perfectly.',
    },
  ]);
  console.log(`📋 Created ${complaints.length} demo complaints\n`);

  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅  CivicVerify Database Seeded Successfully!\n');
  console.log('📧 DEMO LOGIN CREDENTIALS:');
  console.log('─────────────────────────────────────────────────────────');
  console.log('  👤 CITIZEN  →  citizen@civicverify.org   |  Password@123');
  console.log('  🏛️  OFFICER  →  officer@civicverify.org   |  Password@123');
  console.log('  🔧 CONTRACTOR→ contractor@civicverify.org |  Password@123');
  console.log('  🛡️  ADMIN    →  admin@civicverify.org     |  Password@123');
  console.log('─────────────────────────────────────────────────────────');
  console.log(`📦 Collections: ${departments.length} depts · ${contractors.length} contractors · ${infrastructure.length} assets · ${complaints.length} complaints · ${alerts.length} alerts`);
  console.log('═══════════════════════════════════════════════════════════\n');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err.message);
  process.exit(1);
});
