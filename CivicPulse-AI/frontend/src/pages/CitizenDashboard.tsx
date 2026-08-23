import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import { navigateTo } from '@/lib/router';
import { fetchUserComplaints, fetchCommunityFeed, toggleSupport, getSupporterCount, hasUserSupported } from '@/lib/complaints';
import type { Complaint } from '@/types';
import ComplaintCard from '@/components/ComplaintCard';
import StatCard from '@/components/StatCard';
import { Plus, FileText, CheckCircle2, Activity, Loader2, Filter, MapPin, Route, Sparkles } from 'lucide-react';
import type { ComplaintStatus } from '@/types';
import { STATUS_LABELS, STATUS_COLORS } from '@/lib/constants';

export default function CitizenDashboard() {
  const { user, profile } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [supportData, setSupportData] = useState<Record<string, { count: number; supported: boolean }>>({});
  const [filter, setFilter] = useState<ComplaintStatus | 'all'>('all');
  const [demoMode, setDemoMode] = useState(false);

  const loadData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const mine = await fetchUserComplaints(user.id);
      const data = mine.length ? mine : await fetchCommunityFeed({ scope: 'all', sort: 'newest' });
      setDemoMode(mine.length === 0);
      setComplaints(data);

      // Fetch support data for all complaints
      const supportMap: Record<string, { count: number; supported: boolean }> = {};
      await Promise.all(
        data.map(async (c) => {
          const [count, supported] = await Promise.all([
            getSupporterCount(c.id),
            hasUserSupported(c.id, user.id),
          ]);
          supportMap[c.id] = { count, supported };
        })
      );
      setSupportData(supportMap);
    } catch (err) {
      console.error('Failed to load complaints:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSupport = useCallback(async (complaintId: string) => {
    if (!user) return;
    try {
      const isSupported = await toggleSupport(complaintId, user.id);
      setSupportData((prev) => ({
        ...prev,
        [complaintId]: {
          count: (prev[complaintId]?.count || 0) + (isSupported ? 1 : -1),
          supported: isSupported,
        },
      }));
    } catch (err) {
      console.error('Support toggle failed:', err);
    }
  }, [user]);

  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === 'resolved').length;
  const active = total - resolved;

  const filteredComplaints = filter === 'all' ? complaints : complaints.filter((c) => c.status === filter);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="page-enter min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 mb-1">
              Hello, {profile?.full_name?.split(' ')[0] || 'Citizen'}
            </h1>
            <p className="text-slate-500">Track your reported issues and support others.</p>
          </div>
          <button
            onClick={() => navigateTo({ name: 'report' })}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-4 h-4" />
            Report New Issue
          </button>
        </div>

        {demoMode && (
          <div className="mb-6 rounded-2xl border border-primary-100 bg-primary-50 px-4 py-3 flex items-start gap-3 text-sm text-primary-900">
            <Sparkles className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
            <div><strong>Demo complaint data is displayed for clarity.</strong> It includes potholes, garbage, water leakage, broken streetlights, drainage issues, open manholes, damaged roads, loose electric wires, and a duplicate-report example. Your own reports will replace these examples after you submit one.</div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard icon={<FileText className="w-5 h-5" />} label="Total Reports" value={total} color="primary" />
          <StatCard icon={<Activity className="w-5 h-5" />} label="Active Issues" value={active} color="warning" />
          <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Resolved" value={resolved} color="success" />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <FilterChip label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
          {(['reported', 'verified', 'assigned', 'in_progress', 'resolved'] as ComplaintStatus[]).map((s) => (
            <FilterChip
              key={s}
              label={STATUS_LABELS[s]}
              active={filter === s}
              onClick={() => setFilter(s)}
              color={STATUS_COLORS[s]}
            />
          ))}
        </div>

        {/* Complaints */}
        {filteredComplaints.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="font-display font-bold text-slate-900 mb-2">
              {total === 0 ? 'No reports yet' : 'No reports with this filter'}
            </h3>
            <p className="text-slate-500 mb-4">
              {total === 0 ? 'Be the first to report an issue in your area!' : 'Try a different filter.'}
            </p>
            {total === 0 && (
              <button
                onClick={() => navigateTo({ name: 'report' })}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Report an Issue
              </button>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredComplaints.map((c) => (
              <ComplaintCard
                key={c.id}
                complaint={c}
                onSupport={demoMode ? undefined : handleSupport}
                supporterCount={supportData[c.id]?.count || c.supporter_count || 0}
                hasSupported={supportData[c.id]?.supported || false}
              />
            ))}
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={() => navigateTo({ name: 'progress' })}
            className="w-full flex items-center justify-center gap-2 py-4 bg-primary-600 text-white rounded-2xl font-semibold hover:bg-primary-700 transition-all shadow-sm"
          >
            <Route className="w-5 h-5" />
            Track Complaint Administrative Progress
          </button>
        </div>

        {/* Map link */}
        <div className="mt-8">
          <button
            onClick={() => navigateTo({ name: 'map' })}
            className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 rounded-2xl text-slate-700 font-semibold hover:border-primary-300 hover:text-primary-600 transition-all"
          >
            <MapPin className="w-5 h-5" />
            View All Issues on Map
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick, color }: { label: string; active: boolean; onClick: () => void; color?: { bg: string; text: string; border: string; dot: string } }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
        active
          ? 'bg-slate-900 text-white'
          : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
      }`}
    >
      {active && color && <span className={`w-1.5 h-1.5 rounded-full ${color.dot}`} />}
      {label}
    </button>
  );
}
