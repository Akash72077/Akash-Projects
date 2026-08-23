import { useEffect, useMemo, useState } from 'react';
import { navigateTo } from '@/lib/router';
import { fetchCommunityFeed } from '@/lib/complaints';
import { useAuth } from '@/lib/auth';
import type { Complaint } from '@/types';
import { getPublicPhotoUrl } from '@/lib/constants';
import {
  Search, Bell, Plus, FileText, BadgeCheck, Flame, CheckCircle2, Clock3,
  MapPin, Camera, Sparkles, Building2, Wrench, ShieldCheck, ArrowRight,
  Users, MapPinned, Route, ChevronRight, Circle, Activity
} from 'lucide-react';

const issueFallbacks = [
  { title: 'Garbage overflow near market', area: 'Ameerpet', severity: 'high', supporters: 18, photo_url: '/demo-issues/garbage.jpg' },
  { title: 'Broken streetlight on main road', area: 'Kukatpally', severity: 'medium', supporters: 12, photo_url: '/demo-issues/broken-streetlight.jpg' },
  { title: 'Water leakage near hospital', area: 'Madhapur', severity: 'high', supporters: 22, photo_url: '/demo-issues/water-leakage.jpg' },
];

const flow = [
  { n:'01', icon: Camera, title:'Capture & Report', text:'Snap a photo or upload clear evidence.' },
  { n:'02', icon: Sparkles, title:'AI Verification', text:'Issue, severity and duplicates are checked.' },
  { n:'03', icon: Building2, title:'Assigned to Authority', text:'The correct department gets notified.' },
  { n:'04', icon: Wrench, title:'Action in Progress', text:'Work status is visible to citizens.' },
  { n:'05', icon: ShieldCheck, title:'Resolved & Verified', text:'Repair evidence closes the complaint.' },
];

function MetricCard({ icon: Icon, value, label, note, accent }: { icon:any; value:number; label:string; note:string; accent:'violet'|'emerald'|'rose'|'amber'|'cyan' }) {
  const tones = {
    violet: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
    emerald: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    rose: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300',
  }[accent];
  return <div className={`neon-card neon-${accent} rounded-2xl bg-white p-4 dark:bg-[#121a2b]`}>
    <div className={`grid h-10 w-10 place-items-center rounded-xl ${tones}`}><Icon className="h-5 w-5"/></div>
    <div className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">{value}</div>
    <div className="mt-0.5 text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</div>
    <div className="mt-2 text-[10px] text-slate-400">{note}</div>
  </div>;
}

export default function OverviewPage() {
  const { profile } = useAuth();
  const [items, setItems] = useState<Complaint[]>([]);
  useEffect(() => { fetchCommunityFeed({ scope: 'all', sort: 'priority' }).then(setItems).catch(() => setItems([])); }, []);

  const stats = useMemo(() => {
    if (!items.length) return { total:128, verified:64, high:23, resolved:86, overdue:7 };
    return {
      total: items.length,
      verified: items.filter(i => ['verified','assigned','in_progress','resolved'].includes(i.status)).length,
      high: items.filter(i => i.severity === 'high' || i.severity === 'critical').length,
      resolved: items.filter(i => i.status === 'resolved').length,
      overdue: items.filter(i => i.status !== 'resolved' && Date.now() - new Date(i.created_at).getTime() > 1000*60*60*24*5).length,
    };
  }, [items]);

  const live = items[0];
  const confidence = live ? Math.min(99, Math.max(86, Math.round((live.priority_score + 96) / 2))) : 94;
  const name = profile?.full_name?.split(' ')[0] || 'Citizen';
  const trends = items.slice(1,4).map(i => ({ title:i.title, area:i.area || 'Hyderabad', severity:i.severity, supporters:i.supporter_count || 1, photo_url:i.photo_url }));
  const shownTrends = trends.length >= 3 ? trends : issueFallbacks;
  const livePhoto = getPublicPhotoUrl(live?.photo_url || '/demo-issues/pothole.jpg');

  return <div className="min-h-screen bg-[#f7f8fc] px-4 py-6 transition-colors dark:bg-[#0b1020] md:px-7 lg:px-9">
    <div className="mx-auto max-w-[1480px] space-y-5">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div><h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Good morning, {name}! 👋</h1><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Track issues, check updates and help your city improve.</p></div>
        <div className="flex items-center gap-2"><div className="hidden sm:flex w-[310px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm dark:border-white/10 dark:bg-[#121a2b]"><Search className="h-4 w-4 text-slate-400"/><input aria-label="Search issues" placeholder="Search issues, locations..." className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-200"/></div><button className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-[#121a2b] dark:text-slate-300"><Bell className="h-4 w-4"/></button><button onClick={() => navigateTo({name:'report'})} className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_22px_rgba(124,58,237,.22)] hover:bg-violet-700"><Plus className="h-4 w-4"/>Report New Issue</button></div>
      </header>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
        <MetricCard icon={FileText} value={stats.total} label="Total Issues" note="Community reports" accent="violet"/>
        <MetricCard icon={BadgeCheck} value={stats.verified} label="Verified Issues" note="Evidence checked" accent="emerald"/>
        <MetricCard icon={Flame} value={stats.high} label="High Priority" note="Needs attention" accent="rose"/>
        <MetricCard icon={CheckCircle2} value={stats.resolved} label="Resolved" note="Closed successfully" accent="cyan"/>
        <MetricCard icon={Clock3} value={stats.overdue} label="Overdue" note="Needs escalation" accent="amber"/>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_.8fr]">
        <div className="neon-card neon-violet rounded-3xl bg-white p-5 dark:bg-[#121a2b]">
          <div className="flex items-start justify-between gap-4"><div><span className="inline-flex rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-extrabold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">LIVE CASE</span><h2 className="mt-2 text-xl font-extrabold text-slate-950 dark:text-white">{live?.title || 'Pothole near Green Park'}</h2><div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><MapPin className="h-3.5 w-3.5"/>{live?.area || 'Green Park, Ward 45'}</div></div><div className="relative grid h-20 w-20 place-items-center rounded-full bg-[conic-gradient(#7c3aed_0deg,#7c3aed_338deg,#e2e8f0_338deg)] p-[7px] dark:bg-[conic-gradient(#8b5cf6_0deg,#8b5cf6_338deg,#253047_338deg)]"><div className="grid h-full w-full place-items-center rounded-full bg-white text-center dark:bg-[#121a2b]"><div><div className="text-lg font-extrabold text-slate-950 dark:text-white">{confidence}%</div><div className="text-[8px] text-slate-400">AI confidence</div></div></div></div></div>
          <div className="mt-5 grid gap-5 md:grid-cols-[240px_1fr]">
            <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-slate-100 dark:bg-[#0e1524]">{livePhoto && <img src={livePhoto} alt={live?.title || 'Civic issue evidence'} className="absolute inset-0 h-full w-full object-cover"/>}<div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"/><div className="absolute left-5 top-5 rounded-lg bg-black/55 px-2 py-1 text-[9px] font-bold text-white backdrop-blur">CAPTURED EVIDENCE</div><div className="absolute bottom-4 left-4 rounded-lg bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white">✓ {confidence}% match</div></div>
            <div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">{live?.category?.replaceAll('_',' ') || 'Road Damage'}</span><span className="rounded-full bg-rose-100 px-3 py-1 text-[10px] font-bold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">{(live?.severity || 'high').toUpperCase()}</span><span className="rounded-full bg-violet-100 px-3 py-1 text-[10px] font-bold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">AI VERIFIED</span></div><dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-xs"><div><dt className="text-slate-400">Department</dt><dd className="mt-1 font-bold text-slate-800 dark:text-slate-200">{live?.suggested_department || 'Municipal Roads'}</dd></div><div><dt className="text-slate-400">Status</dt><dd className="mt-1 font-bold capitalize text-violet-700 dark:text-violet-300">{live?.status?.replace('_',' ') || 'In Progress'}</dd></div><div><dt className="text-slate-400">People affected</dt><dd className="mt-1 font-bold text-slate-800 dark:text-slate-200"><Users className="mr-1 inline h-3.5 w-3.5"/>{live?.supporter_count || 12} citizens</dd></div><div><dt className="text-slate-400">Priority</dt><dd className="mt-1 font-bold text-slate-800 dark:text-slate-200">{live?.priority_score || 86}/100</dd></div></dl>
              <div className="mt-6 grid grid-cols-5 gap-2">{['Reported','Verified','Assigned','In Progress','Resolved'].map((stage,idx) => <div key={stage} className="text-center"><div className={`mx-auto grid h-7 w-7 place-items-center rounded-full border-2 ${idx < 4 ? 'border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300' : 'border-slate-200 text-slate-300 dark:border-white/10 dark:text-slate-600'}`}>{idx < 4 ? <CheckCircle2 className="h-3.5 w-3.5"/> : <Circle className="h-3.5 w-3.5"/>}</div><div className="mt-1 text-[9px] font-semibold text-slate-500 dark:text-slate-400">{stage}</div></div>)}</div>
              <button onClick={() => live ? navigateTo({name:'complaint',id:live.id}) : navigateTo({name:'progress'})} className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-violet-700 dark:text-violet-300">View full progress <ChevronRight className="h-3.5 w-3.5"/></button>
            </div>
          </div>
        </div>

        <div className="neon-card neon-blue rounded-3xl bg-white p-5 dark:bg-[#121a2b]"><h2 className="text-base font-extrabold text-slate-950 dark:text-white">How CivicPulse AI Works</h2><div className="mt-5 space-y-4">{flow.map(({n,icon:Icon,title,text},idx) => <div key={n} className="relative flex gap-3"><div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${idx===0?'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300':idx===1?'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300':idx===2?'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300':idx===3?'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300':'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300'}`}><Icon className="h-4 w-4"/></div><div><div className="text-[10px] font-extrabold text-slate-400">{n}</div><div className="text-sm font-bold text-slate-800 dark:text-slate-200">{title}</div><div className="mt-0.5 text-[10px] leading-4 text-slate-400">{text}</div></div></div>)}</div></div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_.8fr]">
        <div className="neon-card neon-cyan rounded-3xl bg-white p-5 dark:bg-[#121a2b]"><div className="flex items-center justify-between"><h2 className="text-base font-extrabold text-slate-950 dark:text-white">Trending Issues in Your Area 🔥</h2><button onClick={() => navigateTo({name:'feed'})} className="text-xs font-bold text-violet-700 dark:text-violet-300">View All</button></div><div className="mt-4 grid gap-3 md:grid-cols-3">{shownTrends.slice(0,3).map((i:any,idx:number) => <button key={`${i.title}-${idx}`} onClick={() => navigateTo({name:'feed'})} className="overflow-hidden rounded-2xl border border-slate-200 text-left transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10"><div className="h-24 bg-slate-100 dark:bg-slate-900">{getPublicPhotoUrl(i.photo_url || null) ? <img src={getPublicPhotoUrl(i.photo_url || null)!} alt={i.title} className="h-full w-full object-cover"/> : <div className="grid h-full place-items-center"><Activity className="h-8 w-8 text-slate-500/55 dark:text-slate-400/45"/></div>}</div><div className="p-3"><div className="line-clamp-1 text-xs font-bold text-slate-900 dark:text-slate-100">{i.title}</div><div className="mt-1 text-[10px] text-slate-400">{i.area}</div><div className="mt-3 flex items-center justify-between"><span className="text-[10px] text-slate-500 dark:text-slate-400">{i.supporters} reports</span><span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${i.severity==='high'||i.severity==='critical'?'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300':'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300'}`}>{i.severity}</span></div></div></button>)}</div></div>
        <div className="neon-card neon-amber rounded-3xl bg-white p-5 dark:bg-[#121a2b]"><h2 className="text-base font-extrabold text-slate-950 dark:text-white">Quick Actions</h2><div className="mt-4 grid grid-cols-2 gap-3"><Quick icon={Plus} label="Report New Issue" tone="violet" onClick={() => navigateTo({name:'report'})}/><Quick icon={Users} label="Civic Feed" tone="emerald" onClick={() => navigateTo({name:'feed'})}/><Quick icon={MapPinned} label="View Map" tone="blue" onClick={() => navigateTo({name:'map'})}/><Quick icon={Route} label="My Progress" tone="amber" onClick={() => navigateTo({name:'progress'})}/></div></div>
      </section>
    </div>
  </div>;
}

function Quick({icon:Icon,label,tone,onClick}:{icon:any;label:string;tone:'violet'|'emerald'|'blue'|'amber';onClick:()=>void}) {
  const cls = {violet:'bg-violet-50 text-violet-700 dark:bg-violet-500/10 dark:text-violet-300',emerald:'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300',blue:'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300',amber:'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'}[tone];
  return <button onClick={onClick} className={`neon-card neon-${tone} flex min-h-[92px] flex-col items-start justify-between rounded-2xl p-4 text-left transition hover:-translate-y-0.5 ${cls}`}><Icon className="h-5 w-5"/><span className="text-xs font-extrabold">{label}</span><ArrowRight className="h-3.5 w-3.5 opacity-50"/></button>;
}
