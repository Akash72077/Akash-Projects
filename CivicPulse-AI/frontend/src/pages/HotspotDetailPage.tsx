import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  AlertTriangle, ArrowLeft, ArrowUpRight, BrainCircuit, Building2, CheckCircle2,
  Clock3, Copy, Layers3, Loader2, MapPin, Route, ScanSearch, ShieldAlert,
  UsersRound, Wrench,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { navigateTo } from '@/lib/router';
import { CATEGORY_LABELS, getPublicPhotoUrl } from '@/lib/constants';
import { fetchHotspotPredictions } from '@/services/analyticsService';
import { updateComplaintStatus } from '@/services/complaintService';
import type { ComplaintCategory, HotspotComplaint, HotspotPrediction, HotspotRiskLevel } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import SeverityBadge from '@/components/SeverityBadge';

const riskStyle: Record<HotspotRiskLevel, { label: string; card: string; text: string; dot: string }> = {
  critical: { label: 'Critical', card: 'neon-rose', text: 'text-rose-600 dark:text-rose-300', dot: 'bg-rose-500' },
  high: { label: 'High', card: 'neon-amber', text: 'text-orange-600 dark:text-orange-300', dot: 'bg-orange-500' },
  moderate: { label: 'Moderate', card: 'neon-amber', text: 'text-amber-600 dark:text-amber-300', dot: 'bg-amber-500' },
  low: { label: 'Low', card: 'neon-cyan', text: 'text-cyan-600 dark:text-cyan-300', dot: 'bg-cyan-500' },
};

const attentionStyle = {
  overdue: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30',
  delayed: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/30',
  attention: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30',
  normal: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30',
  resolved: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-white/5 dark:text-slate-400 dark:border-white/10',
};

function AttentionBadge({ complaint }: { complaint: HotspotComplaint }) {
  const label = complaint.attention_state === 'overdue'
    ? `OVERDUE · ${complaint.pending_days} DAYS`
    : complaint.attention_state === 'delayed'
      ? `DELAYED · ${complaint.pending_days} DAYS`
      : complaint.attention_state === 'attention'
        ? `${complaint.pending_days} DAYS PENDING`
        : complaint.status === 'resolved' ? 'CLOSED' : `${complaint.pending_days} DAYS`;
  return <span className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-extrabold tracking-wide ${attentionStyle[complaint.attention_state]}`}>{label}</span>;
}

export default function HotspotDetailPage({ area }: { area: string }) {
  const { profile } = useAuth();
  const [hotspot, setHotspot] = useState<HotspotPrediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const result = await fetchHotspotPredictions(30);
      const found = result.hotspots.find((h) => h.area.toLowerCase() === area.toLowerCase());
      if (!found) throw new Error(`No active hotspot was found for ${area}.`);
      setHotspot(found);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load hotspot details.');
    } finally { setLoading(false); }
  }, [area]);

  useEffect(() => { load(); }, [load]);

  const verifyComplaint = async (complaint: HotspotComplaint) => {
    setVerifyingId(complaint.id);
    try {
      await updateComplaintStatus(complaint.id, 'verified');
      await load();
    } catch (e) { setError(e instanceof Error ? e.message : 'Verification failed.'); }
    finally { setVerifyingId(null); }
  };

  const unresolved = useMemo(() => hotspot?.complaints.filter((c) => c.status !== 'resolved') || [], [hotspot]);
  const statusCounts = useMemo(() => {
    const counts = { reported: 0, verified: 0, assigned: 0, in_progress: 0, resolved: 0 };
    hotspot?.complaints.forEach((c) => { counts[c.status] += 1; });
    return counts;
  }, [hotspot]);

  if (profile?.role !== 'authority') return <div className="min-h-screen grid place-items-center p-6"><div className="neon-card neon-rose rounded-3xl bg-white p-8 text-center dark:bg-[#121a2b]"><ShieldAlert className="mx-auto h-10 w-10 text-rose-500"/><h1 className="mt-4 text-xl font-black">Authority access only</h1></div></div>;
  if (loading) return <div className="min-h-screen grid place-items-center"><Loader2 className="h-9 w-9 animate-spin text-violet-500"/></div>;
  if (!hotspot || error) return <div className="min-h-screen p-8"><button onClick={()=>navigateTo({name:'hotspots'})} className="flex items-center gap-2 text-sm font-bold text-violet-600"><ArrowLeft className="h-4 w-4"/>Back to Hotspot Map</button><div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-700">{error || 'Hotspot unavailable.'}</div></div>;

  const risk = riskStyle[hotspot.risk_level];
  return <div className="page-enter min-h-screen px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
    <div className="mx-auto max-w-[1600px]">
      <button onClick={()=>navigateTo({name:'hotspots'})} className="mb-5 flex items-center gap-2 text-sm font-extrabold text-violet-600 hover:text-violet-700 dark:text-violet-300"><ArrowLeft className="h-4 w-4"/>Back to Hotspot Prediction Map</button>

      <div className={`neon-card ${risk.card} rounded-3xl bg-white p-6 dark:bg-[#121a2b]`}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-violet-600 dark:text-violet-300"><BrainCircuit className="h-4 w-4"/>ML Hotspot Detail</div>
            <h1 className="mt-2 text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">{hotspot.area} Civic Hotspot</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500"><span className={`flex items-center gap-2 font-extrabold ${risk.text}`}><span className={`h-2.5 w-2.5 rounded-full ${risk.dot}`}/>{risk.label} Risk</span><span>•</span><span>{hotspot.radius_meters} m cluster radius</span><span>•</span><span>{hotspot.total_complaints} reports analyzed</span></div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <HeroMetric label="Risk score" value={`${hotspot.risk_score}%`} tone={risk.text}/>
            <HeroMetric label="Open" value={hotspot.open_complaints}/>
            <HeroMetric label="Duplicates" value={hotspot.duplicate_count || 0} tone="text-purple-600 dark:text-purple-300"/>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        <MiniStat icon={<Layers3 className="h-4 w-4"/>} label="Total reports" value={hotspot.total_complaints}/>
        <MiniStat icon={<ScanSearch className="h-4 w-4"/>} label="Need verification" value={hotspot.needs_attention.pending_verification}/>
        <MiniStat icon={<Wrench className="h-4 w-4"/>} label="Not assigned" value={hotspot.needs_attention.unassigned}/>
        <MiniStat icon={<Clock3 className="h-4 w-4"/>} label="Avg pending" value={`${hotspot.average_pending_days}d`}/>
        <MiniStat icon={<AlertTriangle className="h-4 w-4"/>} label="Overdue" value={hotspot.needs_attention.overdue}/>
        <MiniStat icon={<ShieldAlert className="h-4 w-4"/>} label="Critical open" value={hotspot.needs_attention.critical_unresolved}/>
        <MiniStat icon={<Copy className="h-4 w-4"/>} label="Duplicate groups" value={hotspot.duplicate_clusters?.length || 0}/>
        <MiniStat icon={<UsersRound className="h-4 w-4"/>} label="Citizen support" value={hotspot.supporters}/>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[.72fr_1.28fr]">
        <div className="space-y-5">
          <section className="neon-card neon-cyan rounded-3xl bg-white p-5 dark:bg-[#121a2b]">
            <h2 className="flex items-center gap-2 font-black text-slate-950 dark:text-white"><Layers3 className="h-5 w-5 text-cyan-500"/>Problems faced in {hotspot.area}</h2>
            <p className="mt-1 text-xs text-slate-500">Category distribution inside this exact ML cluster.</p>
            <div className="mt-5 space-y-4">{hotspot.category_breakdown.map((item) => { const pct=Math.round((item.count/hotspot.total_complaints)*100); return <div key={item.category}><div className="mb-1.5 flex items-center justify-between text-xs"><span className="font-bold text-slate-700 dark:text-slate-300">{CATEGORY_LABELS[item.category as ComplaintCategory]}</span><span className="font-black text-slate-900 dark:text-white">{item.count}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5"><div className="h-full rounded-full bg-cyan-500" style={{width:`${pct}%`}}/></div></div>; })}</div>
          </section>

          <section className="neon-card neon-violet rounded-3xl bg-white p-5 dark:bg-[#121a2b]">
            <h2 className="flex items-center gap-2 font-black text-slate-950 dark:text-white"><Copy className="h-5 w-5 text-purple-500"/>Possible Duplicate Groups</h2>
            <p className="mt-1 text-xs text-slate-500">Reports likely describing the same physical civic issue.</p>
            <div className="mt-4 space-y-3">
              {hotspot.duplicate_clusters?.length ? hotspot.duplicate_clusters.map((group) => <div key={group.root_complaint_id} className="rounded-2xl border border-purple-200 bg-purple-50/60 p-4 dark:border-purple-500/25 dark:bg-purple-500/8"><div className="flex items-start justify-between gap-3"><div><div className="text-[10px] font-extrabold uppercase tracking-wide text-purple-600 dark:text-purple-300">{CATEGORY_LABELS[group.category]}</div><h3 className="mt-1 text-sm font-black text-slate-900 dark:text-white">{group.title}</h3></div><span className="rounded-full bg-purple-600 px-2.5 py-1 text-[10px] font-black text-white">{group.duplicate_reports} DUPLICATES</span></div><div className="mt-3 flex flex-wrap gap-3 text-[11px] font-semibold text-slate-500"><span>{group.count} linked reports</span><span>•</span><span>{group.total_supporters} citizen supports</span></div><button onClick={()=>navigateTo({name:'complaint',id:group.root_complaint_id})} className="mt-3 flex items-center gap-1 text-xs font-extrabold text-purple-600 dark:text-purple-300">Open main report <ArrowUpRight className="h-3.5 w-3.5"/></button></div>) : <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-white/[.03]">No linked duplicates in this hotspot.</div>}
            </div>
          </section>

          <section className="neon-card neon-amber rounded-3xl bg-white p-5 dark:bg-[#121a2b]">
            <h2 className="flex items-center gap-2 font-black text-slate-950 dark:text-white"><BrainCircuit className="h-5 w-5 text-amber-500"/>ML Recommended Action</h2>
            <h3 className="mt-4 font-extrabold text-slate-900 dark:text-white">{hotspot.recommended_action.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">{hotspot.recommended_action.reason}</p>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-xs font-bold text-slate-700 dark:bg-white/[.035] dark:text-slate-300"><Building2 className="h-4 w-4 text-violet-500"/>{hotspot.recommended_action.department}</div>
            <button onClick={()=>navigateTo({name:'contractors'})} className="mt-3 w-full rounded-xl bg-violet-600 px-4 py-3 text-xs font-extrabold text-white hover:bg-violet-700">Open Contractor Operations</button>
          </section>
        </div>

        <div className="space-y-5">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-[#121a2b]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-black text-slate-950 dark:text-white">Administrative status in this hotspot</h2><p className="mt-1 text-xs text-slate-500">See where complaints are stuck before field work begins.</p></div><div className="text-xs font-bold text-slate-500">{unresolved.length} unresolved</div></div>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5"><StatusMetric label="Reported" value={statusCounts.reported}/><StatusMetric label="Verified" value={statusCounts.verified}/><StatusMetric label="Assigned" value={statusCounts.assigned}/><StatusMetric label="In progress" value={statusCounts.in_progress}/><StatusMetric label="Resolved" value={statusCounts.resolved}/></div>
          </section>

          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#121a2b]">
            <div className="border-b border-slate-200 p-5 dark:border-white/10"><div className="flex items-center gap-2"><Route className="h-5 w-5 text-violet-500"/><h2 className="font-black text-slate-950 dark:text-white">Complaint List — {hotspot.area}</h2></div><p className="mt-1 text-xs text-slate-500">Overdue and unverified complaints are automatically surfaced first.</p></div>
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {hotspot.complaints.map((c) => <ComplaintRow key={c.id} complaint={c} verifying={verifyingId===c.id} onVerify={()=>verifyComplaint(c)}/>) }
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>;
}

function ComplaintRow({complaint:c,verifying,onVerify}:{complaint:HotspotComplaint;verifying:boolean;onVerify:()=>void}) {
  return <div className="p-4 transition hover:bg-slate-50/80 dark:hover:bg-white/[.025]">
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="h-24 w-full shrink-0 overflow-hidden rounded-2xl bg-slate-100 lg:w-32 dark:bg-white/5">{c.photo_url?<img src={getPublicPhotoUrl(c.photo_url) || ''} alt={c.title} className="h-full w-full object-cover"/>:<div className="grid h-full place-items-center"><AlertTriangle className="h-5 w-5 text-slate-300"/></div>}</div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2"><div><div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-slate-400"><span>{c.id}</span>{c.duplicate_of&&<span className="rounded-full bg-purple-100 px-2 py-1 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300">Duplicate of {c.duplicate_of}</span>}</div><h3 className="mt-1 text-sm font-black text-slate-900 dark:text-white">{c.title}</h3><p className="mt-1 text-xs text-slate-500"><MapPin className="mr-1 inline h-3 w-3"/>{c.location_text}</p></div><AttentionBadge complaint={c}/></div>
        <div className="mt-3 flex flex-wrap items-center gap-2"><StatusBadge status={c.status} size="sm"/><SeverityBadge severity={c.severity} size="sm"/><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300">Priority {c.priority_score}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300">Reported {new Date(c.created_at).toLocaleDateString()}</span></div>
        <div className="mt-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-white/[.03]"><span className="font-extrabold text-slate-700 dark:text-slate-300">Administrative state:</span> {c.administrative_state}</div>
        <div className="mt-3 flex flex-wrap gap-2">{c.status==='reported'&&<button onClick={onVerify} disabled={verifying} className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-[11px] font-extrabold text-white hover:bg-emerald-700 disabled:opacity-60">{verifying?<Loader2 className="h-3.5 w-3.5 animate-spin"/>:<CheckCircle2 className="h-3.5 w-3.5"/>}Verify now</button>}<button onClick={()=>navigateTo({name:'complaint',id:c.id})} className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-extrabold text-slate-700 hover:border-violet-300 hover:text-violet-700 dark:border-white/10 dark:text-slate-300">Open complaint <ArrowUpRight className="h-3.5 w-3.5"/></button>{['verified','reported'].includes(c.status)&&<button onClick={()=>navigateTo({name:'contractors'})} className="flex items-center gap-1.5 rounded-lg border border-violet-200 bg-violet-50 px-3 py-2 text-[11px] font-extrabold text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300"><Wrench className="h-3.5 w-3.5"/>Assign contractor</button>}</div>
      </div>
    </div>
  </div>;
}

function HeroMetric({label,value,tone='text-slate-950 dark:text-white'}:{label:string;value:string|number;tone?:string}) { return <div className="min-w-[100px] rounded-2xl border border-slate-200 bg-white/70 p-3 text-center dark:border-white/10 dark:bg-white/[.03]"><div className={`text-2xl font-black ${tone}`}>{value}</div><div className="mt-1 text-[9px] font-extrabold uppercase tracking-wide text-slate-400">{label}</div></div>; }
function MiniStat({icon,label,value}:{icon:ReactNode;label:string;value:string|number}) { return <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-[#121a2b]"><div className="flex items-center gap-1.5 text-violet-500">{icon}<span className="text-[9px] font-extrabold uppercase tracking-wide text-slate-400">{label}</span></div><div className="mt-2 text-xl font-black text-slate-950 dark:text-white">{value}</div></div>; }
function StatusMetric({label,value}:{label:string;value:number}) { return <div className="rounded-2xl bg-slate-50 p-3 text-center dark:bg-white/[.035]"><div className="text-xl font-black text-slate-950 dark:text-white">{value}</div><div className="mt-1 text-[10px] font-bold text-slate-500">{label}</div></div>; }
