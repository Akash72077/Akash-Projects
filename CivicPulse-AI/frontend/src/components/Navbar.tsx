import { useAuth } from '@/lib/auth';
import { navigateTo, useRouter } from '@/lib/router';
import { useTheme } from '@/lib/theme';
import { useState } from 'react';
import {
  LayoutDashboard, MapPin, Plus, LogOut, Menu, X, ShieldCheck, UserRound,
  Globe2, Route, ClipboardList, Wrench, LockKeyhole, Moon, Sun, Activity, BrainCircuit
} from 'lucide-react';

export default function Navbar() {
  const { user, profile, signOut } = useAuth();
  const { route } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  if (!user) return null;

  const isAuthority = profile?.role === 'authority';
  const handleSignOut = async () => { await signOut(); navigateTo({ name: 'landing' }); };
  const go = (target: Parameters<typeof navigateTo>[0]) => { navigateTo(target); setMenuOpen(false); };

  const citizenItems = [
    { label: 'Overview', icon: LayoutDashboard, route: 'overview' as const, target: { name:'overview' } as const },
    { label: 'Report Issue', icon: Plus, route: 'report' as const, target: { name:'report' } as const },
    { label: 'Civic Feed', icon: Globe2, route: 'feed' as const, target: { name:'feed' } as const },
    { label: 'Issue Map', icon: MapPin, route: 'map' as const, target: { name:'map' } as const },
    { label: 'My Complaints', icon: ClipboardList, route: 'citizen-dashboard' as const, target: { name:'citizen-dashboard' } as const },
    { label: 'Complaint Progress', icon: Route, route: 'progress' as const, target: { name:'progress' } as const },
    { label: 'Authority Dashboard', icon: ShieldCheck, route: 'authority-dashboard' as const, target: { name:'authority-dashboard' } as const },
    { label: 'Contractors', icon: Wrench, route: 'contractors' as const, target: { name:'contractors' } as const },
    { label: 'Trust & Security', icon: LockKeyhole, route: 'trust' as const, target: { name:'trust' } as const },
  ];
  const authorityItems = [
    { label: 'Authority Dashboard', icon: LayoutDashboard, route: 'authority-dashboard' as const, target: { name:'authority-dashboard' } as const },
    { label: 'Civic Feed', icon: Globe2, route: 'feed' as const, target: { name:'feed' } as const },
    { label: 'Issue Map', icon: MapPin, route: 'map' as const, target: { name:'map' } as const },
    { label: 'Hotspot Prediction', icon: BrainCircuit, route: 'hotspots' as const, target: { name:'hotspots' } as const },
    { label: 'Contractors', icon: Wrench, route: 'contractors' as const, target: { name:'contractors' } as const },
    { label: 'Trust & Security', icon: LockKeyhole, route: 'trust' as const, target: { name:'trust' } as const },
  ];
  const navItems = isAuthority ? authorityItems : citizenItems;

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white text-slate-700 dark:bg-[#0d1323] dark:text-slate-300">
      <div className="h-[92px] flex items-center px-5 border-b border-slate-200/80 dark:border-white/10">
        <button onClick={() => go({ name: isAuthority ? 'authority-dashboard' : 'overview' })} className="flex items-center gap-3 min-w-0" title="CivicPulse AI">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-violet-600 text-white shadow-[0_8px_24px_rgba(124,58,237,.24)]"><Activity className="h-5 w-5" /></div>
          <div className="text-left min-w-0"><div className="font-display font-extrabold text-slate-950 dark:text-white text-lg leading-tight truncate">CivicPulse <span className="text-violet-600 dark:text-violet-400">AI</span></div><div className="text-[9px] text-slate-400 tracking-wide">Smarter Cities. Faster Action.</div></div>
        </button>
      </div>
      <nav className="flex-1 py-5 space-y-1 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const Icon=item.icon; const active = route.name === item.route || (item.route==='citizen-dashboard' && route.name==='complaint') || (item.route==='hotspots' && route.name==='hotspot-detail');
          return <button key={item.label} onClick={() => go(item.target)} className={`w-full flex items-center rounded-xl transition-all duration-200 gap-3 px-3.5 py-2.5 ${active ? 'neon-nav-active bg-violet-50 text-violet-700 dark:bg-violet-500/12 dark:text-violet-300' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'}`}><Icon className={`w-4 h-4 ${active?'text-violet-600 dark:text-violet-400':'text-slate-400'}`} /><span className="font-semibold text-[13px]">{item.label}</span></button>
        })}
      </nav>
      <div className="px-4 pb-3">
        <div className="relative min-h-[118px] overflow-hidden rounded-2xl border border-violet-200 bg-gradient-to-br from-white via-violet-50 to-fuchsia-100 p-4 shadow-[0_12px_30px_rgba(124,58,237,0.16)] dark:border-violet-400/40 dark:from-[#f7f2ff] dark:via-[#eee7ff] dark:to-[#e7ddff] dark:shadow-[0_0_30px_rgba(139,92,246,0.24)]">
          <div className="relative z-10 w-[58%]">
            <div className="text-[12px] font-extrabold leading-[1.35] text-slate-950">Make your city<br/>better, together.</div>
            <div className="mt-3 text-[9px] leading-4 text-slate-600">Every report counts.<br/>Every change matters.</div>
          </div>
          <svg aria-hidden="true" viewBox="0 0 120 110" className="absolute bottom-0 right-0 h-[106px] w-[112px]">
            <defs>
              <linearGradient id="cityGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#7c3aed"/>
                <stop offset="0.55" stopColor="#d946ef"/>
                <stop offset="1" stopColor="#06b6d4"/>
              </linearGradient>
              <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.2" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <ellipse cx="72" cy="104" rx="45" ry="5" fill="#8b5cf6" opacity=".18"/>
            <g fill="url(#cityGlow)" filter="url(#softGlow)">
              <path d="M48 95V48h12v47z"/>
              <path d="M62 95V31h16v64z"/>
              <path d="M80 95V42h15v53z"/>
              <path d="M97 95V58h10v37z"/>
              <path d="M34 95V63h12v32z"/>
              <path d="M68 31l2-11 2 11z"/>
            </g>
            <g fill="#fff" opacity=".9">
              <rect x="52" y="56" width="3" height="4" rx=".6"/><rect x="52" y="65" width="3" height="4" rx=".6"/><rect x="52" y="74" width="3" height="4" rx=".6"/>
              <rect x="66" y="44" width="3" height="4" rx=".6"/><rect x="72" y="44" width="3" height="4" rx=".6"/><rect x="66" y="53" width="3" height="4" rx=".6"/><rect x="72" y="53" width="3" height="4" rx=".6"/><rect x="66" y="62" width="3" height="4" rx=".6"/><rect x="72" y="62" width="3" height="4" rx=".6"/>
              <rect x="84" y="52" width="3" height="4" rx=".6"/><rect x="90" y="52" width="3" height="4" rx=".6"/><rect x="84" y="61" width="3" height="4" rx=".6"/><rect x="90" y="61" width="3" height="4" rx=".6"/>
              <rect x="100" y="68" width="3" height="4" rx=".6"/><rect x="38" y="71" width="3" height="4" rx=".6"/>
            </g>
            <path d="M28 98h84" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" opacity=".85"/>
            <path d="M42 102h68" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
            <path d="M58 106h49" stroke="#d946ef" strokeWidth="2" strokeLinecap="round" opacity=".75"/>
          </svg>
        </div>
      </div>
      <div className="border-t border-slate-200/80 py-4 px-4 dark:border-white/10">
        <div className="mb-3 flex items-center gap-3 rounded-xl p-2"><div className="w-9 h-9 shrink-0 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200 flex items-center justify-center font-extrabold text-xs">{profile?.full_name?.charAt(0).toUpperCase() || 'U'}</div><div className="min-w-0 flex-1"><div className="text-xs font-bold text-slate-900 dark:text-white truncate">{profile?.full_name || 'User'}</div><div className="text-[10px] text-slate-500 dark:text-slate-400 capitalize flex items-center gap-1">{isAuthority ? <ShieldCheck className="w-3 h-3" /> : <UserRound className="w-3 h-3" />}{profile?.role || 'citizen'}</div></div><button onClick={toggleTheme} className="neon-theme-toggle grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button></div>
        <button onClick={handleSignOut} className="w-full flex items-center rounded-lg text-slate-500 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/5 transition-colors gap-3 px-2 py-2.5"><LogOut className="w-4 h-4" /><span className="font-medium text-sm">Sign Out</span></button>
      </div>
    </div>
  );

  return <>
    <aside className="hidden md:block fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200/80 dark:border-white/10"><SidebarContent /></aside>
    <header className="md:hidden fixed top-0 inset-x-0 z-50 h-16 bg-white/95 dark:bg-[#0d1323]/95 backdrop-blur border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-4"><button onClick={() => go({ name: isAuthority ? 'authority-dashboard' : 'overview' })} className="flex items-center gap-2"><div className="w-9 h-9 rounded-xl bg-violet-600 text-white flex items-center justify-center"><Activity className="w-5 h-5" /></div><span className="font-display font-bold text-slate-950 dark:text-white">CivicPulse AI</span></button><div className="flex items-center gap-1"><button onClick={toggleTheme} className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10">{theme === 'dark' ? <Sun className="w-5 h-5"/> : <Moon className="w-5 h-5"/>}</button><button onClick={() => setMenuOpen(true)} className="p-2 rounded-lg text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"><Menu className="w-6 h-6" /></button></div></header>
    {menuOpen && <div className="md:hidden fixed inset-0 z-[60]"><button className="absolute inset-0 bg-black/55" onClick={() => setMenuOpen(false)} /><aside className="absolute inset-y-0 left-0 w-[82%] max-w-72 border-r border-slate-200 dark:border-white/10 shadow-2xl"><button onClick={() => setMenuOpen(false)} className="absolute right-3 top-3 z-10 p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"><X className="w-5 h-5" /></button><SidebarContent /></aside></div>}
  </>;
}
