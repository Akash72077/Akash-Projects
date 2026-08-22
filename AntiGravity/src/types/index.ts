export type Role = 'CITIZEN' | 'OFFICER' | 'CONTRACTOR' | 'ADMIN';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type ComplaintCategory = 
  | 'POTHOLE'
  | 'WATER_LEAK'
  | 'GARBAGE'
  | 'OPEN_MANHOLE'
  | 'BROKEN_STREETLIGHT'
  | 'ELECTRICAL_HAZARD'
  | 'SEWAGE_OVERFLOW'
  | 'DRAINAGE_BLOCK'
  | 'ROAD_DEFECT';

export type ComplaintStatus =
  | 'SUBMITTED'
  | 'VERIFICATION_PENDING'
  | 'VERIFIED'
  | 'ASSIGNED'
  | 'CONTRACTOR_NOTIFIED'
  | 'WORK_IN_PROGRESS'
  | 'PARTIALLY_RESOLVED'
  | 'RESOLVED_PENDING_CITIZEN_CONFIRMATION'
  | 'CLOSED'
  | 'REOPENED'
  | 'ESCALATED'
  | 'REJECTED';

export type LocationConfidence = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNVERIFIED';

export type LocationMethod = 'GPS_HARDWARE' | 'NETWORK_APPROX' | 'MANUAL_PIN' | 'LANDMARK';

export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  reputationScore: number;
  ward?: string;
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  slaHours: number;
  headName: string;
  headEmail: string;
  color: string;
  iconName: string;
}

export interface Contractor {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  rating: number;
  departmentId: string;
  activeProjectsCount: number;
}

export interface Infrastructure {
  id: string;
  name: string;
  type: 'ROAD' | 'WATER_PIPE' | 'DRAIN' | 'STREETLIGHT' | 'ELECTRICAL';
  contractorId: string;
  contractorName: string;
  startDate: string;
  completionDate: string;
  warrantyExpiry: string; // Defect Liability Period (DLP)
  isUnderWarranty: boolean;
  projectCost: string;
  ward: string;
  zone: string;
}

export interface TimelineEvent {
  id: string;
  complaintId: string;
  title: string;
  description: string;
  stage: string;
  imageUrl?: string;
  actorRole: 'SYSTEM' | 'AI' | 'CITIZEN' | 'OFFICER' | 'CONTRACTOR';
  actorName: string;
  createdAt: string;
}

export interface VerificationFeedback {
  id: string;
  complaintId: string;
  userId: string;
  userName: string;
  feedback: 'FIXED' | 'PARTIALLY_FIXED' | 'NOT_FIXED';
  comment?: string;
  proofImageUrl?: string;
  createdAt: string;
}

export interface Complaint {
  citizenId: string;
  id: string;
  ticketNumber: string; // e.g. "CV-2026-00104"
  title: string;
  description: string;
  category: ComplaintCategory;
  priority: Priority;
  status: ComplaintStatus;
  
  // Geolocation
  latitude: number;
  longitude: number;
  address: string;
  ward: string;
  zone: string;
  locationConfidence: LocationConfidence;
  locationMethod: LocationMethod;
  
  // Camera Evidence
  initialImageUrl: string;
  progressImageUrl?: string;
  resolvedImageUrl?: string;
  capturedViaCamera: boolean;
  captureTimestamp: string;
  imagePHash?: string;
  
  // AI Verification
  aiDetectedCategory?: string;
  aiConfidence?: number; // 0.0 to 1.0
  aiFraudFlag?: boolean;
  aiVerificationNotes?: string;
  
  // Department & Contractor
  departmentId?: string;
  departmentName?: string;
  contractorId?: string;
  contractorName?: string;
  assignedOfficerName?: string;
  infrastructureId?: string;
  infrastructureName?: string;
  isUnderWarranty?: boolean;
  warrantyExpiry?: string;
  
  // Progress & Escalation
  progressPercentage: number; // 0 to 100
  slaHours: number;
  slaDeadline: string;
  isEscalated: boolean;
  escalationLevel: number; // 0: None, 1: Ward, 2: Zonal, 3: Commissioner
  escalationReason?: string;
  
  // Clustering & Citizen Engagement
  parentComplaintId?: string;
  reportCount: number;
  upvotesCount: number;
  hasUserUpvoted?: boolean;
  
  timeline: TimelineEvent[];
  verifications: VerificationFeedback[];
  
  createdAt: string;
  updatedAt: string;
}

export interface AwarenessAlert {
  id: string;
  title: string;
  message: string;
  type: 'WARNING' | 'INFO' | 'CRITICAL' | 'SUCCESS';
  ward: string;
  issuedBy: string;
  createdAt: string;
  relatedCategory?: ComplaintCategory;
}
