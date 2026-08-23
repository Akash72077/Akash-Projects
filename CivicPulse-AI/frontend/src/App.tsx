import './App.css';
import { AuthProvider, useAuth } from '@/lib/auth';
import { useRouter, navigateTo } from '@/lib/router';
import Navbar from '@/components/Navbar';
import LandingPage from '@/pages/LandingPage';
import OverviewPage from '@/pages/OverviewPage';
import AuthPage from '@/pages/AuthPage';
import ReportIssuePage from '@/pages/ReportIssuePage';
import CitizenDashboard from '@/pages/CitizenDashboard';
import CivicFeedPage from '@/pages/CivicFeedPage';
import AuthorityDashboard from '@/pages/AuthorityDashboard';
import MapViewPage from '@/pages/MapViewPage';
import ComplaintDetailPage from '@/pages/ComplaintDetailPage';
import ComplaintProgressPage from '@/pages/ComplaintProgressPage';
import ContractorsPage from '@/pages/ContractorsPage';
import TrustSecurityPage from '@/pages/TrustSecurityPage';
import HotspotPredictionPage from '@/pages/HotspotPredictionPage';
import HotspotDetailPage from '@/pages/HotspotDetailPage';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ThemeProvider } from '@/lib/theme';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  useEffect(() => { if (!loading && !user) navigateTo({ name: 'auth', mode: 'login' }); }, [loading, user]);
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>;
  if (!user) return null;
  return <>{children}</>;
}

function AuthorityRoute({ children }: { children: React.ReactNode }) {
  const { user, profile, loading } = useAuth();
  useEffect(() => {
    if (!loading && !user) navigateTo({ name: 'auth', mode: 'login' });
    else if (!loading && user && profile?.role !== 'authority') navigateTo({ name: 'overview' });
  }, [loading, user, profile]);
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>;
  if (!user || profile?.role !== 'authority') return null;
  return <>{children}</>;
}

function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f7f8fc] text-slate-900 transition-colors dark:bg-[#0b1020] dark:text-slate-100"><Navbar /><main className="pt-16 md:pt-0 md:pl-64 transition-[padding] duration-300">{children}</main></div>;
}

function AppRoutes() {
  const { route } = useRouter();
  const { loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary-600" /></div>;

  switch (route.name) {
    case 'landing': return <LandingPage />;
    case 'overview': return <ProtectedRoute><AppShell><OverviewPage /></AppShell></ProtectedRoute>;
    case 'auth': return <AuthPage mode={route.mode} />;
    case 'report': return <ProtectedRoute><AppShell><ReportIssuePage /></AppShell></ProtectedRoute>;
    case 'citizen-dashboard': return <ProtectedRoute><AppShell><CitizenDashboard /></AppShell></ProtectedRoute>;
    case 'progress': return <ProtectedRoute><AppShell><ComplaintProgressPage /></AppShell></ProtectedRoute>;
    case 'contractors': return <ProtectedRoute><AppShell><ContractorsPage /></AppShell></ProtectedRoute>;
    case 'trust': return <ProtectedRoute><AppShell><TrustSecurityPage /></AppShell></ProtectedRoute>;
    case 'feed': return <ProtectedRoute><AppShell><CivicFeedPage /></AppShell></ProtectedRoute>;
    case 'authority-dashboard': return <ProtectedRoute><AppShell><AuthorityDashboard /></AppShell></ProtectedRoute>;
    case 'hotspots': return <AuthorityRoute><AppShell><HotspotPredictionPage /></AppShell></AuthorityRoute>;
    case 'hotspot-detail': return <AuthorityRoute><AppShell><HotspotDetailPage area={route.area} /></AppShell></AuthorityRoute>;
    case 'map': return <ProtectedRoute><AppShell><MapViewPage /></AppShell></ProtectedRoute>;
    case 'complaint': return <ProtectedRoute><AppShell><ComplaintDetailPage id={route.id} /></AppShell></ProtectedRoute>;
    default: return <LandingPage />;
  }
}

function App() { return <ThemeProvider><AuthProvider><AppRoutes /></AuthProvider></ThemeProvider>; }
export default App;
