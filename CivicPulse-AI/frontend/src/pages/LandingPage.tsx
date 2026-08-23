import { useEffect, useState } from 'react';
import { navigateTo } from '@/lib/router';
import { useAuth } from '@/lib/auth';
import { fetchComplaints, getSupporterCount } from '@/lib/complaints';
import type { Complaint } from '@/types';
import ComplaintCard from '@/components/ComplaintCard';
import {
  Building2, MapPin, Camera, Shield, Sparkles, ArrowRight, CheckCircle2,
  AlertTriangle, Activity, Users, Zap, TrendingUp, Eye, ThumbsUp, ChevronRight,
} from 'lucide-react';

export default function LandingPage() {
  const { user, profile } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [stats, setStats] = useState({ total: 0, resolved: 0, active: 0 });
  const [supportCounts, setSupportCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints()
      .then(async (data) => {
        setComplaints(data.slice(0, 6));
        const total = data.length;
        const resolved = data.filter((c) => c.status === 'resolved').length;
        const active = total - resolved;
        setStats({ total, resolved, active });

        // Fetch supporter counts for visible complaints
        const counts: Record<string, number> = {};
        await Promise.all(
          data.slice(0, 6).map(async (c) => {
            counts[c.id] = await getSupporterCount(c.id);
          })
        );
        setSupportCounts(counts);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleReport = () => {
    if (user) navigateTo({ name: 'report' });
    else navigateTo({ name: 'auth', mode: 'register' });
  };

  const handleDashboard = () => {
    if (!user) navigateTo({ name: 'auth', mode: 'login' });
    else if (profile?.role === 'authority') navigateTo({ name: 'authority-dashboard' });
    else navigateTo({ name: 'citizen-dashboard' });
  };

  return (
    <div className="page-enter">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-primary-50/30 to-accent-50/30">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent-200 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-primary-200 mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-primary-700">AI-Powered Civic Management</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Smarter Cities.<br />
              <span className="gradient-text">Faster Action.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Report potholes, garbage, water leakage, broken streetlights and more.
              AI instantly analyzes severity, assigns priority, and routes to the right department.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button
                onClick={handleReport}
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white font-semibold rounded-xl shadow-xl shadow-primary-600/20 hover:shadow-2xl hover:scale-105 transition-all"
              >
                <Camera className="w-5 h-5" />
                Report an Issue
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleDashboard}
                className="flex items-center gap-2 px-8 py-4 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 hover:border-primary-300 hover:text-primary-600 transition-all"
              >
                <Shield className="w-5 h-5" />
                {user ? 'Go to Dashboard' : 'Authority Login'}
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <StatBox icon={<AlertTriangle className="w-5 h-5" />} value={stats.total} label="Issues Reported" color="text-primary-600" bg="bg-primary-50" />
            <StatBox icon={<CheckCircle2 className="w-5 h-5" />} value={stats.resolved} label="Issues Resolved" color="text-success-600" bg="bg-success-50" />
            <StatBox icon={<Activity className="w-5 h-5" />} value={stats.active} label="Active Issues" color="text-warning-600" bg="bg-warning-50" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-3">How It Works</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">From snapping a photo to seeing it resolved — a seamless civic reporting experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Camera className="w-6 h-6" />}
              title="Snap & Report"
              desc="Upload a photo of the issue, add a short description, and set the location on the map."
              step="01"
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="AI Analysis"
              desc="AI detects the issue type, severity, priority score, and suggests the responsible department."
              step="02"
            />
            <FeatureCard
              icon={<CheckCircle2 className="w-6 h-6" />}
              title="Track & Resolve"
              desc="Follow your complaint through verification, assignment, and resolution. Support issues others face too."
              step="03"
            />
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-primary-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 mb-4">
                <Zap className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-semibold text-primary-700">AI Features</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">
                Intelligent Issue Detection
              </h2>
              <p className="text-slate-600 mb-6">
                When a photo is uploaded, CivicPulse AI automatically returns the issue type, severity level,
                priority score (0–100), and the department best suited to handle it.
              </p>
              <div className="space-y-3">
                <Feature icon={<TrendingUp className="w-4 h-4" />} text="Priority scoring from 0–100 based on severity and context" />
                <Feature icon={<Building2 className="w-4 h-4" />} text="Auto-routing to the correct municipal department" />
                <Feature icon={<Users className="w-4 h-4" />} text="Duplicate detection — join existing reports near you" />
              </div>
            </div>

            {/* AI Example Card */}
            <div className="bg-white rounded-3xl shadow-2xl shadow-primary-600/10 border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-900">AI Analysis Result</h3>
                  <p className="text-xs text-slate-500">Example output</p>
                </div>
              </div>

              <div className="space-y-4">
                <ResultRow label="Issue" value="Pothole" />
                <ResultRow label="Severity" value="High" badge="high" />
                <ResultRow label="Priority" value="86 / 100" badge="critical" />
                <ResultRow label="Department" value="Roads Department" />
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-sm text-slate-500 italic">
                    "A pothole has been detected that may pose a risk to vehicles and commuters."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Complaints */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">Recent High-Priority Reports</h2>
              <p className="text-slate-500">Latest issues reported by citizens in your area</p>
            </div>
            <button
              onClick={() => navigateTo({ name: 'map' })}
              className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-56 skeleton rounded-2xl" />
              ))}
            </div>
          ) : complaints.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl">
              <AlertTriangle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No complaints reported yet. Be the first to report an issue!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {complaints.map((c) => (
                <ComplaintCard
                  key={c.id}
                  complaint={c}
                  supporterCount={supportCounts[c.id] || 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-accent-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
            Make Your City Better Today
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of citizens reporting issues and authorities resolving them faster than ever.
          </p>
          <button
            onClick={handleReport}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-bold rounded-xl shadow-xl hover:scale-105 transition-all"
          >
            <Camera className="w-5 h-5" />
            Report Your First Issue
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-white">CivicPulse AI</span>
            </div>
            <p className="text-sm">Smarter Cities. Faster Action. Built for hackathons.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StatBox({ icon, value, label, color, bg }: { icon: React.ReactNode; value: number; label: string; color: string; bg: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-5 text-center">
      <div className={`inline-flex w-10 h-10 rounded-xl ${bg} items-center justify-center ${color} mb-2`}>
        {icon}
      </div>
      <div className="text-3xl font-display font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

function FeatureCard({ icon, title, desc, step }: { icon: React.ReactNode; title: string; desc: string; step: string }) {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 p-8 card-lift">
      <div className="absolute top-4 right-4 text-5xl font-display font-bold text-slate-100 group-hover:text-primary-100 transition-colors">
        {step}
      </div>
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-display font-bold text-slate-900 text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm">{desc}</p>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-slate-700">{text}</span>
    </div>
  );
}

function ResultRow({ label, value, badge }: { label: string; value: string; badge?: string }) {
  let badgeColor = '';
  if (badge === 'high') badgeColor = 'bg-orange-100 text-orange-700';
  else if (badge === 'critical') badgeColor = 'bg-red-100 text-red-700';

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-500">{label}</span>
      {badge ? (
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${badgeColor}`}>{value}</span>
      ) : (
        <span className="text-sm font-semibold text-slate-900">{value}</span>
      )}
    </div>
  );
}
