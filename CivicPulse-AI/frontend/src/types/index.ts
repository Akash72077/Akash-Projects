export type UserRole = 'citizen' | 'authority' | 'contractor';

export type ComplaintStatus = 'reported' | 'verified' | 'assigned' | 'in_progress' | 'resolved';
export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type ComplaintCategory =
  | 'pothole'
  | 'garbage'
  | 'water_leakage'
  | 'broken_streetlight'
  | 'drainage'
  | 'open_manhole'
  | 'fallen_tree'
  | 'damaged_road'
  | 'loose_electric_wire'
  | 'other';

export interface Profile {
  id: string;
  full_name: string;
  role: UserRole;
  department: string | null;
  created_at: string;
}

export interface Complaint {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  severity: Severity;
  priority_score: number;
  suggested_department: string;
  ai_summary: string;
  status: ComplaintStatus;
  photo_url: string | null;
  after_repair_photo_url: string | null;
  latitude: number | null;
  longitude: number | null;
  location_text: string | null;
  area?: string | null;
  duplicate_of?: string | null;
  distance_meters?: number;
  assigned_to?: string | null;
  created_at: string;
  updated_at: string;
  supporter_count?: number;
  supporters?: string[];
  has_supported?: boolean;
  profiles?: Profile;
}

export interface Supporter {
  id: string;
  complaint_id: string;
  user_id: string;
  created_at: string;
}

export interface AIAnalysisResult {
  category: ComplaintCategory;
  severity: Severity;
  priority_score: number;
  suggested_department: string;
  ai_summary: string;
  title: string;
  photo_description?: string;
}

export interface DuplicateMatch {
  complaint: Complaint;
  distanceMeters: number;
}


export interface ComplaintGroupReport extends Complaint {
  distance_from_root_meters: number | null;
  is_root: boolean;
}

export interface ComplaintGroup {
  id: string;
  root_complaint_id: string;
  title: string;
  category: ComplaintCategory;
  severity: Severity;
  priority_score: number;
  base_priority_score: number;
  suggested_department: string;
  status: ComplaintStatus;
  location_text: string | null;
  area?: string | null;
  latitude: number | null;
  longitude: number | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
  report_count: number;
  duplicate_report_count: number;
  supporter_count: number;
  affected_citizens: number;
  radius_meters: number;
  root_complaint: Complaint;
  reports: ComplaintGroupReport[];
}

export type FeedSort = 'newest' | 'nearby' | 'priority' | 'supported';

export interface CommunityFeedFilters {
  scope?: 'all' | 'nearby';
  q?: string;
  area?: string;
  category?: ComplaintCategory;
  status?: ComplaintStatus;
  severity?: Severity;
  sort?: FeedSort;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export type HotspotRiskLevel = 'low' | 'moderate' | 'high' | 'critical';
export type ComplaintAttentionState = 'normal' | 'attention' | 'delayed' | 'overdue' | 'resolved';

export interface HotspotComplaint extends Complaint {
  pending_days: number;
  attention_state: ComplaintAttentionState;
  administrative_state: string;
}

export interface HotspotPrediction {
  id: string;
  area: string;
  center: { latitude: number; longitude: number };
  radius_meters: number;
  risk_score: number;
  risk_level: HotspotRiskLevel;
  total_complaints: number;
  open_complaints: number;
  average_pending_days: number;
  average_priority: number;
  supporters: number;
  duplicate_count: number;
  duplicate_clusters: Array<{
    root_complaint_id: string;
    title: string;
    category: ComplaintCategory;
    count: number;
    duplicate_reports: number;
    total_supporters: number;
    complaint_ids: string[];
  }>;
  growth_percent: number;
  category_breakdown: Array<{ category: ComplaintCategory; count: number }>;
  needs_attention: {
    pending_verification: number;
    unassigned: number;
    overdue: number;
    critical_unresolved: number;
  };
  recommended_action: {
    title: string;
    reason: string;
    department: string;
  };
  complaints: HotspotComplaint[];
}

export interface HotspotPredictionResponse {
  model: string;
  generated_at: string;
  window_days: number;
  hotspots: HotspotPrediction[];
}
