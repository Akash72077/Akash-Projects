import type { ComplaintCategory, ComplaintStatus, Severity } from '@/types';

export const CATEGORY_LABELS: Record<ComplaintCategory, string> = {
  pothole: 'Pothole',
  garbage: 'Garbage',
  water_leakage: 'Water Leakage',
  broken_streetlight: 'Broken Streetlight',
  drainage: 'Drainage Issue',
  open_manhole: 'Open Manhole',
  fallen_tree: 'Fallen Tree',
  damaged_road: 'Damaged Road',
  loose_electric_wire: 'Loose Electric Wire',
  other: 'Other',
};

export const CATEGORY_ICONS: Record<ComplaintCategory, string> = {
  pothole: 'CircleDot',
  garbage: 'Trash2',
  water_leakage: 'Droplets',
  broken_streetlight: 'Lightbulb',
  drainage: 'Waves',
  open_manhole: 'Circle',
  fallen_tree: 'TreePine',
  damaged_road: 'Construction',
  loose_electric_wire: 'Zap',
  other: 'AlertCircle',
};

export const STATUS_LABELS: Record<ComplaintStatus, string> = {
  reported: 'Reported',
  verified: 'Verified',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

export const STATUS_ORDER: ComplaintStatus[] = [
  'reported',
  'verified',
  'assigned',
  'in_progress',
  'resolved',
];

export const SEVERITY_LABELS: Record<Severity, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export const SEVERITY_COLORS: Record<Severity, { bg: string; text: string; border: string; dot: string }> = {
  low: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  high: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' },
  critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
};

export const STATUS_COLORS: Record<ComplaintStatus, { bg: string; text: string; border: string; dot: string }> = {
  reported: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-500' },
  verified: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  assigned: { bg: 'bg-accent-50', text: 'text-accent-700', border: 'border-accent-200', dot: 'bg-accent-500' },
  in_progress: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  resolved: { bg: 'bg-success-50', text: 'text-success-700', border: 'border-success-200', dot: 'bg-success-500' },
};

export const DEPARTMENTS = [
  'Roads Department',
  'Sanitation & Waste Management',
  'Water Works Department',
  'Electricity Department',
  'Parks & Tree Authority',
  'Drainage & Sewerage',
  'Urban Maintenance',
  'General Municipal Services',
];

export function getPublicPhotoUrl(path: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http') || path.startsWith('blob:') || path.startsWith('data:') || path.startsWith('/demo-issues/')) return path;
  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const origin = api.replace(/\/api\/?$/, '');
  return path.startsWith('/') ? `${origin}${path}` : `${origin}/${path}`;
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
