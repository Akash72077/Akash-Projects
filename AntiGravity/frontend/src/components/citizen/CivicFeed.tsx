import React from 'react';
import { useCivic } from '../../store/CivicContext';
import { 
  Users, 
  ThumbsUp, 
  MapPin, 
  Building2, 
  AlertTriangle, 
  ArrowRight,
  Search,
  Camera
} from 'lucide-react';
import type { ComplaintCategory } from '../../types';
import { CATEGORY_DEPARTMENT_MAP } from '../../utils/aiSimulator';

export const CivicFeed: React.FC = () => {
  const { 
    complaints, 
    alerts, 
    selectedWard, 
    setSelectedWard,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    searchQuery,
    setSearchQuery,
    upvoteComplaint,
    setActiveComplaintForModal 
  } = useCivic();

  // Filter complaints
  const filtered = complaints.filter((c) => {
    if (selectedWard !== 'ALL' && c.ward !== selectedWard) return false;
    if (selectedCategory !== 'ALL' && c.category !== selectedCategory) return false;
    if (selectedStatus !== 'ALL' && c.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.ticketNumber.toLowerCase().includes(q) ||
        c.ward.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const wards = Array.from(new Set(complaints.map(c => c.ward)));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Official Civic Awareness Broadcast Alerts */}
      {alerts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                background: alert.type === 'CRITICAL' 
                  ? 'linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(17, 24, 39, 0.8) 100%)'
                  : 'linear-gradient(90deg, rgba(245, 158, 11, 0.15) 0%, rgba(17, 24, 39, 0.8) 100%)',
                border: `1px solid ${alert.type === 'CRITICAL' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '1rem 1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
              }}
            >
              <div style={{ marginTop: '2px' }}>
                <AlertTriangle size={20} color={alert.type === 'CRITICAL' ? '#EF4444' : '#F59E0B'} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: alert.type === 'CRITICAL' ? '#FFA4A4' : '#FDE68A' }}>
                    {alert.title}
                  </h4>
                  <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>
                    {alert.ward}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  {alert.message}
                </p>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                  Broadcasted by: <strong>{alert.issuedBy}</strong> • {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Feed Filters & Search Bar */}
      <div style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '1rem 1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
      }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{
            flex: '1 1 280px',
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.45rem 0.75rem',
            gap: '0.5rem',
          }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search grievances by ticket #, street, landmark, or ward..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                width: '100%',
                outline: 'none',
                fontSize: '0.85rem',
              }}
            />
          </div>

          {/* Ward Selector */}
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem 0.75rem',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value="ALL">All Municipal Wards</option>
            {wards.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>

          {/* Category Selector */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem 0.75rem',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none',
            }}
          >
            <option value="ALL">All Categories</option>
            {(Object.keys(CATEGORY_DEPARTMENT_MAP) as ComplaintCategory[]).map((cat) => (
              <option key={cat} value={cat}>{CATEGORY_DEPARTMENT_MAP[cat].displayName}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Grievance Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '1.25rem',
      }}>
        {filtered.map((complaint) => {
          const isCritical = complaint.priority === 'CRITICAL' || complaint.isEscalated;

          return (
            <div
              key={complaint.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '0',
                overflow: 'hidden',
                borderColor: isCritical ? 'rgba(239, 68, 68, 0.35)' : undefined,
              }}
            >
              {/* Card Header & Thumbnail */}
              <div style={{ position: 'relative', height: '190px' }}>
                <img
                  src={complaint.initialImageUrl}
                  alt={complaint.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Top Badges */}
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
                  right: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span className="badge badge-info" style={{ fontFamily: 'var(--font-mono)' }}>
                    {complaint.ticketNumber}
                  </span>

                  <span className={`badge badge-${complaint.priority.toLowerCase()}`}>
                    {complaint.priority} Priority
                  </span>
                </div>

                {/* Bottom Photo Overlay */}
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  background: 'rgba(0, 0, 0, 0.75)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.2rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.7rem',
                  color: '#34D399',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}>
                  <Camera size={12} />
                  <span>Camera Verified</span>
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                    {complaint.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={13} color="var(--accent-blue)" />
                    <span>{complaint.address}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                    {complaint.ward}
                  </div>
                </div>

                {/* Repair Progress Bar */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Repair Status:</span>
                    <span style={{ fontWeight: 700, color: complaint.progressPercentage === 100 ? '#34D399' : 'var(--accent-blue)' }}>
                      {complaint.status === 'RESOLVED_PENDING_CITIZEN_CONFIRMATION' ? 'Awaiting Citizen Sign-off' : `${complaint.progressPercentage}% Resolved`}
                    </span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${complaint.progressPercentage}%` }} />
                  </div>
                </div>

                {/* Contractor & Warranty Tag */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Building2 size={14} color="var(--accent-blue)" />
                    <span>{complaint.contractorName || 'Municipal In-House'}</span>
                  </div>
                  {complaint.isUnderWarranty && (
                    <span className="badge badge-low" style={{ fontSize: '0.65rem' }}>
                      3-Yr DLP Warranty
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer CTAs */}
              <div style={{
                padding: '0.85rem 1.15rem',
                borderTop: '1px solid var(--border-subtle)',
                background: 'rgba(0, 0, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <button
                  onClick={() => upvoteComplaint(complaint.id)}
                  className="btn btn-secondary btn-sm"
                  style={{
                    color: complaint.hasUserUpvoted ? 'var(--accent-blue)' : 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    padding: '0.35rem 0.65rem',
                  }}
                >
                  <ThumbsUp size={13} />
                  <span>{complaint.upvotesCount} Upvotes</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Users size={12} /> {complaint.reportCount} Reports
                  </span>

                  <button
                    onClick={() => setActiveComplaintForModal(complaint)}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                  >
                    <span>Audit Trail</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
