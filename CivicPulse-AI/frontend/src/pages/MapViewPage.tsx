import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '@/lib/auth';
import { navigateTo } from '@/lib/router';
import { fetchComplaints, toggleSupport, getSupporterCount, hasUserSupported } from '@/lib/complaints';
import type { Complaint, ComplaintStatus, ComplaintCategory, Severity } from '@/types';
import MapView from '@/components/MapView';
import ComplaintCard from '@/components/ComplaintCard';
import {
  Loader2, Filter, MapPin, ChevronDown, Search,
} from 'lucide-react';
import { STATUS_LABELS, STATUS_ORDER, CATEGORY_LABELS, SEVERITY_LABELS } from '@/lib/constants';

export default function MapViewPage() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<ComplaintCategory | 'all'>('all');
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [supportData, setSupportData] = useState<Record<string, { count: number; supported: boolean }>>({});

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchComplaints();
      setComplaints(data);

      if (user) {
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
      }
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

  const filtered = useMemo(() => {
    let result = [...complaints];
    if (statusFilter !== 'all') result = result.filter((c) => c.status === statusFilter);
    if (categoryFilter !== 'all') result = result.filter((c) => c.category === categoryFilter);
    if (severityFilter !== 'all') result = result.filter((c) => c.severity === severityFilter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.location_text?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [complaints, statusFilter, categoryFilter, severityFilter, searchQuery]);

  const mapComplaints = filtered.filter((c) => c.latitude != null && c.longitude != null);
  const selectedComplaint = selectedId ? filtered.find((c) => c.id === selectedId) : null;

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
        <div className="mb-6">
          <h1 className="text-3xl font-display font-bold text-slate-900 mb-1 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-primary-600" />
            Map View
          </h1>
          <p className="text-slate-500">Explore all reported civic issues on the map. Click a marker for details.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search issues..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm"
              />
            </div>
            <SelectFilter value={statusFilter} onChange={(v) => setStatusFilter(v as ComplaintStatus | 'all')} options={[['all', 'All Statuses'], ...STATUS_ORDER.map((s) => [s, STATUS_LABELS[s]] as [string, string])]} />
            <SelectFilter value={categoryFilter} onChange={(v) => setCategoryFilter(v as ComplaintCategory | 'all')} options={[['all', 'All Categories'], ...(Object.keys(CATEGORY_LABELS) as ComplaintCategory[]).map((c) => [c, CATEGORY_LABELS[c]] as [string, string])]} />
            <SelectFilter value={severityFilter} onChange={(v) => setSeverityFilter(v as Severity | 'all')} options={[['all', 'All Severities'], ...(['critical', 'high', 'medium', 'low'] as Severity[]).map((s) => [s, SEVERITY_LABELS[s]] as [string, string])]} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-2 overflow-hidden">
              <MapView
                complaints={mapComplaints}
                height="600px"
                onMarkerClick={(id) => setSelectedId(id)}
              />
            </div>
          </div>

          {/* Sidebar list */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 h-[600px] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-slate-900">
                  Nearby Issues
                  <span className="text-sm font-normal text-slate-400 ml-2">({filtered.length})</span>
                </h2>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-12">
                  <Filter className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">No issues match your filters.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((c) => (
                    <div
                      key={c.id}
                      onMouseEnter={() => setSelectedId(c.id)}
                      onClick={() => navigateTo({ name: 'complaint', id: c.id })}
                      className={`cursor-pointer rounded-xl transition-all ${selectedId === c.id ? 'ring-2 ring-primary-400' : ''}`}
                    >
                      <ComplaintCard
                        complaint={c}
                        compact
                        onSupport={handleSupport}
                        supporterCount={supportData[c.id]?.count || 0}
                        hasSupported={supportData[c.id]?.supported || false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectFilter({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-slate-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-sm bg-white font-medium w-full lg:w-auto"
      >
        {options.map(([val, label]) => (
          <option key={val} value={val}>{label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}
