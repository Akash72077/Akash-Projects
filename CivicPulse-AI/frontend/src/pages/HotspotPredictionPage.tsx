import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  AlertTriangle, ArrowRight, BrainCircuit, Copy, Flame, Layers3, Loader2,
  MapPinned, RefreshCw, ScanSearch, ShieldAlert, Sparkles,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { navigateTo } from '@/lib/router';
import { fetchHotspotPredictions } from '@/services/analyticsService';
import type { HotspotPrediction, HotspotRiskLevel } from '@/types';
import HotspotMap from '@/components/authority/HotspotMap';

const riskStyle: Record<HotspotRiskLevel, { label: string; text: string; dot: string }> = {
  critical: { label: 'Critical', text: 'text-rose-600 dark:text-rose-300', dot: 'bg-rose-500' },
  high: { label: 'High', text: 'text-orange-600 dark:text-orange-300', dot: 'bg-orange-500' },
  moderate: { label: 'Moderate', text: 'text-amber-600 dark:text-amber-300', dot: 'bg-amber-500' },
  low: { label: 'Low', text: 'text-cyan-600 dark:text-cyan-300', dot: 'bg-cyan-500' },
};

export default function HotspotPredictionPage() {
  const { profile } = useAuth();
  const [days, setDays] = useState<7 | 30 | 90>(30);
  const [hotspots, setHotspots] = useState<HotspotPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (showSpinner = true) => {
    if (showSpinner) setLoading(true); else setRefreshing(true);
    setError(null);
    try {
      const result = await fetchHotspotPredictions(days);
      setHotspots(result.hotspots);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load hotspot predictions.');
    } finally {
      setLoading(false); setRefreshing(false);
    }
  }, [days]);

  useEffect(() => { load(); }, [load]);

  const totals = useMemo(() => ({
    critical: hotspots.filter((h) => h.risk_level === 'critical').length,
    open: hotspots.reduce((s, h) => s + h.open_complaints, 0),
    verification: hotspots.reduce((s, h) => s + h.needs_attention.pending_verification, 0),
    overdue: hotspots.reduce((s, h) => s + h.needs_attention.overdue, 0),
    duplicates: hotspots.reduce((s, h) => s + (h.duplicate_count || 0), 0),
  }), [hotspots]);

  const openHotspot = (hotspot: HotspotPrediction) => navigateTo({ name: 'hotspot-detail', area: hotspot.area });

  if (profile?.role !== 'authority') {
    return <div className="min-h-screen p-6 md:p-10"><div className="mx-auto max-w-2xl neon-card neon-rose rounded-3xl bg-white p-8 text-center dark:bg-[#121a2b]"><ShieldAlert className="mx-auto h-10 w-10 text-rose-500"/><h1 className="mt-4 text-2xl font-extrabold">Authority access only</h1><p className="mt-2 text-sm text-slate-500">Hotspot predictions are internal authority decision-support data.</p></div></div>;
  }

  if (loading) return <div className="min-h-screen grid place-items-center"><div className="text-center"><Loader2 className="mx-auto h-9 w-9 animate-spin text-violet-500"/><p className="mt-3 text-sm text-slate-500">Running hotspot analysis…</p></div></div>;

  return <div className="page-enter min-h-screen px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
    <div className="mx-auto max-w-[1600px]">
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-violet-600 dark:text-violet-300"><BrainCircuit className="h-4 w-4"/> Authority ML Intelligence</div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">Civic Hotspot Prediction</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">Click any colored risk zone to open a dedicated page for that exact area with complaint history, duplicate groups, pending days, verification gaps and administrative actions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-xl border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-[#121a2b]">
            {([7,30,90] as const).map((value) => <button key={value} onClick={() => setDays(value)} className={`rounded-lg px-3 py-2 text-xs font-bold transition ${days===value?'bg-violet-600 text-white shadow-[0_0_18px_rgba(139,92,246,.28)]':'text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5'}`}>{value} Days</button>)}
          </div>
          <button onClick={() => load(false)} disabled={refreshing} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-violet-600 disabled:opacity-60 dark:border-white/10 dark:bg-[#121a2b]"><RefreshCw className={`h-4 w-4 ${refreshing?'animate-spin':''}`}/></button>
        </div>
      </div>

      {error && <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">{error}</div>}

      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-5">
        <Stat label="Critical hotspots" value={totals.critical} icon={<Flame className="h-4 w-4"/>} tone="rose"/>
        <Stat label="Open complaints" value={totals.open} icon={<Layers3 className="h-4 w-4"/>} tone="violet"/>
        <Stat label="Need verification" value={totals.verification} icon={<ScanSearch className="h-4 w-4"/>} tone="amber"/>
        <Stat label="Overdue" value={totals.overdue} icon={<AlertTriangle className="h-4 w-4"/>} tone="orange"/>
        <Stat label="Duplicate reports" value={totals.duplicates} icon={<Copy className="h-4 w-4"/>} tone="cyan"/>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.55fr_.65fr]">
        <div className="neon-card neon-violet rounded-3xl bg-white p-4 dark:bg-[#121a2b]">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-1">
            <div><h2 className="font-extrabold text-slate-950 dark:text-white">Citywide ML Risk Map</h2><p className="text-xs text-slate-500">Large circles = ML hotspots · purple dots = possible duplicate reports</p></div>
            <div className="flex flex-wrap gap-3 text-[10px] font-bold text-slate-500"><Legend color="bg-rose-500" label="Critical"/><Legend color="bg-orange-500" label="High"/><Legend color="bg-amber-500" label="Moderate"/><Legend color="bg-purple-500" label="Duplicate"/></div>
          </div>
          <HotspotMap hotspots={hotspots} onSelect={openHotspot}/>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#121a2b]">
            <div className="mb-3 flex items-center justify-between"><div><h2 className="font-extrabold text-slate-950 dark:text-white">Top Predicted Hotspots</h2><p className="text-xs text-slate-500">Select one to open its full administrative detail page</p></div><Sparkles className="h-5 w-5 text-violet-500"/></div>
            <div className="space-y-2">
              {hotspots.slice(0,8).map((h, idx) => { const rs=riskStyle[h.risk_level]; return <button key={h.id} onClick={()=>openHotspot(h)} className="group w-full rounded-2xl border border-slate-200 p-3 text-left transition hover:border-violet-300 hover:bg-violet-50/50 dark:border-white/10 dark:hover:border-violet-500/40 dark:hover:bg-violet-500/5"><div className="flex items-center gap-3"><div className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-xs font-black text-slate-500 dark:bg-white/5">{idx+1}</div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><span className="truncate text-sm font-extrabold text-slate-900 dark:text-white">{h.area}</span><span className={`h-2 w-2 rounded-full ${rs.dot}`}/></div><div className="mt-1 text-[11px] text-slate-500">{h.open_complaints} open · {h.duplicate_count || 0} duplicates · {h.needs_attention.overdue} overdue</div></div><div className="text-right"><div className={`text-lg font-black ${rs.text}`}>{h.risk_score}%</div><ArrowRight className="ml-auto mt-1 h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet-500"/></div></div></button>; })}
            </div>
          </div>
          <div className="neon-card neon-cyan rounded-3xl bg-white p-5 dark:bg-[#121a2b]">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-300"><MapPinned className="h-5 w-5"/><span className="text-xs font-extrabold uppercase tracking-[.12em]">How to use this map</span></div>
            <p className="mt-3 text-sm leading-6 text-slate-500">Click a risk circle or score marker. CivicPulse will open a separate area page showing every problem, complaint age, duplicate cluster, pending verification and recommended action.</p>
          </div>
        </div>
      </div>
    </div>
  </div>;
}

function Stat({label,value,icon,tone}:{label:string;value:number;icon:ReactNode;tone:'rose'|'violet'|'amber'|'orange'|'cyan'}) {
  const classes={rose:'text-rose-500',violet:'text-violet-500',amber:'text-amber-500',orange:'text-orange-500',cyan:'text-cyan-500'};
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#121a2b]"><div className={`flex items-center gap-2 ${classes[tone]}`}>{icon}<span className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">{label}</span></div><div className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{value}</div></div>;
}
function Legend({color,label}:{color:string;label:string}) { return <span className="flex items-center gap-1.5"><span className={`h-2 w-2 rounded-full ${color}`}/>{label}</span>; }
