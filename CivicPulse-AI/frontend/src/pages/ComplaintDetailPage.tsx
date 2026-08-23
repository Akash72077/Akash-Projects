import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { navigateTo } from '@/lib/router';
import { fetchComplaint, toggleSupport, getSupporterCount, hasUserSupported } from '@/lib/complaints';
import type { Complaint } from '@/types';
import { StatusBadge, StatusTimeline } from '@/components/StatusBadge';
import SeverityBadge from '@/components/SeverityBadge';
import PriorityGauge from '@/components/PriorityGauge';
import MapView from '@/components/MapView';
import {
  ArrowLeft, MapPin, Clock, Building2, ThumbsUp, User, Loader2,
  Camera, Sparkles, AlertCircle, CheckCircle2,
} from 'lucide-react';
import {
  CATEGORY_LABELS, getPublicPhotoUrl, timeAgo, formatDate,
} from '@/lib/constants';

export default function ComplaintDetailPage({ id }: { id: string }) {
  const { user, profile } = useAuth();
  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [supporterCount, setSupporterCount] = useState(0);
  const [hasSupported, setHasSupported] = useState(false);
  const [supportLoading, setSupportLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchComplaint(id);
      setComplaint(data);
      if (data) {
        const count = await getSupporterCount(data.id);
        setSupporterCount(count);
        if (user) {
          const supported = await hasUserSupported(data.id, user.id);
          setHasSupported(supported);
        }
      }
    } catch (err) {
      console.error('Failed to load complaint:', err);
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSupport = useCallback(async () => {
    if (!user || !complaint) return;
    setSupportLoading(true);
    try {
      const isSupported = await toggleSupport(complaint.id, user.id);
      setHasSupported(isSupported);
      setSupporterCount((prev) => prev + (isSupported ? 1 : -1));
    } catch (err) {
      console.error('Support toggle failed:', err);
    } finally {
      setSupportLoading(false);
    }
  }, [user, complaint]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="font-display font-bold text-slate-900 text-xl mb-2">Complaint Not Found</h2>
          <p className="text-slate-500 mb-4">This complaint may have been removed.</p>
          <button onClick={() => navigateTo({ name: 'citizen-dashboard' })} className="px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const photoUrl = getPublicPhotoUrl(complaint.photo_url);
  const afterPhotoUrl = getPublicPhotoUrl(complaint.after_repair_photo_url);
  const isOwner = user?.id === complaint.user_id;
  const isAuthority = profile?.role === 'authority';
  const mapComplaints = complaint.latitude != null && complaint.longitude != null ? [complaint] : [];

  return (
    <div className="page-enter min-h-screen bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigateTo({ name: isAuthority ? 'authority-dashboard' : 'citizen-dashboard' })}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-primary-600 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo */}
            {photoUrl && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <img src={photoUrl} alt={complaint.title} className="w-full max-h-96 object-cover" />
              </div>
            )}

            {/* Title and badges */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h1 className="text-2xl font-display font-bold text-slate-900 mb-2">{complaint.title}</h1>
                  <div className="flex items-center gap-2 flex-wrap">
                    <SeverityBadge severity={complaint.severity} />
                    <StatusBadge status={complaint.status} />
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full font-medium">
                      {CATEGORY_LABELS[complaint.category]}
                    </span>
                  </div>
                </div>
                <PriorityGauge score={complaint.priority_score} size={90} />
              </div>

              {/* Meta info */}
              <div className="grid sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                <MetaItem icon={<MapPin className="w-4 h-4" />} label="Location" value={complaint.location_text || 'Location set on map'} />
                <MetaItem icon={<Building2 className="w-4 h-4" />} label="Department" value={complaint.suggested_department} />
                <MetaItem icon={<Clock className="w-4 h-4" />} label="Reported" value={timeAgo(complaint.created_at)} />
                <MetaItem icon={<User className="w-4 h-4" />} label="Reported By" value="Community member" />
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-2xl border border-primary-200 p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-900">AI Analysis</h3>
              </div>
              <p className="text-sm text-slate-600 italic mb-3">{complaint.ai_summary}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="bg-white/60 rounded-lg px-3 py-2 text-sm">
                  <span className="text-slate-500">Issue Type: </span>
                  <span className="font-semibold text-slate-900">{CATEGORY_LABELS[complaint.category]}</span>
                </div>
                <div className="bg-white/60 rounded-lg px-3 py-2 text-sm">
                  <span className="text-slate-500">Department: </span>
                  <span className="font-semibold text-slate-900">{complaint.suggested_department}</span>
                </div>
                <div className="bg-white/60 rounded-lg px-3 py-2 text-sm">
                  <span className="text-slate-500">Severity: </span>
                  <span className="font-semibold text-slate-900 capitalize">{complaint.severity}</span>
                </div>
                <div className="bg-white/60 rounded-lg px-3 py-2 text-sm">
                  <span className="text-slate-500">Priority: </span>
                  <span className="font-semibold text-slate-900">{complaint.priority_score}/100</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-display font-bold text-slate-900 mb-3">Description</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{complaint.description || 'No description provided.'}</p>
            </div>

            {/* After repair photo */}
            {afterPhotoUrl && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="font-display font-bold text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success-600" />
                    After-Repair Photo
                  </h3>
                </div>
                <img src={afterPhotoUrl} alt="After repair" className="w-full max-h-96 object-cover" />
              </div>
            )}

            {/* Map */}
            {complaint.latitude != null && complaint.longitude != null && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <h3 className="font-display font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary-600" />
                  Location
                </h3>
                <MapView complaints={mapComplaints} height="300px" zoom={15} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status timeline */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-display font-bold text-slate-900 mb-4">Status Timeline</h3>
              <StatusTimeline current={complaint.status} />
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-400">
                Last updated: {formatDate(complaint.updated_at)}
              </div>
              {isAuthority && (
                <button
                  onClick={() => navigateTo({ name: 'authority-dashboard' })}
                  className="w-full mt-4 py-2.5 bg-primary-50 text-primary-700 font-semibold rounded-lg hover:bg-primary-100 transition-colors text-sm"
                >
                  Manage in Dashboard
                </button>
              )}
            </div>

            {/* Support button */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
              <h3 className="font-display font-bold text-slate-900 mb-1">Community Support</h3>
              <p className="text-sm text-slate-500 mb-4">I also face this issue</p>
              <div className="text-4xl font-display font-bold text-primary-600 mb-3">{supporterCount}</div>
              <p className="text-xs text-slate-400 mb-4">people support this complaint</p>
              <button
                onClick={handleSupport}
                disabled={!user || supportLoading || isOwner}
                className={`w-full flex items-center justify-center gap-2 py-3 font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  hasSupported
                    ? 'bg-primary-100 text-primary-700'
                    : 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {supportLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ThumbsUp className="w-4 h-4" />
                    {hasSupported ? 'Supported' : 'I Also Face This'}
                  </>
                )}
              </button>
              {!user && (
                <p className="text-xs text-slate-400 mt-2">Sign in to support this complaint</p>
              )}
              {isOwner && (
                <p className="text-xs text-slate-400 mt-2">You can't support your own complaint</p>
              )}
            </div>

            {/* Quick info */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-display font-bold text-slate-900 mb-3">Quick Info</h3>
              <div className="space-y-2 text-sm">
                <InfoRow label="Category" value={CATEGORY_LABELS[complaint.category]} />
                <InfoRow label="Severity" value={complaint.severity.charAt(0).toUpperCase() + complaint.severity.slice(1)} />
                <InfoRow label="Priority" value={`${complaint.priority_score}/100`} />
                <InfoRow label="Department" value={complaint.suggested_department} />
                <InfoRow label="Status" value={complaint.status.replace('_', ' ')} />
                <InfoRow label="Area" value={complaint.area || complaint.location_text || 'Location set'} />
                <InfoRow label="People affected" value={String(supporterCount)} />
                <InfoRow label="Reported" value={formatDate(complaint.created_at)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-sm font-semibold text-slate-700 truncate">{value}</div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900 capitalize">{value}</span>
    </div>
  );
}
