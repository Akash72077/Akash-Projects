import React from 'react';
import type { Complaint } from '../../types';
import { Users, AlertTriangle, CheckCircle2, ArrowRight, X } from 'lucide-react';
import { calculateHaversineDistance } from '../../utils/geo';

interface DuplicateAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  duplicates: Complaint[];
  userLat: number;
  userLng: number;
  onCluster: (masterComplaintId: string) => void;
  onProceedSeparate: () => void;
}

export const DuplicateAlertModal: React.FC<DuplicateAlertModalProps> = ({
  isOpen,
  onClose,
  duplicates,
  userLat,
  userLng,
  onCluster,
  onProceedSeparate,
}) => {
  if (!isOpen || duplicates.length === 0) return null;

  const topMatch = duplicates[0];
  const distanceMeters = calculateHaversineDistance(userLat, userLng, topMatch.latitude, topMatch.longitude);

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }} onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'rgba(245, 158, 11, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <AlertTriangle size={20} color="#F59E0B" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#FBBF24' }}>
                Potential Duplicate Issue Detected
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Geospatial proximity match: ~{distanceMeters}m away from your location
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            <strong>{topMatch.reportCount} citizens</strong> have already reported an identical issue at this exact location. Joining the existing ticket boosts its civic urgency score without overwhelming municipal crews with duplicate work orders.
          </p>

          {/* Matched Complaint Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            gap: '1rem',
            padding: '0.85rem',
          }}>
            <img
              src={topMatch.initialImageUrl}
              alt="Existing report"
              style={{
                width: '90px',
                height: '90px',
                borderRadius: 'var(--radius-md)',
                objectFit: 'cover',
              }}
            />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span className="badge badge-info">{topMatch.ticketNumber}</span>
                  <span className="badge badge-medium">{topMatch.status.replace(/_/g, ' ')}</span>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{topMatch.title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  📍 {topMatch.address}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--accent-blue)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Users size={13} />
                  <strong>{topMatch.reportCount} Citizens Reporting</strong>
                </span>
                <span>• Progress: {topMatch.progressPercentage}%</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => onCluster(topMatch.id)}
              className="btn btn-success"
              style={{
                padding: '0.75rem',
                fontWeight: 700,
                fontSize: '0.95rem',
              }}
            >
              <CheckCircle2 size={18} />
              <span>Upvote & Join Existing Ticket (+1 Citizen Count)</span>
            </button>

            <button
              onClick={onProceedSeparate}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem' }}
            >
              <span>This is a different problem — Create Separate Ticket</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
