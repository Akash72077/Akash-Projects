import { useEffect, useState, useCallback } from 'react';

export type Route =
  | { name: 'landing' }
  | { name: 'overview' }
  | { name: 'auth'; mode: 'login' | 'register' }
  | { name: 'report' }
  | { name: 'citizen-dashboard' }
  | { name: 'feed' }
  | { name: 'progress' }
  | { name: 'contractors' }
  | { name: 'trust' }
  | { name: 'authority-dashboard' }
  | { name: 'hotspots' }
  | { name: 'hotspot-detail'; area: string }
  | { name: 'map' }
  | { name: 'complaint'; id: string };

function parseHash(): Route {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const parts = hash.split('/').filter(Boolean);

  if (parts.length === 0) return { name: 'landing' };
  if (parts[0] === 'overview') return { name: 'overview' };
  if (parts[0] === 'auth') return { name: 'auth', mode: parts[1] === 'register' ? 'register' : 'login' };
  if (parts[0] === 'report') return { name: 'report' };
  if (parts[0] === 'dashboard') return { name: 'citizen-dashboard' };
  if (parts[0] === 'feed') return { name: 'feed' };
  if (parts[0] === 'progress') return { name: 'progress' };
  if (parts[0] === 'contractors') return { name: 'contractors' };
  if (parts[0] === 'trust') return { name: 'trust' };
  if (parts[0] === 'authority') return { name: 'authority-dashboard' };
  if (parts[0] === 'hotspots' && parts[1]) return { name: 'hotspot-detail', area: decodeURIComponent(parts.slice(1).join('/')) };
  if (parts[0] === 'hotspots') return { name: 'hotspots' };
  if (parts[0] === 'map') return { name: 'map' };
  if (parts[0] === 'complaint' && parts[1]) return { name: 'complaint', id: parts[1] };
  return { name: 'landing' };
}

function routeToHash(route: Route): string {
  switch (route.name) {
    case 'landing': return '/';
    case 'overview': return '/overview';
    case 'auth': return `/auth/${route.mode}`;
    case 'report': return '/report';
    case 'citizen-dashboard': return '/dashboard';
    case 'feed': return '/feed';
    case 'progress': return '/progress';
    case 'contractors': return '/contractors';
    case 'trust': return '/trust';
    case 'authority-dashboard': return '/authority';
    case 'hotspots': return '/hotspots';
    case 'hotspot-detail': return `/hotspots/${encodeURIComponent(route.area)}`;
    case 'map': return '/map';
    case 'complaint': return `/complaint/${route.id}`;
  }
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash());

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((newRoute: Route) => {
    const hash = routeToHash(newRoute);
    if (window.location.hash.replace(/^#/, '') !== hash) window.location.hash = hash;
    else setRoute(newRoute);
    window.scrollTo(0, 0);
  }, []);

  return { route, navigate };
}

export function navigateTo(route: Route) {
  window.location.hash = routeToHash(route);
  window.scrollTo(0, 0);
}
