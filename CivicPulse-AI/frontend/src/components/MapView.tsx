import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { Complaint } from '@/types';
import { CATEGORY_LABELS, getPublicPhotoUrl, SEVERITY_COLORS } from '@/lib/constants';

interface MapViewProps {
  complaints: Complaint[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  onMarkerClick?: (complaintId: string) => void;
  selectable?: boolean;
  selectedLocation?: { lat: number; lng: number } | null;
  onLocationSelect?: (lat: number, lng: number) => void;
}

const severityPinColors: Record<string, string> = {
  low: '#3b82f6',
  medium: '#f59e0b',
  high: '#f97316',
  critical: '#ef4444',
  resolved: '#22c55e',
};

export default function MapView({
  complaints,
  center = [28.6139, 77.209],
  zoom = 12,
  height = '400px',
  onMarkerClick,
  selectable = false,
  selectedLocation,
  onLocationSelect,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const selectMarkerRef = useRef<L.Marker | null>(null);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Fix: ensure map renders correctly after container is visible
    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when complaints change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    complaints.forEach((c) => {
      if (c.latitude == null || c.longitude == null) return;

      const color = c.status === 'resolved' ? severityPinColors.resolved : (severityPinColors[c.severity] || '#64748b');

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="position: relative; transform: translate(-50%, -100%);">
          <div style="width: 28px; height: 28px; background: ${color}; border: 3px solid white; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
          <div style="position: absolute; top: 6px; left: 6px; width: 16px; height: 16px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: ${color}; transform: rotate(45deg);">${c.priority_score}</div>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
      });

      const marker = L.marker([c.latitude, c.longitude], { icon }).addTo(map);

      const photoHtml = c.photo_url && getPublicPhotoUrl(c.photo_url)
        ? `<img src="${getPublicPhotoUrl(c.photo_url)}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />`
        : '';

      const sevColor = SEVERITY_COLORS[c.severity];
      marker.bindPopup(`
        <div style="min-width: 200px;">
          ${photoHtml}
          <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">${c.title}</div>
          <div style="font-size: 12px; color: #64748b; margin-bottom: 6px;">${CATEGORY_LABELS[c.category]} • ${c.location_text || 'Location set'}</div>
          <div style="display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600; background: ${sevColor.bg}; color: ${sevColor.text};">${c.severity.toUpperCase()}</div>
          <div style="margin-top: 6px; font-size: 12px;">Priority: <b>${c.priority_score}/100</b></div>
          <div style="margin-top: 3px; font-size: 12px;">People affected: <b>${c.supporter_count || 0}</b></div>
          ${c.duplicate_of ? '<div style="margin-top:6px;font-size:11px;font-weight:700;color:#b45309;">Possible duplicate report</div>' : ''}
        </div>
      `);

      if (onMarkerClick) {
        marker.on('click', () => onMarkerClick(c.id));
      }

      markersRef.current.push(marker);
    });

    // Fit bounds if we have markers
    if (complaints.length > 0 && complaints.some((c) => c.latitude != null)) {
      const validPoints = complaints.filter((c) => c.latitude != null && c.longitude != null);
      if (validPoints.length === 1) {
        map.setView([validPoints[0].latitude!, validPoints[0].longitude!], zoom);
      } else if (validPoints.length > 1) {
        const bounds = L.latLngBounds(validPoints.map((c) => [c.latitude!, c.longitude!] as [number, number]));
        map.fitBounds(bounds, { padding: [40, 40] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complaints]);

  // Handle selectable mode (click to set location)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (!selectable) {
      if (selectMarkerRef.current) {
        selectMarkerRef.current.remove();
        selectMarkerRef.current = null;
      }
      return;
    }

    const handleClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      if (onLocationSelect) onLocationSelect(lat, lng);

      if (selectMarkerRef.current) {
        selectMarkerRef.current.setLatLng([lat, lng]);
      } else {
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="width: 24px; height: 24px; background: #2563eb; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 8px rgba(37,99,235,0.5);"></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });
        selectMarkerRef.current = L.marker([lat, lng], { icon, draggable: true }).addTo(map);
        selectMarkerRef.current.on('dragend', (ev) => {
          const m = ev.target as L.Marker;
          const ll = m.getLatLng();
          if (onLocationSelect) onLocationSelect(ll.lat, ll.lng);
        });
      }
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectable, onLocationSelect]);

  // Create/update selected location marker when GPS or the parent sets a location.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectable || !selectedLocation) return;
    if (selectMarkerRef.current) {
      selectMarkerRef.current.setLatLng([selectedLocation.lat, selectedLocation.lng]);
    } else {
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="width: 28px; height: 28px; background: #3b82f6; border: 4px solid white; border-radius: 50%; box-shadow: 0 2px 10px rgba(37,99,235,0.55);"></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      selectMarkerRef.current = L.marker([selectedLocation.lat, selectedLocation.lng], { icon, draggable: true }).addTo(map);
      selectMarkerRef.current.on('dragend', (ev) => {
        const marker = ev.target as L.Marker;
        const ll = marker.getLatLng();
        onLocationSelect?.(ll.lat, ll.lng);
      });
    }
    map.setView([selectedLocation.lat, selectedLocation.lng], Math.max(map.getZoom(), 15));
  }, [selectedLocation, selectable, onLocationSelect]);

  return <div ref={containerRef} style={{ height, width: '100%', borderRadius: '1rem', overflow: 'hidden' }} />;
}
