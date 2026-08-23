import { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { HotspotPrediction } from '@/types';

interface Props {
  hotspots: HotspotPrediction[];
  selectedId?: string | null;
  onSelect: (hotspot: HotspotPrediction) => void;
}

const colors = {
  critical: '#ff3d8d',
  high: '#f97316',
  moderate: '#f59e0b',
  low: '#22d3ee',
};

export default function HotspotMap({ hotspots, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, { center: [17.45, 78.42], zoom: 11, zoomControl: true, scrollWheelZoom: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);
    mapRef.current = map;
    setTimeout(() => map.invalidateSize(), 100);
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    layersRef.current.forEach((layer) => layer.remove());
    layersRef.current = [];

    hotspots.forEach((hotspot) => {
      const color = colors[hotspot.risk_level];
      const selected = hotspot.id === selectedId;
      const radius = Math.max(350, Math.min(1500, hotspot.radius_meters + hotspot.total_complaints * 42));
      const circle = L.circle([hotspot.center.latitude, hotspot.center.longitude], {
        radius,
        color,
        weight: selected ? 4 : 2,
        fillColor: color,
        fillOpacity: selected ? 0.25 : 0.13,
        opacity: selected ? 1 : 0.76,
      }).addTo(map);

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<button aria-label="${hotspot.area} hotspot" style="width:${selected ? 54 : 46}px;height:${selected ? 54 : 46}px;border-radius:999px;border:${selected ? 4 : 3}px solid white;background:${color};color:white;box-shadow:0 0 0 6px ${color}22,0 0 30px ${color}88;display:grid;place-items:center;font-size:${selected ? 13 : 12}px;font-weight:900;cursor:pointer;">${hotspot.risk_score}</button>`,
        iconSize: [selected ? 54 : 46, selected ? 54 : 46],
        iconAnchor: [selected ? 27 : 23, selected ? 27 : 23],
      });
      const marker = L.marker([hotspot.center.latitude, hotspot.center.longitude], { icon }).addTo(map);
      marker.bindPopup(`<div style="min-width:220px"><div style="font-weight:900;font-size:14px">${hotspot.area}</div><div style="margin-top:4px;font-size:12px;color:#64748b">${hotspot.risk_level.toUpperCase()} RISK · ${hotspot.risk_score}%</div><div style="margin-top:7px;font-size:12px">${hotspot.open_complaints} open · ${hotspot.duplicate_count || 0} duplicate reports · ${hotspot.needs_attention.overdue} overdue</div><div style="margin-top:7px;font-size:11px;color:#7c3aed;font-weight:800">Click hotspot to open full area details →</div></div>`);
      marker.on('click', () => onSelect(hotspot));
      circle.on('click', () => onSelect(hotspot));
      layersRef.current.push(circle, marker);

      // Plot every complaint as a small point so authorities can see real density.
      hotspot.complaints.forEach((complaint) => {
        if (complaint.latitude == null || complaint.longitude == null) return;
        const isDuplicate = Boolean(complaint.duplicate_of);
        const pointColor = isDuplicate ? '#a855f7' : complaint.status === 'resolved' ? '#22c55e' : '#64748b';
        const point = L.circleMarker([complaint.latitude, complaint.longitude], {
          radius: isDuplicate ? 6 : 4,
          color: '#ffffff',
          weight: isDuplicate ? 2 : 1,
          fillColor: pointColor,
          fillOpacity: isDuplicate ? 0.95 : 0.72,
        }).addTo(map);
        const duplicateLine = isDuplicate
          ? `<div style="margin-top:5px;color:#7c3aed;font-size:11px;font-weight:800">Possible duplicate of ${complaint.duplicate_of}</div>`
          : '';
        point.bindPopup(`<div style="min-width:210px"><div style="font-size:10px;color:#94a3b8;font-weight:700">${complaint.id}</div><div style="margin-top:2px;font-size:12px;font-weight:900">${complaint.title}</div><div style="margin-top:5px;font-size:11px;color:#64748b">${complaint.status.replace(/_/g,' ')} · ${complaint.pending_days} days pending</div>${duplicateLine}</div>`);
        layersRef.current.push(point);
      });
    });

    if (hotspots.length) {
      const bounds = L.latLngBounds(hotspots.map((h) => [h.center.latitude, h.center.longitude] as [number, number]));
      if (hotspots.length === 1) map.setView(bounds.getCenter(), 14);
      else map.fitBounds(bounds, { padding: [42, 42] });
    }
  }, [hotspots, selectedId, onSelect]);

  return <div ref={containerRef} className="h-[540px] w-full overflow-hidden rounded-2xl lg:h-[660px]" />;
}
