import { api, API_ORIGIN } from './api';
import type { AIAnalysisResult, CommunityFeedFilters, Complaint, ComplaintCategory, ComplaintGroup, ComplaintStatus, DuplicateMatch, Severity } from '@/types';

export async function uploadPhoto(file: File, _userId?: string): Promise<string> {
  const body = new FormData(); body.append('photo', file);
  const result = await api<{ url: string }>('/complaints/upload', { method: 'POST', body });
  return result.url.startsWith('http') ? result.url : `${API_ORIGIN}${result.url}`;
}
export async function fetchComplaints(filters?: { status?: ComplaintStatus; category?: ComplaintCategory; severity?: Severity }): Promise<Complaint[]> {
  const q = new URLSearchParams(); if (filters?.status) q.set('status', filters.status); if (filters?.category) q.set('category', filters.category); if (filters?.severity) q.set('severity', filters.severity);
  return api<Complaint[]>(`/complaints${q.size ? `?${q}` : ''}`);
}
export async function fetchCommunityFeed(filters: CommunityFeedFilters = {}): Promise<Complaint[]> {
  const q = new URLSearchParams();
  if (filters.scope) q.set('scope', filters.scope);
  if (filters.q) q.set('q', filters.q);
  if (filters.area) q.set('area', filters.area);
  if (filters.category) q.set('category', filters.category);
  if (filters.status) q.set('status', filters.status);
  if (filters.severity) q.set('severity', filters.severity);
  if (filters.sort) q.set('sort', filters.sort);
  if (filters.latitude != null) q.set('latitude', String(filters.latitude));
  if (filters.longitude != null) q.set('longitude', String(filters.longitude));
  if (filters.radius != null) q.set('radius', String(filters.radius));
  return api<Complaint[]>(`/complaints/feed${q.size ? `?${q}` : ''}`);
}
export function fetchComplaintAreas() { return api<string[]>('/complaints/areas'); }
export function fetchComplaintGroups(radiusMeters = 100) { return api<ComplaintGroup[]>(`/complaints/groups?radius=${radiusMeters}`); }
export function fetchComplaint(id: string) { return api<Complaint>(`/complaints/${id}`); }
export function fetchUserComplaints(userId: string) { return api<Complaint[]>(`/complaints/user/${userId}`); }
export function createComplaint(input: Omit<Complaint, 'id'|'created_at'|'updated_at'|'status'|'supporter_count'|'has_supported'|'profiles'|'after_repair_photo_url'> & { after_repair_photo_url?: string | null }) {
  return api<Complaint>('/complaints', { method: 'POST', body: JSON.stringify(input) });
}
export async function updateComplaintStatus(id: string, status: ComplaintStatus, afterRepairPhotoUrl?: string | null): Promise<void> {
  await api(`/complaints/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, ...(afterRepairPhotoUrl !== undefined ? { after_repair_photo_url: afterRepairPhotoUrl } : {}) }) });
}
export async function assignComplaintToContractor(id: string, contractorName: string): Promise<Complaint> {
  return api<Complaint>(`/complaints/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: 'assigned', assigned_to: contractorName }) });
}
export async function toggleSupport(complaintId: string, _userId?: string): Promise<boolean> {
  const r = await api<{ supported: boolean }>(`/complaints/${complaintId}/support`, { method: 'POST' }); return r.supported;
}
export async function getSupporterCount(complaintId: string): Promise<number> { const r = await api<{ count: number }>(`/complaints/${complaintId}/support`); return r.count; }
export async function hasUserSupported(complaintId: string, _userId?: string): Promise<boolean> { const r = await api<{ supported: boolean }>(`/complaints/${complaintId}/support`); return r.supported; }
export async function findDuplicates(latitude: number, longitude: number, category: ComplaintCategory, radiusMeters = 300): Promise<DuplicateMatch[]> {
  const q = new URLSearchParams({ latitude: String(latitude), longitude: String(longitude), category, radius: String(radiusMeters) });
  return api<DuplicateMatch[]>(`/complaints/duplicates?${q}`);
}
export function analyzeWithBackend(description: string, photo?: File | null) { const body = new FormData(); body.append('description', description); if (photo) { body.append('photo', photo); body.append('filename', photo.name); } return api<{ couldNotIdentify: boolean; result: AIAnalysisResult | null; message?: string; photo_description?: string; source?: string }>('/complaints/analyze', { method:'POST', body }); }
