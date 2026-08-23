import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  AlertTriangle, ArrowUpRight, Award, BarChart3, Building2, CheckCircle2, Clock3,
  Filter, Gauge, Loader2, MapPin, Search, ShieldCheck, Sparkles, Star, TimerReset,
  UsersRound, Wrench, X,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import ContractorPortal from '@/components/contractor/ContractorPortal';
import { assignComplaintToContractor, fetchComplaints } from '@/services/complaintService';
import { CATEGORY_LABELS, getPublicPhotoUrl } from '@/lib/constants';
import type { Complaint, ComplaintCategory } from '@/types';
import { StatusBadge } from '@/components/StatusBadge';
import SeverityBadge from '@/components/SeverityBadge';
import { navigateTo } from '@/lib/router';

type ContractorStatus = 'available' | 'busy' | 'limited';

type Contractor = {
  id: string;
  name: string;
  department: string;
  specialties: ComplaintCategory[];
  coverage: string[];
  status: ContractorStatus;
  successRate: number;
  rating: number;
  avgResolution: number;
  completedJobs: number;
  baseWorkload: number;
};

const CONTRACTORS: Contractor[] = [
  { id:'roadworks', name:'Metro Road Works', department:'Roads Department', specialties:['pothole','damaged_road'], coverage:['Balanagar','Moosapet','Kukatpally'], status:'available', successRate:94, rating:4.7, avgResolution:1.8, completedJobs:42, baseWorkload:3 },
  { id:'hydrofix', name:'HydroFix Services', department:'Water Works Department', specialties:['water_leakage'], coverage:['Kukatpally','Madhapur','HITEC City'], status:'available', successRate:91, rating:4.6, avgResolution:2.4, completedJobs:31, baseWorkload:2 },
  { id:'draincare', name:'DrainCare Hyderabad', department:'Drainage & Sewerage', specialties:['drainage','open_manhole'], coverage:['Balanagar','Madhapur','Secunderabad'], status:'busy', successRate:88, rating:4.4, avgResolution:2.9, completedJobs:38, baseWorkload:5 },
  { id:'brightcity', name:'BrightCity Electrical', department:'Electricity Department', specialties:['broken_streetlight','loose_electric_wire'], coverage:['Ameerpet','HITEC City','Kukatpally'], status:'available', successRate:96, rating:4.8, avgResolution:1.4, completedJobs:47, baseWorkload:2 },
  { id:'cleanzone', name:'CleanZone Municipal Services', department:'Sanitation & Waste Management', specialties:['garbage'], coverage:['Kukatpally','Balanagar','Madhapur'], status:'limited', successRate:89, rating:4.5, avgResolution:1.2, completedJobs:53, baseWorkload:4 },
  { id:'safestreet', name:'SafeStreet Infrastructure', department:'Drainage & Sewerage', specialties:['open_manhole','damaged_road'], coverage:['Secunderabad','Moosapet','Balanagar'], status:'busy', successRate:92, rating:4.6, avgResolution:2.1, completedJobs:36, baseWorkload:5 },
];

const statusStyles: Record<ContractorStatus,string> = {
  available:'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300',
  busy:'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300',
  limited:'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300',
};

export default function ContractorsPage() {
  const { profile } = useAuth();
  const [complaints,setComplaints]=useState<Complaint[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);
  const [query,setQuery]=useState('');
  const [department,setDepartment]=useState('all');
  const [availability,setAvailability]=useState<'all'|ContractorStatus>('all');
  const [selected,setSelected]=useState<Contractor|null>(null);
  const [assigningId,setAssigningId]=useState<string|null>(null);

  const load=async()=>{setLoading(true);setError(null);try{setComplaints(await fetchComplaints());}catch(e){setError(e instanceof Error?e.message:'Could not load contractor operations.');}finally{setLoading(false);}};
  useEffect(()=>{load();},[]);

  if(profile?.role==='contractor') return <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl"><div className="mb-6"><p className="text-xs font-extrabold uppercase tracking-[.16em] text-violet-600 dark:text-violet-300">Field Operations</p><h1 className="mt-1 text-3xl font-black text-slate-950 dark:text-white">My Contractor Work Queue</h1></div><div className="neon-card neon-violet rounded-3xl bg-white p-6 dark:bg-[#121a2b]"><ContractorPortal/></div></div></div>;
  if(profile?.role!=='authority') return <div className="min-h-screen grid place-items-center p-6"><div className="neon-card neon-rose max-w-xl rounded-3xl bg-white p-8 text-center dark:bg-[#121a2b]"><ShieldCheck className="mx-auto h-10 w-10 text-violet-500"/><h1 className="mt-4 text-xl font-black">Authority access only</h1><p className="mt-2 text-sm text-slate-500">Contractor assignment and performance information is available to authorized officials.</p></div></div>;

  const activeJobs=complaints.filter(c=>['assigned','in_progress'].includes(c.status));
  const overdueJobs=activeJobs.filter(c=>daysPending(c)>=6);
  const assignable=complaints.filter(c=>c.status==='verified'&&!c.assigned_to);
  const liveAssignedCounts=new Map<string,number>();
  activeJobs.forEach(c=>{if(c.assigned_to)liveAssignedCounts.set(c.assigned_to,(liveAssignedCounts.get(c.assigned_to)||0)+1);});

  const filtered=CONTRACTORS.filter(c=>{
    const q=query.toLowerCase().trim();
    const matchQuery=!q||[c.name,c.department,...c.coverage,...c.specialties.map(s=>CATEGORY_LABELS[s])].some(v=>v.toLowerCase().includes(q));
    return matchQuery&&(department==='all'||c.department===department)&&(availability==='all'||c.status===availability);
  });
  const departments=[...new Set(CONTRACTORS.map(c=>c.department))];
  const avgResolution=(CONTRACTORS.reduce((s,c)=>s+c.avgResolution,0)/CONTRACTORS.length).toFixed(1);
  const totalCompleted=CONTRACTORS.reduce((s,c)=>s+c.completedJobs,0);

  const assign=async(c:Complaint,contractor:Contractor)=>{setAssigningId(c.id);setError(null);try{await assignComplaintToContractor(c.id,contractor.name);await load();setSelected(contractor);}catch(e){setError(e instanceof Error?e.message:'Assignment failed.');}finally{setAssigningId(null);}};

  return <div className="page-enter min-h-screen px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
    <div className="mx-auto max-w-[1600px]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div><div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-violet-600 dark:text-violet-300"><Wrench className="h-4 w-4"/>Authority Field Operations</div><h1 className="mt-2 text-3xl font-black text-slate-950 dark:text-white sm:text-4xl">Contractor Operations</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">Match verified civic complaints with capable field teams, watch workloads, surface overdue jobs and compare contractor performance.</p></div>
        <button onClick={()=>setSelected(CONTRACTORS.find(c=>c.status==='available')||CONTRACTORS[0])} className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-extrabold text-white shadow-[0_0_24px_rgba(139,92,246,.22)] hover:bg-violet-700">Assign Verified Work</button>
      </div>

      {error&&<div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">{error}</div>}

      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        <Metric icon={<Building2 className="h-4 w-4"/>} label="Active contractors" value={CONTRACTORS.length}/>
        <Metric icon={<CheckCircle2 className="h-4 w-4"/>} label="Available now" value={CONTRACTORS.filter(c=>c.status==='available').length} tone="text-emerald-500"/>
        <Metric icon={<Wrench className="h-4 w-4"/>} label="Jobs in progress" value={activeJobs.length} tone="text-violet-500"/>
        <Metric icon={<Award className="h-4 w-4"/>} label="Jobs completed" value={totalCompleted} tone="text-cyan-500"/>
        <Metric icon={<AlertTriangle className="h-4 w-4"/>} label="Overdue jobs" value={overdueJobs.length} tone="text-rose-500"/>
        <Metric icon={<TimerReset className="h-4 w-4"/>} label="Avg resolution" value={`${avgResolution}d`} tone="text-amber-500"/>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <div>
          <div className="mb-4 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search contractor, department or coverage..." className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-violet-400 dark:border-white/10 dark:bg-[#121a2b]"/></div>
            <select value={department} onChange={e=>setDepartment(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-[#121a2b] dark:text-slate-300"><option value="all">All Departments</option>{departments.map(d=><option key={d} value={d}>{d}</option>)}</select>
            <select value={availability} onChange={e=>setAvailability(e.target.value as typeof availability)} className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-600 dark:border-white/10 dark:bg-[#121a2b] dark:text-slate-300"><option value="all">All Availability</option><option value="available">Available</option><option value="busy">Busy</option><option value="limited">Limited</option></select>
          </div>

          {loading?<div className="grid min-h-[400px] place-items-center"><Loader2 className="h-8 w-8 animate-spin text-violet-500"/></div>:<div className="grid gap-4 md:grid-cols-2">{filtered.map(c=><ContractorCard key={c.id} contractor={c} liveJobs={liveAssignedCounts.get(c.name)||0} onSelect={()=>setSelected(c)}/>)}</div>}
        </div>

        <div className="space-y-5">
          <section className="neon-card neon-rose rounded-3xl bg-white p-5 dark:bg-[#121a2b]"><div className="flex items-center justify-between"><div><h2 className="font-black text-slate-950 dark:text-white">Needs Attention</h2><p className="mt-1 text-xs text-slate-500">Overdue active work orders</p></div><AlertTriangle className="h-5 w-5 text-rose-500"/></div><div className="mt-4 space-y-3">{overdueJobs.length?overdueJobs.slice(0,5).map(c=><WorkMini key={c.id} complaint={c} overdue/>):<Empty text="No overdue jobs right now."/>}</div></section>
          <section className="neon-card neon-cyan rounded-3xl bg-white p-5 dark:bg-[#121a2b]"><div className="flex items-center justify-between"><div><h2 className="font-black text-slate-950 dark:text-white">Current Workload</h2><p className="mt-1 text-xs text-slate-500">Assigned and in-progress cases</p></div><Gauge className="h-5 w-5 text-cyan-500"/></div><div className="mt-4 space-y-3">{activeJobs.length?activeJobs.slice(0,6).map(c=><WorkMini key={c.id} complaint={c}/>):<Empty text="No active work orders."/>}</div></section>
        </div>
      </div>

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-[#121a2b]"><div className="border-b border-slate-200 p-5 dark:border-white/10"><div className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-violet-500"/><h2 className="font-black text-slate-950 dark:text-white">Contractor Performance</h2></div><p className="mt-1 text-xs text-slate-500">Completion quality and average resolution performance for field partners.</p></div><div className="grid gap-px bg-slate-100 md:grid-cols-3 dark:bg-white/5">{CONTRACTORS.slice(0,6).map(c=><div key={c.id} className="bg-white p-5 dark:bg-[#121a2b]"><div className="font-black text-slate-900 dark:text-white">{c.name}</div><div className="mt-4 grid grid-cols-3 gap-2 text-center"><Perf label="Success" value={`${c.successRate}%`}/><Perf label="Avg time" value={`${c.avgResolution}d`}/><Perf label="Completed" value={c.completedJobs}/></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5"><div className="h-full rounded-full bg-violet-500" style={{width:`${c.successRate}%`}}/></div></div>)}</div></section>
    </div>

    {selected&&<AssignmentPanel contractor={selected} complaints={assignable.filter(c=>selected.specialties.includes(c.category))} allAssignable={assignable} assigningId={assigningId} onAssign={(c)=>assign(c,selected)} onClose={()=>setSelected(null)}/>} 
  </div>;
}

function ContractorCard({contractor:c,liveJobs,onSelect}:{contractor:Contractor;liveJobs:number;onSelect:()=>void}) { const workload=c.baseWorkload+liveJobs; return <div className={`rounded-3xl border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg dark:bg-[#121a2b] ${c.status==='available'?'border-emerald-200 dark:border-emerald-500/20':'border-slate-200 dark:border-white/10'}`}><div className="flex items-start justify-between gap-3"><div className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"><Building2 className="h-5 w-5"/></div><span className={`rounded-full border px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide ${statusStyles[c.status]}`}>{c.status}</span></div><h3 className="mt-4 text-lg font-black text-slate-950 dark:text-white">{c.name}</h3><p className="text-xs font-semibold text-violet-600 dark:text-violet-300">{c.department}</p><div className="mt-3 flex flex-wrap gap-1.5">{c.specialties.map(s=><span key={s} className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300">{CATEGORY_LABELS[s]}</span>)}</div><div className="mt-4 grid grid-cols-3 gap-2"><Small label="Active" value={workload}/><Small label="Success" value={`${c.successRate}%`}/><Small label="Rating" value={`★ ${c.rating}`}/></div><div className="mt-4 flex items-start gap-2 text-xs text-slate-500"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-500"/><span>{c.coverage.join(' • ')}</span></div><div className="mt-4 flex gap-2"><button onClick={onSelect} className="flex-1 rounded-xl bg-violet-600 px-3 py-2.5 text-xs font-extrabold text-white hover:bg-violet-700">Assign Work</button><button onClick={onSelect} className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-extrabold text-slate-600 hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:text-slate-300">Profile</button></div></div>; }

function AssignmentPanel({contractor,complaints,allAssignable,assigningId,onAssign,onClose}:{contractor:Contractor;complaints:Complaint[];allAssignable:Complaint[];assigningId:string|null;onAssign:(c:Complaint)=>void;onClose:()=>void}) { const rows=complaints.length?complaints:allAssignable; return <div className="fixed inset-0 z-[80] flex justify-end"><button aria-label="Close assignment panel" onClick={onClose} className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"/><aside className="relative h-full w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-[#f7f8fc] p-5 shadow-2xl dark:border-white/10 dark:bg-[#0b1020]"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.16em] text-violet-600 dark:text-violet-300">Assign Work</p><h2 className="mt-1 text-2xl font-black text-slate-950 dark:text-white">{contractor.name}</h2><p className="mt-1 text-sm text-slate-500">Best matches are shown first based on contractor specialization.</p></div><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 dark:border-white/10 dark:bg-[#121a2b]"><X className="h-4 w-4"/></button></div><div className="mt-5 grid grid-cols-3 gap-2"><Small label="Success" value={`${contractor.successRate}%`}/><Small label="Avg time" value={`${contractor.avgResolution}d`}/><Small label="Completed" value={contractor.completedJobs}/></div><div className="mt-6"><div className="flex items-center justify-between"><h3 className="font-black text-slate-950 dark:text-white">Verified complaints ready for assignment</h3><span className="text-xs font-bold text-slate-500">{rows.length} cases</span></div><div className="mt-3 space-y-3">{rows.length?rows.map(c=><div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#121a2b]"><div className="flex gap-3"><div className="h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100 dark:bg-white/5">{c.photo_url?<img src={getPublicPhotoUrl(c.photo_url)||''} alt={c.title} className="h-full w-full object-cover"/>:<div className="grid h-full place-items-center"><Wrench className="h-5 w-5 text-slate-300"/></div>}</div><div className="min-w-0 flex-1"><div className="text-[10px] font-extrabold uppercase tracking-wide text-slate-400">{c.id} · {CATEGORY_LABELS[c.category]}</div><h4 className="mt-1 text-sm font-black text-slate-900 dark:text-white">{c.title}</h4><div className="mt-2 flex flex-wrap gap-2"><SeverityBadge severity={c.severity} size="sm"/><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300">Priority {c.priority_score}</span><span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 dark:bg-white/5 dark:text-slate-300">{daysPending(c)}d pending</span></div></div></div><div className="mt-3 flex gap-2"><button onClick={()=>onAssign(c)} disabled={assigningId===c.id} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-3 py-2.5 text-xs font-extrabold text-white disabled:opacity-60">{assigningId===c.id?<Loader2 className="h-4 w-4 animate-spin"/>:<Wrench className="h-4 w-4"/>}Assign to {contractor.name}</button><button onClick={()=>navigateTo({name:'complaint',id:c.id})} className="rounded-xl border border-slate-200 px-3 py-2.5 text-slate-500 dark:border-white/10"><ArrowUpRight className="h-4 w-4"/></button></div></div>):<Empty text="No verified unassigned complaints are currently available."/>}</div></div></aside></div>; }

function WorkMini({complaint:c,overdue=false}:{complaint:Complaint;overdue?:boolean}) { return <button onClick={()=>navigateTo({name:'complaint',id:c.id})} className="w-full rounded-2xl border border-slate-200 p-3 text-left hover:border-violet-300 dark:border-white/10"><div className="flex items-start justify-between gap-2"><div><div className="text-[10px] font-bold text-slate-400">{c.id}</div><div className="mt-1 text-xs font-extrabold text-slate-900 dark:text-white">{c.title}</div></div>{overdue&&<span className="rounded-full bg-rose-100 px-2 py-1 text-[9px] font-black text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">OVERDUE</span>}</div><div className="mt-2 text-[10px] text-slate-500">{c.assigned_to||'Not assigned'} · {daysPending(c)} days pending</div></button>; }
function Metric({icon,label,value,tone='text-violet-500'}:{icon:ReactNode;label:string;value:string|number;tone?:string}) { return <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/10 dark:bg-[#121a2b]"><div className={`flex items-center gap-2 ${tone}`}>{icon}<span className="text-[9px] font-extrabold uppercase tracking-wide text-slate-400">{label}</span></div><div className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{value}</div></div>; }
function Small({label,value}:{label:string;value:string|number}) { return <div className="rounded-xl bg-slate-50 p-2.5 text-center dark:bg-white/[.035]"><div className="text-sm font-black text-slate-900 dark:text-white">{value}</div><div className="mt-0.5 text-[9px] font-bold uppercase text-slate-400">{label}</div></div>; }
function Perf({label,value}:{label:string;value:string|number}) { return <div><div className="text-lg font-black text-slate-900 dark:text-white">{value}</div><div className="text-[9px] font-bold uppercase text-slate-400">{label}</div></div>; }
function Empty({text}:{text:string}) { return <div className="rounded-2xl bg-slate-50 p-4 text-center text-xs text-slate-500 dark:bg-white/[.03]">{text}</div>; }
function daysPending(c:Complaint){return Math.max(0,Math.floor((Date.now()-new Date(c.created_at).getTime())/86400000));}
