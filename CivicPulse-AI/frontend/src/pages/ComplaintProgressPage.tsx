import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { fetchCommunityFeed, fetchUserComplaints } from '@/lib/complaints';
import type { Complaint, ComplaintStatus } from '@/types';
import { CATEGORY_LABELS, STATUS_LABELS, STATUS_ORDER, formatDate, timeAgo } from '@/lib/constants';
import { navigateTo } from '@/lib/router';
import { Building2, Check, ChevronRight, Clock3, FileSearch, Loader2, MapPin, ShieldCheck, UserCheck } from 'lucide-react';

const ADMIN_STAGES: Record<ComplaintStatus, { office: string; note: string; action: string }> = {
  reported: {
    office: 'CivicPulse Intake Desk',
    note: 'Complaint received and registered in the civic grievance system.',
    action: 'Waiting for administrative verification.',
  },
  verified: {
    office: 'Ward Verification Officer',
    note: 'Evidence and location were reviewed. The issue has been accepted as a valid civic complaint.',
    action: 'Waiting for departmental assignment.',
  },
  assigned: {
    office: 'Department Control Room',
    note: 'The responsible department has acknowledged the issue and assigned it to a field team.',
    action: 'Field team scheduling and work order preparation are in progress.',
  },
  in_progress: {
    office: 'Field Operations / Assigned Team',
    note: 'The responsible team has started action on the complaint.',
    action: 'Repair or cleanup work is currently underway.',
  },
  resolved: {
    office: 'Resolution & Quality Check Desk',
    note: 'The department marked the complaint resolved after completing the work.',
    action: 'Resolution completed. Citizen can review the final status and repair evidence.',
  },
};

function currentStageIndex(status: ComplaintStatus) {
  return STATUS_ORDER.indexOf(status);
}

export default function ComplaintProgressPage() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const mine = await fetchUserComplaints(user.id);
      if (mine.length) {
        setComplaints(mine);
        setSelectedId((old) => old || mine[0].id);
        setDemoMode(false);
      } else {
        const demo = await fetchCommunityFeed({ scope: 'all', sort: 'newest' });
        setComplaints(demo);
        setSelectedId((old) => old || demo[0]?.id || '');
        setDemoMode(true);
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const selected = useMemo(() => complaints.find((c) => c.id === selectedId) || complaints[0], [complaints, selectedId]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 py-8 page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 px-3 py-1 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Administrative tracking
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Complaint Progress</h1>
          <p className="text-slate-500 mt-1">See which administrative level has acknowledged your complaint and what happens next.</p>
        </div>

        {demoMode && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <strong>Demo progress records are shown for clarity.</strong> Once you submit your own complaint, this page will automatically show your personal reports instead.
          </div>
        )}

        <div className="grid lg:grid-cols-[320px_1fr] gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden h-fit">
            <div className="p-4 border-b border-slate-100">
              <h2 className="font-display font-bold text-slate-900">Your reports</h2>
              <p className="text-xs text-slate-500 mt-1">Select a complaint to inspect its progress.</p>
            </div>
            <div className="max-h-[70vh] overflow-y-auto divide-y divide-slate-100">
              {complaints.map((c) => (
                <button key={c.id} onClick={() => setSelectedId(c.id)} className={`w-full text-left p-4 transition ${selected?.id === c.id ? 'bg-primary-50' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-slate-900 line-clamp-2">{c.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{CATEGORY_LABELS[c.category]}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ${selected?.id === c.id ? 'text-primary-600' : 'text-slate-300'}`} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-primary-700">{STATUS_LABELS[c.status]}</span>
                    <span className="text-slate-400">{timeAgo(c.created_at)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selected ? <ProgressDetail complaint={selected} /> : (
            <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center"><FileSearch className="w-10 h-10 mx-auto text-slate-300 mb-3" /><p className="text-slate-500">No complaint selected.</p></div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProgressDetail({ complaint }: { complaint: Complaint }) {
  const idx = currentStageIndex(complaint.status);
  const admin = ADMIN_STAGES[complaint.status];
  const office = complaint.status === 'reported' ? admin.office : complaint.status === 'verified' ? admin.office : complaint.suggested_department;
  const assigned = complaint.assigned_to || (idx >= 2 ? `${complaint.suggested_department} field unit` : 'Not assigned yet');

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-primary-600 mb-2">{CATEGORY_LABELS[complaint.category]}</div>
            <h2 className="text-2xl font-display font-bold text-slate-900">{complaint.title}</h2>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {complaint.location_text || complaint.area || 'Location recorded'}</span>
              <span className="inline-flex items-center gap-1"><Clock3 className="w-4 h-4" /> Reported {formatDate(complaint.created_at)}</span>
            </div>
          </div>
          <button onClick={() => navigateTo({ name: 'complaint', id: complaint.id })} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-primary-300 hover:text-primary-700">View full complaint</button>
        </div>

        <div className="grid sm:grid-cols-3 gap-3">
          <Info label="Current status" value={STATUS_LABELS[complaint.status]} icon={<ShieldCheck className="w-5 h-5" />} />
          <Info label="Administrative office" value={office} icon={<Building2 className="w-5 h-5" />} />
          <Info label="Assigned team" value={assigned} icon={<UserCheck className="w-5 h-5" />} />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-display font-bold text-slate-900 mb-1">Administrative progress</h3>
        <p className="text-sm text-slate-500 mb-6">This shows how far your complaint has moved through the civic workflow.</p>
        <div className="space-y-0">
          {STATUS_ORDER.map((status, stepIndex) => {
            const done = stepIndex <= idx;
            const current = stepIndex === idx;
            const stage = ADMIN_STAGES[status];
            const stageOffice = status === 'assigned' || status === 'in_progress' || status === 'resolved' ? complaint.suggested_department : stage.office;
            return (
              <div key={status} className="grid grid-cols-[36px_1fr] gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${done ? 'bg-primary-600 border-primary-600 text-white' : 'bg-white border-slate-200 text-slate-300'} ${current ? 'ring-4 ring-primary-100' : ''}`}>
                    {stepIndex < idx ? <Check className="w-4 h-4" /> : <span className="text-xs font-bold">{stepIndex + 1}</span>}
                  </div>
                  {stepIndex < STATUS_ORDER.length - 1 && <div className={`w-0.5 min-h-16 flex-1 ${stepIndex < idx ? 'bg-primary-300' : 'bg-slate-200'}`} />}
                </div>
                <div className="pb-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className={`font-bold ${done ? 'text-slate-900' : 'text-slate-400'}`}>{STATUS_LABELS[status]}</h4>
                    {current && <span className="text-[10px] font-bold uppercase bg-primary-50 text-primary-700 border border-primary-100 px-2 py-0.5 rounded-full">Current stage</span>}
                  </div>
                  <div className={`text-xs font-semibold mt-1 ${done ? 'text-primary-700' : 'text-slate-400'}`}>{stageOffice}</div>
                  <p className={`text-sm mt-2 ${done ? 'text-slate-600' : 'text-slate-400'}`}>{done ? stage.note : 'This stage has not been reached yet.'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5">
          <div className="text-xs uppercase tracking-wide font-bold text-primary-700 mb-2">Current administrative note</div>
          <p className="text-sm text-primary-950 leading-relaxed">{admin.note}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="text-xs uppercase tracking-wide font-bold text-slate-500 mb-2">What happens next</div>
          <p className="text-sm text-slate-700 leading-relaxed">{admin.action}</p>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return <div className="rounded-xl bg-slate-50 border border-slate-100 p-4"><div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-primary-600 flex items-center justify-center mb-3">{icon}</div><div className="text-xs text-slate-500">{label}</div><div className="text-sm font-bold text-slate-900 mt-1">{value}</div></div>;
}
