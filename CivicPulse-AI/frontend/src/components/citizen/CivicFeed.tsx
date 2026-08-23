import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { fetchCommunityFeed, fetchComplaintAreas, getSupporterCount, hasUserSupported, toggleSupport } from '@/lib/complaints';
import type { Complaint, ComplaintCategory, ComplaintStatus, FeedSort, Severity } from '@/types';
import { CATEGORY_LABELS, STATUS_LABELS } from '@/lib/constants';
import ComplaintCard from '@/components/ComplaintCard';
import { AlertCircle, Globe2, Loader2, LocateFixed, MapPin, Search, SlidersHorizontal, UsersRound } from 'lucide-react';

const categories = Object.keys(CATEGORY_LABELS) as ComplaintCategory[];
const statuses: ComplaintStatus[] = ['reported', 'verified', 'assigned', 'in_progress', 'resolved'];
const severities: Severity[] = ['low', 'medium', 'high', 'critical'];

export default function CivicFeed() {
  const { user } = useAuth();
  const [scope, setScope] = useState<'nearby' | 'all'>('nearby');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationNotice, setLocationNotice] = useState('Detecting your location…');
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const [search, setSearch] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState<ComplaintCategory | ''>('');
  const [status, setStatus] = useState<ComplaintStatus | ''>('');
  const [severity, setSeverity] = useState<Severity | ''>('');
  const [sort, setSort] = useState<FeedSort>('nearby');
  const [supportData, setSupportData] = useState<Record<string, { count: number; supported: boolean }>>({});

  useEffect(() => {
    fetchComplaintAreas().then(setAreas).catch(() => setAreas([]));
    if (!navigator.geolocation) {
      setCoords({ latitude: 17.4485, longitude: 78.3742 });
      setLocationNotice('Location is unavailable — using the HITEC City demo area.');
      setLocationLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLocationNotice(`Using your current location (±${Math.round(pos.coords.accuracy)} m).`);
        setLocationLoading(false);
      },
      () => {
        setCoords({ latitude: 17.4485, longitude: 78.3742 });
        setLocationNotice('Location permission was not available — using the HITEC City demo area.');
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  useEffect(() => {
    if (scope === 'all' && sort === 'nearby') setSort('newest');
    if (scope === 'nearby' && sort === 'newest') setSort('nearby');
  }, [scope]);

  const loadFeed = useCallback(async () => {
    if (scope === 'nearby' && !coords) return;
    setLoading(true);
    try {
      const data = await fetchCommunityFeed({
        scope,
        q: search.trim() || undefined,
        area: area || undefined,
        category: category || undefined,
        status: status || undefined,
        severity: severity || undefined,
        sort,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
        radius: scope === 'nearby' ? 5000 : undefined,
      });
      setComplaints(data);

      const supportMap: Record<string, { count: number; supported: boolean }> = {};
      await Promise.all(data.map(async (c) => {
        const [count, supported] = await Promise.all([
          getSupporterCount(c.id),
          user ? hasUserSupported(c.id, user.id) : Promise.resolve(false),
        ]);
        supportMap[c.id] = { count, supported };
      }));
      setSupportData(supportMap);
    } catch (error) {
      console.error('Failed to load civic feed:', error);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  }, [scope, search, area, category, status, severity, sort, coords, user]);

  useEffect(() => {
    const timer = window.setTimeout(loadFeed, 200);
    return () => window.clearTimeout(timer);
  }, [loadFeed]);

  const handleSupport = useCallback(async (complaintId: string) => {
    if (!user) return;
    try {
      const isSupported = await toggleSupport(complaintId, user.id);
      setSupportData((prev) => ({
        ...prev,
        [complaintId]: {
          count: Math.max(0, (prev[complaintId]?.count || 0) + (isSupported ? 1 : -1)),
          supported: isSupported,
        },
      }));
      setComplaints((prev) => prev.map((c) => c.id === complaintId
        ? { ...c, priority_score: Math.max(0, Math.min(100, c.priority_score + (isSupported ? 2 : -2))) }
        : c));
    } catch (error) {
      console.error('Support update failed:', error);
    }
  }, [user]);

  const duplicateCount = useMemo(() => complaints.filter((c) => c.duplicate_of).length, [complaints]);
  const affectedPeople = useMemo(() => complaints.reduce((sum, c) => sum + (supportData[c.id]?.count ?? c.supporter_count ?? 0), 0), [complaints, supportData]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-7">
          <div>
            <div className="inline-flex items-center gap-2 text-primary-700 bg-primary-50 border border-primary-100 rounded-full px-3 py-1 text-xs font-bold mb-3">
              <UsersRound className="w-3.5 h-3.5" /> Community-powered civic awareness
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900">Civic Feed</h1>
            <p className="text-slate-500 mt-1">See problems reported by citizens near you or across other areas, and support issues that affect you too.</p>
          </div>
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm self-start">
            <button onClick={() => setScope('nearby')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${scope === 'nearby' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
              <LocateFixed className="w-4 h-4" /> Near Me
            </button>
            <button onClick={() => setScope('all')} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition ${scope === 'all' ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}>
              <Globe2 className="w-4 h-4" /> All Areas
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-6">
          <MiniStat label="Visible complaints" value={complaints.length} icon={<MapPin className="w-4 h-4" />} />
          <MiniStat label="People affected" value={affectedPeople} icon={<UsersRound className="w-4 h-4" />} />
          <MiniStat label="Duplicate reports" value={duplicateCount} icon={<AlertCircle className="w-4 h-4" />} />
        </div>

        {scope === 'nearby' && (
          <div className="mb-5 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-800 flex items-center gap-2">
            {locationLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LocateFixed className="w-4 h-4" />}
            {locationNotice} Nearby shows reports within 5 km.
          </div>
        )}

        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-sm font-bold text-slate-800">
            <SlidersHorizontal className="w-4 h-4 text-primary-600" /> Find civic issues
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-6 gap-3">
            <label className="xl:col-span-2 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search complaints or places…" className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400" />
            </label>
            <Select value={area} onChange={setArea} options={areas.map((x) => [x, x])} placeholder="All areas" />
            <Select value={category} onChange={(v) => setCategory(v as ComplaintCategory | '')} options={categories.map((x) => [x, CATEGORY_LABELS[x]])} placeholder="All categories" />
            <Select value={status} onChange={(v) => setStatus(v as ComplaintStatus | '')} options={statuses.map((x) => [x, STATUS_LABELS[x]])} placeholder="All statuses" />
            <Select value={severity} onChange={(v) => setSeverity(v as Severity | '')} options={severities.map((x) => [x, x.charAt(0).toUpperCase() + x.slice(1)])} placeholder="All severities" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-slate-500 mr-1">Sort:</span>
            {([
              ['nearby', 'Nearby'],
              ['priority', 'Highest Priority'],
              ['supported', 'Most Supported'],
              ['newest', 'Newest'],
            ] as [FeedSort, string][]).map(([value, label]) => (
              <button key={value} disabled={value === 'nearby' && !coords} onClick={() => setSort(value)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition ${sort === value ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'} disabled:opacity-40`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>
        ) : complaints.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl py-16 px-6 text-center">
            <MapPin className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-display font-bold text-slate-900">No matching complaints</h3>
            <p className="text-sm text-slate-500 mt-1">Try All Areas or clear one of the filters.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {complaints.map((c) => (
              <ComplaintCard
                key={c.id}
                complaint={c}
                onSupport={c.user_id === user?.id ? undefined : handleSupport}
                supporterCount={supportData[c.id]?.count ?? c.supporter_count ?? 0}
                hasSupported={supportData[c.id]?.supported || false}
                showSupportText={c.user_id !== user?.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Select({ value, onChange, options, placeholder }: { value: string; onChange: (value: string) => void; options: [string, string][]; placeholder: string }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-400">
      <option value="">{placeholder}</option>
      {options.map(([v, label]) => <option key={v} value={v}>{label}</option>)}
    </select>
  );
}

function MiniStat({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">{icon}</div>
      <div><div className="text-xl font-bold text-slate-900">{value}</div><div className="text-xs text-slate-500">{label}</div></div>
    </div>
  );
}
