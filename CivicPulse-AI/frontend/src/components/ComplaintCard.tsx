import type { Complaint, ComplaintCategory } from '@/types';
import { CATEGORY_LABELS, SEVERITY_COLORS, STATUS_COLORS, getPublicPhotoUrl, timeAgo } from '@/lib/constants';
import { navigateTo } from '@/lib/router';
import { MapPin, ThumbsUp, AlertCircle, CircleDot, Trash2, Droplets, Lightbulb, Waves, Circle, TreePine, Construction, Zap, Copy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const CATEGORY_ICON_MAP: Record<ComplaintCategory, LucideIcon> = {
  pothole: CircleDot,
  garbage: Trash2,
  water_leakage: Droplets,
  broken_streetlight: Lightbulb,
  drainage: Waves,
  open_manhole: Circle,
  fallen_tree: TreePine,
  damaged_road: Construction,
  loose_electric_wire: Zap,
  other: AlertCircle,
};

interface ComplaintCardProps {
  complaint: Complaint;
  onSupport?: (complaintId: string) => void;
  supporterCount?: number;
  hasSupported?: boolean;
  compact?: boolean;
  showSupportText?: boolean;
}

function distanceLabel(distance?: number) {
  if (distance == null) return null;
  if (distance < 1000) return `${Math.round(distance)} m away`;
  return `${(distance / 1000).toFixed(distance < 10000 ? 1 : 0)} km away`;
}

export default function ComplaintCard({ complaint, onSupport, supporterCount = 0, hasSupported = false, compact = false, showSupportText = false }: ComplaintCardProps) {
  const sev = SEVERITY_COLORS[complaint.severity];
  const stat = STATUS_COLORS[complaint.status];
  const photoUrl = getPublicPhotoUrl(complaint.photo_url);
  const Icon = CATEGORY_ICON_MAP[complaint.category] || AlertCircle;
  const distance = distanceLabel(complaint.distance_meters);

  return (
    <div
      className="card-lift bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group"
      onClick={() => navigateTo({ name: 'complaint', id: complaint.id })}
    >
      {photoUrl && !compact && (
        <div className="relative h-44 overflow-hidden bg-slate-100">
          <img src={photoUrl} alt={complaint.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${sev.bg} ${sev.text} border ${sev.border} backdrop-blur-sm`}>
              {complaint.severity.toUpperCase()}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <div className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-slate-700">
              Priority: {complaint.priority_score}
            </div>
          </div>
        </div>
      )}

      <div className="p-4">
        {complaint.duplicate_of && (
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-semibold text-amber-700">
            <Copy className="w-3 h-3" /> Possible duplicate report
          </div>
        )}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${sev.bg}`}>
              <Icon className={`w-4 h-4 ${sev.text}`} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-slate-900 text-sm leading-tight line-clamp-1">{complaint.title}</h3>
              <p className="text-xs text-slate-500">{CATEGORY_LABELS[complaint.category]}</p>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${stat.bg} ${stat.text} border ${stat.border} whitespace-nowrap flex items-center gap-1`}>
            <span className={`w-1.5 h-1.5 rounded-full ${stat.dot}`} />
            {complaint.status.replace('_', ' ')}
          </span>
        </div>

        {!compact && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">{complaint.ai_summary || complaint.description}</p>
        )}

        {!photoUrl && !compact && (
          <div className="flex items-center gap-2 mb-3">
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${sev.bg} ${sev.text} border ${sev.border}`}>{complaint.severity.toUpperCase()}</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">Priority {complaint.priority_score}/100</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="line-clamp-1">{complaint.area || complaint.location_text || 'Location set'}</span>
            </div>
            {distance && <div className="text-[11px] text-primary-600 font-semibold mt-1">{distance}</div>}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <span>{timeAgo(complaint.created_at)}</span>
            {onSupport && !showSupportText && (
              <button
                onClick={(e) => { e.stopPropagation(); onSupport(complaint.id); }}
                className={`flex items-center gap-1 px-2 py-1 rounded-full transition-colors ${hasSupported ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-600 hover:bg-primary-50 hover:text-primary-600'}`}
              >
                <ThumbsUp className="w-3 h-3" /> {supporterCount}
              </button>
            )}
          </div>
        </div>

        {onSupport && showSupportText && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500"><strong className="text-slate-800">{supporterCount}</strong> people affected</span>
            <button
              onClick={(e) => { e.stopPropagation(); onSupport(complaint.id); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${hasSupported ? 'bg-primary-100 text-primary-700' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
            >
              <ThumbsUp className="w-3.5 h-3.5" /> {hasSupported ? 'Supported' : 'I also face this'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
