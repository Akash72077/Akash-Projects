import React, { useState } from 'react';
import { useCivic } from '../../store/CivicContext';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { 
  Users, 
  Building2
} from 'lucide-react';
import type { Complaint } from '../../types';

// Custom SVG Markers Generator
const createColoredPinIcon = (color: string, pulse: boolean = false) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="42" viewBox="0 0 34 42" fill="none">
      <filter id="shadow" x="0" y="0" width="34" height="42" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="3" stdDeviation="2" flood-color="rgba(0,0,0,0.5)"/>
      </filter>
      <path d="M17 0C7.61116 0 0 7.61116 0 17C0 27.5 17 42 17 42C17 42 34 27.5 34 17C34 7.61116 26.3888 0 17 0Z" fill="${color}" filter="url(#shadow)"/>
      <circle cx="17" cy="16" r="7" fill="#ffffff"/>
      <circle cx="17" cy="16" r="4" fill="${color}"/>
    </svg>
  `;

  return L.divIcon({
    className: pulse ? 'leaflet-pulsing-marker' : 'leaflet-custom-marker',
    html: svg,
    iconSize: [34, 42],
    iconAnchor: [17, 42],
    popupAnchor: [0, -40],
  });
};

const MARKER_ICONS = {
  CRITICAL: createColoredPinIcon('#EF4444', true),
  IN_PROGRESS: createColoredPinIcon('#F59E0B', false),
  RESOLVED: createColoredPinIcon('#10B981', false),
  ASSIGNED: createColoredPinIcon('#3B82F6', false),
};

export const CivicMapView: React.FC = () => {
  const { 
    complaints, 
    selectedWard, 
    setSelectedWard, 
    setActiveComplaintForModal 
  } = useCivic();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Filter complaints
  const filteredComplaints = complaints.filter((c) => {
    if (selectedWard !== 'ALL' && c.ward !== selectedWard) return false;
    if (statusFilter === 'CRITICAL' && c.priority !== 'CRITICAL') return false;
    if (statusFilter === 'IN_PROGRESS' && c.status !== 'WORK_IN_PROGRESS') return false;
    if (statusFilter === 'RESOLVED' && c.status !== 'CLOSED' && c.status !== 'RESOLVED_PENDING_CITIZEN_CONFIRMATION') return false;
    if (statusFilter === 'WARRANTY' && !c.isUnderWarranty) return false;
    return true;
  });

  const getMarkerIcon = (c: Complaint) => {
    if (c.priority === 'CRITICAL' || c.isEscalated) return MARKER_ICONS.CRITICAL;
    if (c.status === 'CLOSED' || c.status === 'RESOLVED_PENDING_CITIZEN_CONFIRMATION') return MARKER_ICONS.RESOLVED;
    if (c.status === 'WORK_IN_PROGRESS') return MARKER_ICONS.IN_PROGRESS;
    return MARKER_ICONS.ASSIGNED;
  };

  const wards = Array.from(new Set(complaints.map(c => c.ward)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: 'calc(100vh - 140px)' }}>
      {/* Map Control Toolbar */}
      <div style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Filter Map:</span>
          
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`btn btn-sm ${statusFilter === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Active ({complaints.length})
          </button>

          <button
            onClick={() => setStatusFilter('CRITICAL')}
            className={`btn btn-sm ${statusFilter === 'CRITICAL' ? 'btn-danger' : 'btn-secondary'}`}
          >
            🔴 Critical & Escalated
          </button>

          <button
            onClick={() => setStatusFilter('IN_PROGRESS')}
            className={`btn btn-sm ${statusFilter === 'IN_PROGRESS' ? 'btn-primary' : 'btn-secondary'}`}
          >
            🟠 In Progress
          </button>

          <button
            onClick={() => setStatusFilter('RESOLVED')}
            className={`btn btn-sm ${statusFilter === 'RESOLVED' ? 'btn-success' : 'btn-secondary'}`}
          >
            🟢 Resolved
          </button>

          <button
            onClick={() => setStatusFilter('WARRANTY')}
            className={`btn btn-sm ${statusFilter === 'WARRANTY' ? 'btn-primary' : 'btn-secondary'}`}
          >
            🛡️ Under DLP Warranty
          </button>
        </div>

        {/* Ward Filter Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Building2 size={15} color="var(--text-secondary)" />
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.35rem 0.6rem',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              outline: 'none',
            }}
          >
            <option value="ALL">All Municipal Wards</option>
            {wards.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Leaflet Map Viewport */}
      <div style={{
        flex: 1,
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        border: '1px solid var(--border-medium)',
        position: 'relative',
      }}>
        <MapContainer
          center={[17.4485, 78.3842]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* High Density Hotspot Rings */}
          <Circle
            center={[17.4623, 78.3562]}
            radius={600}
            pathOptions={{
              color: '#3B82F6',
              fillColor: '#3B82F6',
              fillOpacity: 0.12,
              weight: 1,
            }}
          />

          <Circle
            center={[17.4321, 78.4112]}
            radius={500}
            pathOptions={{
              color: '#EF4444',
              fillColor: '#EF4444',
              fillOpacity: 0.15,
              weight: 1,
            }}
          />

          {/* Markers */}
          {filteredComplaints.map((complaint) => (
            <Marker
              key={complaint.id}
              position={[complaint.latitude, complaint.longitude]}
              icon={getMarkerIcon(complaint)}
            >
              <Popup>
                <div style={{ width: '260px', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ height: '110px', borderRadius: '6px', overflow: 'hidden' }}>
                    <img
                      src={complaint.initialImageUrl}
                      alt={complaint.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>{complaint.ticketNumber}</span>
                      <span className={`badge badge-${complaint.priority.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>
                        {complaint.priority}
                      </span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#111827' }}>
                      {complaint.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#4B5563', marginTop: '0.15rem' }}>
                      📍 {complaint.address}
                    </div>
                  </div>

                  {/* Progress & Reports */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#1F2937' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 600 }}>
                      <Users size={12} /> {complaint.reportCount} Reports
                    </span>
                    <span>Progress: {complaint.progressPercentage}%</span>
                  </div>

                  <button
                    onClick={() => setActiveComplaintForModal(complaint)}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', fontSize: '0.75rem', padding: '0.35rem' }}
                  >
                    View Audit Trail & Evidence
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Legend */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          zIndex: 400,
          background: 'rgba(17, 24, 39, 0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '0.6rem 0.85rem',
          fontSize: '0.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
        }}>
          <div style={{ fontWeight: 700, marginBottom: '0.15rem', color: 'var(--text-primary)' }}>
            Map Legend
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#F87171' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
            <span>Critical / Escalated</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#FBBF24' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />
            <span>Work in Progress</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34D399' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />
            <span>Citizen Verified / Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
