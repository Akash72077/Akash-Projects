import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/lib/auth';
import { navigateTo } from '@/lib/router';
import { fetchComplaintGroups, fetchComplaints, updateComplaintStatus, uploadPhoto, getSupporterCount } from '@/lib/complaints';
import type { Complaint, ComplaintGroup, ComplaintStatus, ComplaintCategory, Severity } from '@/types';
import StatCard from '@/components/StatCard';
import { StatusBadge } from '@/components/StatusBadge';
import SeverityBadge from '@/components/SeverityBadge';
import {
  AlertTriangle, CheckCircle2, Clock, Loader2, Filter, Search, MapPin, ChevronDown,
  Building2, Camera, X, ArrowRight, BrainCircuit, Layers3, Users, GitMerge, List,
  ShieldCheck, Navigation, TrendingUp,
} from 'lucide-react';
import {
  STATUS_LABELS, STATUS_COLORS, STATUS_ORDER, CATEGORY_LABELS, SEVERITY_LABELS, getPublicPhotoUrl, timeAgo,
} from '@/lib/constants';

type SortKey = 'priority' | 'recent' | 'severity';
type ViewMode = 'grouped' | 'individual';

const severityOrder: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };

export default function AuthorityDashboard() {
  const { user, profile } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [groups, setGroups] = useState<ComplaintGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grouped');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('priority');
  const [supportCounts, setSupportCounts] = useState<Record<string, number>>({});
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<ComplaintGroup | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newStatus, setNewStatus] = useState<ComplaintStatus>('reported');
  const [afterPhoto, setAfterPhoto] = useState<File | null>(null);
  const [afterPhotoPreview, setAfterPhotoPreview] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [data, groupedData] = await Promise.all([fetchComplaints(), fetchComplaintGroups(100)]);
      const sorted = [...data].sort((a, b) => {
        const sevDiff = severityOrder[a.severity] - severityOrder[b.severity];
        if (sevDiff !== 0) return sevDiff;
        return b.priority_score - a.priority_score;
      });
      setComplaints(sorted);
      setGroups(groupedData);

      const counts: Record<string, number> = {};
      await Promise.all(data.map(async (c) => { counts[c.id] = await getSupporterCount(c.id); }));
      setSupportCounts(counts);
    } catch (err) {
      console.error('Failed to load authority dashboard:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const filteredGroups = useMemo(() => {
    let result = [...groups];
    if (statusFilter !== 'all') result = result.filter((g) => g.status === statusFilter);
    if (categoryFilter !== 'all') result = result.filter((g) => g.category === categoryFilter);
    if (severityFilter !== 'all') result = result.filter((g) => g.severity === severityFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((g) =>
        g.title.toLowerCase().includes(q) ||
        g.location_text?.toLowerCase().includes(q) ||
        g.area?.toLowerCase().includes(q) ||
        g.suggested_department.toLowerCase().includes(q) ||
        g.reports.some((r) => r.description.toLowerCase().includes(q) || r.title.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'priority') result.sort((a, b) => b.priority_score - a.priority_score || b.report_count - a.report_count);
    if (sortBy === 'recent') result.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    if (sortBy === 'severity') result.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity] || b.priority_score - a.priority_score);
    return result;
  }, [groups, statusFilter, categoryFilter, severityFilter, searchQuery, sortBy]);

  const filteredComplaints = useMemo(() => {
    let result = [...complaints];
    if (statusFilter !== 'all') result = result.filter((c) => c.status === statusFilter);
    if (categoryFilter !== 'all') result = result.filter((c) => c.category === categoryFilter);
    if (severityFilter !== 'all') result = result.filter((c) => c.severity === severityFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) =>
        c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) ||
        c.location_text?.toLowerCase().includes(q) || c.suggested_department.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'priority') result.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity] || b.priority_score - a.priority_score);
    if (sortBy === 'recent') result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    if (sortBy === 'severity') result.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity] || b.priority_score - a.priority_score);
    return result;
  }, [complaints, statusFilter, categoryFilter, severityFilter, searchQuery, sortBy]);

  const stats = useMemo(() => {
    const activeReports = complaints.filter((c) => c.status !== 'resolved');
    const duplicateReports = Math.max(0, activeReports.length - groups.length);
    const criticalGroups = groups.filter((g) => g.severity === 'critical').length;
    const resolved = complaints.filter((c) => c.status === 'resolved').length;
    return { groupedIssues: groups.length, citizenReports: activeReports.length, duplicateReports, criticalGroups, resolved };
  }, [complaints, groups]);

  const openUpdateModal = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setNewStatus(complaint.status);
    setAfterPhoto(null);
    setAfterPhotoPreview(null);
    setShowUpdateModal(true);
  };

  const handleAfterPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAfterPhoto(file);
    const reader = new FileReader();
    reader.onload = () => setAfterPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    if (!selectedComplaint) return;
    setUpdating(true);
    try {
      let afterPhotoUrl: string | null | undefined = undefined;
      if (afterPhoto && user) afterPhotoUrl = await uploadPhoto(afterPhoto, user.id);
      await updateComplaintStatus(selectedComplaint.id, newStatus, afterPhotoUrl);
      setShowUpdateModal(false);
      setSelectedGroup(null);
      await loadData();
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-50 dark:bg-[#080d18] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-violet-600" /></div>;
  }

  const listCount = viewMode === 'grouped' ? filteredGroups.length : filteredComplaints.length;

  return (
    <div className="page-enter min-h-screen bg-slate-50 py-8 dark:bg-[#080d18]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1"><Building2 className="w-5 h-5 text-violet-600" /><span className="text-sm font-semibold text-violet-600 dark:text-violet-300">{profile?.department || 'Authority'}</span></div>
            <h1 className="text-3xl font-display font-bold text-slate-900 mb-1 dark:text-white">Authority Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Duplicate reports from the same civic issue are automatically stacked into one actionable case.</p>
          </div>
          <button onClick={() => navigateTo({ name: 'hotspots' })} className="neon-card neon-violet flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-violet-700 dark:bg-[#121a2b] dark:text-violet-300"><BrainCircuit className="h-4 w-4" /> Open Hotspot Prediction</button>
        </div>

        <div className="mb-6 rounded-2xl border border-violet-200 bg-violet-50/80 p-4 dark:border-violet-400/20 dark:bg-violet-500/8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-600 text-white"><GitMerge className="h-5 w-5" /></div>
              <div><div className="font-extrabold text-slate-900 dark:text-white">Duplicate consolidation is active</div><p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Same-category reports within 100 metres are grouped. More matching reports and citizen support increase the group priority.</p></div>
            </div>
            <div className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-violet-700 shadow-sm dark:bg-white/5 dark:text-violet-300">{stats.duplicateReports} reports consolidated</div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon={<Layers3 className="w-5 h-5" />} label="Grouped Civic Issues" value={stats.groupedIssues} color="primary" />
          <StatCard icon={<Users className="w-5 h-5" />} label="Citizen Reports" value={stats.citizenReports} color="warning" />
          <StatCard icon={<AlertTriangle className="w-5 h-5" />} label="Critical Groups" value={stats.criticalGroups} color="error" />
          <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Resolved Reports" value={stats.resolved} color="success" />
        </div>

        <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#101827] lg:flex-row lg:items-center lg:justify-between">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-white/5">
            <button onClick={() => setViewMode('grouped')} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${viewMode === 'grouped' ? 'bg-white text-violet-700 shadow dark:bg-violet-500/15 dark:text-violet-300' : 'text-slate-500 dark:text-slate-400'}`}><Layers3 className="h-4 w-4" />Grouped Issues</button>
            <button onClick={() => setViewMode('individual')} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition ${viewMode === 'individual' ? 'bg-white text-violet-700 shadow dark:bg-violet-500/15 dark:text-violet-300' : 'text-slate-500 dark:text-slate-400'}`}><List className="h-4 w-4" />Individual Reports</button>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Authority default: <span className="font-bold text-slate-700 dark:text-slate-200">Grouped Issues</span></div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 dark:border-white/10 dark:bg-[#101827]">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search title, location, department..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm dark:border-white/10 dark:bg-white/5 dark:text-white" /></div>
            <SelectWrap value={sortBy} onChange={(v) => setSortBy(v as SortKey)} options={[['priority','Sort: Priority'],['recent','Sort: Most Recent'],['severity','Sort: Severity']]} />
            <SelectWrap value={statusFilter} onChange={(v) => setStatusFilter(v as ComplaintStatus | 'all')} options={[['all','All Statuses'], ...STATUS_ORDER.map((s) => [s, STATUS_LABELS[s]] as [string,string])]} />
            <SelectWrap value={categoryFilter} onChange={(v) => setCategoryFilter(v as ComplaintCategory | 'all')} options={[['all','All Categories'], ...(Object.keys(CATEGORY_LABELS) as ComplaintCategory[]).map((c) => [c, CATEGORY_LABELS[c]] as [string,string])]} />
            <SelectWrap value={severityFilter} onChange={(v) => setSeverityFilter(v as Severity | 'all')} options={[['all','All Severities'], ...(['critical','high','medium','low'] as Severity[]).map((s) => [s, SEVERITY_LABELS[s]] as [string,string])]} />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-slate-900 text-lg dark:text-white">{viewMode === 'grouped' ? 'Grouped Civic Issues' : 'Individual Citizen Reports'}<span className="text-sm font-normal text-slate-400 ml-2">({listCount})</span></h2>
          <button onClick={() => navigateTo({ name: 'map' })} className="flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-300"><MapPin className="w-4 h-4" />Map View</button>
        </div>

        {listCount === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 dark:border-white/10 dark:bg-[#101827]"><Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" /><p className="text-slate-500">No complaints match your filters.</p></div>
        ) : viewMode === 'grouped' ? (
          <div className="space-y-4">
            {filteredGroups.map((g) => <GroupCard key={g.id} group={g} onOpen={() => setSelectedGroup(g)} onUpdate={() => openUpdateModal(g.root_complaint)} />)}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredComplaints.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-4 card-lift cursor-pointer dark:border-white/10 dark:bg-[#101827]" onClick={() => navigateTo({ name: 'complaint', id: c.id })}>
                <div className="flex items-start gap-4">
                  <PhotoThumb url={c.photo_url} />
                  <div className="flex-1 min-w-0"><div className="flex items-start justify-between gap-2 mb-1"><h3 className="font-semibold text-slate-900 text-sm line-clamp-1 dark:text-white">{c.title}</h3><SeverityBadge severity={c.severity} size="sm" /></div><div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-2"><span className="font-medium">{CATEGORY_LABELS[c.category]}</span><span>•</span><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.location_text || 'Set'}</span><span>•</span><span>{timeAgo(c.created_at)}</span>{c.duplicate_of && <><span>•</span><span className="font-bold text-violet-600">Duplicate report</span></>}</div><div className="flex flex-wrap items-center gap-3"><StatusBadge status={c.status} size="sm" /><span className="text-xs text-slate-500">Priority: <span className="font-bold text-slate-900 dark:text-white">{c.priority_score}/100</span></span><span className="text-xs text-slate-500">Supporters: <span className="font-semibold">{supportCounts[c.id] || 0}</span></span></div></div>
                  <button onClick={(e) => { e.stopPropagation(); openUpdateModal(c); }} className="flex items-center gap-1 px-3 py-2 bg-violet-50 text-violet-700 text-sm font-semibold rounded-lg hover:bg-violet-100 transition-colors whitespace-nowrap flex-shrink-0 dark:bg-violet-500/10 dark:text-violet-300">Update<ArrowRight className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedGroup && <GroupDetailsModal group={selectedGroup} onClose={() => setSelectedGroup(null)} onOpenComplaint={(id) => navigateTo({ name: 'complaint', id })} onUpdateRoot={() => openUpdateModal(selectedGroup.root_complaint)} />}

      {showUpdateModal && selectedComplaint && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setShowUpdateModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-scale-in dark:bg-[#101827]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4"><h3 className="font-display font-bold text-slate-900 text-lg dark:text-white">Update Complaint Status</h3><button onClick={() => setShowUpdateModal(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"><X className="w-5 h-5" /></button></div>
            <div className="mb-4"><p className="text-sm text-slate-500 mb-1">{selectedComplaint.title}</p><p className="text-xs text-slate-400">{CATEGORY_LABELS[selectedComplaint.category]} • {selectedComplaint.location_text}</p></div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 dark:text-slate-200">New Status</label>
            <div className="grid grid-cols-1 gap-2 mb-4">{STATUS_ORDER.map((s) => { const c = STATUS_COLORS[s]; return <button key={s} onClick={() => setNewStatus(s)} className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${newStatus === s ? `${c.bg} ${c.border}` : 'border-slate-200 hover:border-slate-300 dark:border-white/10'}`}><span className={`w-3 h-3 rounded-full ${c.dot}`} /><span className={`text-sm font-semibold ${newStatus === s ? c.text : 'text-slate-700 dark:text-slate-200'}`}>{STATUS_LABELS[s]}</span>{newStatus === s && <CheckCircle2 className={`w-4 h-4 ${c.text} ml-auto`} />}</button>; })}</div>
            {newStatus === 'resolved' && <div className="mb-4 animate-fade-in-up"><label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1 dark:text-slate-200"><Camera className="w-4 h-4" />After-Repair Photo</label>{afterPhotoPreview ? <div className="relative"><img src={afterPhotoPreview} alt="After repair" className="w-full max-h-48 object-cover rounded-xl" /><button onClick={() => { setAfterPhoto(null); setAfterPhotoPreview(null); }} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center"><X className="w-3.5 h-3.5" /></button></div> : <label className="flex flex-col items-center justify-center gap-2 h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-violet-400 hover:bg-violet-50/30 transition-all dark:border-white/10"><Camera className="w-6 h-6 text-slate-400" /><span className="text-sm text-slate-500">Upload after-repair photo</span><input type="file" accept="image/*" onChange={handleAfterPhotoChange} className="hidden" /></label>}</div>}
            <div className="flex gap-3"><button onClick={() => setShowUpdateModal(false)} disabled={updating} className="flex-1 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors dark:bg-white/5 dark:text-slate-200">Cancel</button><button onClick={handleUpdate} disabled={updating} className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2">{updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}Update Status</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

function SelectWrap({ value, onChange, options }: { value: string; onChange: (value: string) => void; options: [string, string][] }) {
  return <div className="relative"><select value={value} onChange={(e) => onChange(e.target.value)} className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-slate-200 bg-white focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none text-sm font-medium dark:border-white/10 dark:bg-[#151e31] dark:text-slate-200">{options.map(([v,l]) => <option key={v} value={v}>{l}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" /></div>;
}

function PhotoThumb({ url, large = false }: { url: string | null; large?: boolean }) {
  const photo = url ? getPublicPhotoUrl(url) : null;
  return <div className={`${large ? 'w-28 h-24' : 'w-20 h-20'} rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 dark:bg-white/5`}>{photo ? <img src={photo} alt="Civic issue" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-slate-300" /></div>}</div>;
}

function GroupCard({ group, onOpen, onUpdate }: { group: ComplaintGroup; onOpen: () => void; onUpdate: () => void }) {
  const priorityIncrease = Math.max(0, group.priority_score - group.base_priority_score);
  return <div className="neon-card neon-violet rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#101827]">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
      <PhotoThumb url={group.photo_url} large />
      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-extrabold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"><Layers3 className="h-3 w-3" />{group.report_count} REPORTS STACKED</span>{group.report_count > 1 && <span className="rounded-full bg-fuchsia-50 px-2.5 py-1 text-[11px] font-bold text-fuchsia-700 dark:bg-fuchsia-500/10 dark:text-fuchsia-300">Same issue • within {Math.max(1, group.radius_meters)}m</span>}<SeverityBadge severity={group.severity} size="sm" /></div>
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{group.title}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400"><span className="font-semibold">{CATEGORY_LABELS[group.category]}</span><span>•</span><span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{group.location_text || group.area || 'Location set'}</span><span>•</span><span>Root report {timeAgo(group.created_at)}</span></div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <MiniMetric icon={<Users className="h-4 w-4" />} label="Citizens affected" value={group.affected_citizens} />
          <MiniMetric icon={<GitMerge className="h-4 w-4" />} label="Matching reports" value={group.report_count} />
          <MiniMetric icon={<ShieldCheck className="h-4 w-4" />} label="Community support" value={group.supporter_count} />
          <MiniMetric icon={<TrendingUp className="h-4 w-4" />} label="Priority increase" value={priorityIncrease ? `+${priorityIncrease}` : '—'} highlight={priorityIncrease > 0} />
        </div>
      </div>
      <div className="w-full shrink-0 rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:w-60 dark:border-white/10 dark:bg-white/[0.03]">
        <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wide text-slate-400">Group Priority</span><span className={`text-2xl font-black ${group.priority_score >= 90 ? 'text-rose-600' : group.priority_score >= 75 ? 'text-orange-500' : 'text-violet-600 dark:text-violet-300'}`}>{group.priority_score}</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-rose-500" style={{ width: `${group.priority_score}%` }} /></div>
        <div className="mt-3"><StatusBadge status={group.status} size="sm" /></div>
        <div className="mt-2 text-[11px] leading-5 text-slate-500 dark:text-slate-400">{group.report_count > 1 ? `Priority includes ${group.report_count - 1} matching report${group.report_count > 2 ? 's' : ''} and citizen support.` : 'Single report; no duplicate boost yet.'}</div>
        <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={onOpen} className="rounded-lg bg-violet-600 px-3 py-2 text-xs font-bold text-white hover:bg-violet-700">View Group</button><button onClick={onUpdate} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-white dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5">Update</button></div>
      </div>
    </div>
  </div>;
}

function MiniMetric({ icon, label, value, highlight = false }: { icon: React.ReactNode; label: string; value: string | number; highlight?: boolean }) {
  return <div className={`rounded-xl border p-3 ${highlight ? 'border-fuchsia-200 bg-fuchsia-50 dark:border-fuchsia-400/20 dark:bg-fuchsia-500/5' : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]'}`}><div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-400">{icon}{label}</div><div className={`mt-1 text-lg font-black ${highlight ? 'text-fuchsia-700 dark:text-fuchsia-300' : 'text-slate-900 dark:text-white'}`}>{value}</div></div>;
}

function GroupDetailsModal({ group, onClose, onOpenComplaint, onUpdateRoot }: { group: ComplaintGroup; onClose: () => void; onOpenComplaint: (id: string) => void; onUpdateRoot: () => void }) {
  return <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm" onClick={onClose}>
    <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl dark:bg-[#0f1727]" onClick={(e) => e.stopPropagation()}>
      <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white/95 p-5 backdrop-blur dark:border-white/10 dark:bg-[#0f1727]/95"><div><div className="mb-1 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-violet-600 dark:text-violet-300"><GitMerge className="h-4 w-4" />Grouped Civic Complaint</div><h2 className="text-xl font-black text-slate-900 dark:text-white">{group.title}</h2><p className="mt-1 text-sm text-slate-500">{group.location_text} • {group.report_count} reports combined into one authority case</p></div><button onClick={onClose} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"><X className="h-5 w-5" /></button></div>
      <div className="p-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><MiniMetric icon={<TrendingUp className="h-4 w-4" />} label="Priority" value={`${group.priority_score}/100`} highlight /><MiniMetric icon={<Users className="h-4 w-4" />} label="Affected citizens" value={group.affected_citizens} /><MiniMetric icon={<GitMerge className="h-4 w-4" />} label="Reports" value={group.report_count} /><MiniMetric icon={<Navigation className="h-4 w-4" />} label="Cluster radius" value={`${group.radius_meters}m`} /></div>
        <div className="mt-5 rounded-2xl border border-violet-200 bg-violet-50 p-4 dark:border-violet-400/20 dark:bg-violet-500/5"><div className="font-bold text-slate-900 dark:text-white">Why this is one complaint</div><p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">CivicPulse found the same <strong>{CATEGORY_LABELS[group.category]}</strong> problem reported within a {Math.max(100, group.radius_meters)} metre local area. The individual reports remain preserved below, while the authority handles them as one civic case.</p></div>
        <div className="mt-6 flex items-center justify-between"><div><h3 className="font-black text-slate-900 dark:text-white">Citizen reports in this group</h3><p className="text-xs text-slate-500">The earliest report is the main/root complaint. Later matching reports increase impact and priority.</p></div><button onClick={onUpdateRoot} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white hover:bg-violet-700">Update Main Case</button></div>
        <div className="mt-3 space-y-3">{group.reports.map((report, index) => <div key={report.id} className={`rounded-2xl border p-4 ${report.is_root ? 'border-violet-300 bg-violet-50/60 dark:border-violet-400/30 dark:bg-violet-500/5' : 'border-slate-200 dark:border-white/10'}`}><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-black text-slate-400">REPORT {index + 1}</span>{report.is_root && <span className="rounded-full bg-violet-600 px-2 py-0.5 text-[10px] font-bold text-white">MAIN CASE</span>}{report.duplicate_of && <span className="rounded-full bg-fuchsia-100 px-2 py-0.5 text-[10px] font-bold text-fuchsia-700 dark:bg-fuchsia-500/10 dark:text-fuchsia-300">MATCHED DUPLICATE</span>}</div><div className="mt-1 font-bold text-slate-900 dark:text-white">{report.title}</div><div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500"><span>{timeAgo(report.created_at)}</span><span>•</span><span>{report.distance_from_root_meters ?? 0}m from main report</span><span>•</span><span>{report.supporter_count || 0} supporters</span><span>•</span><span>Priority {report.priority_score}</span></div></div><div className="flex items-center gap-2"><StatusBadge status={report.status} size="sm" /><button onClick={() => onOpenComplaint(report.id)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5">Open Report</button></div></div></div>)}</div>
      </div>
    </div>
  </div>;
}
