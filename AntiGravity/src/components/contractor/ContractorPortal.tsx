import React, { useState } from 'react';
import { useCivic } from '../../store/CivicContext';
import { 
  Wrench, 
  ShieldCheck, 
  UploadCloud,
  FileCheck
} from 'lucide-react';
import type { Complaint } from '../../types';

export const ContractorPortal: React.FC = () => {
  const { 
    complaints, 
    updateContractorProgress, 
    setActiveComplaintForModal 
  } = useCivic();

  const [activeEditingComplaint, setActiveEditingComplaint] = useState<Complaint | null>(null);
  const [newProgressPercent, setNewProgressPercent] = useState<number>(50);
  const [progressNotes, setProgressNotes] = useState<string>('');
  const [progressPhotoUrl, setProgressPhotoUrl] = useState<string>('');

  // Contractor assigned work orders (matching contractorId or all active for demo)
  const workOrders = complaints.filter(c => c.status !== 'CLOSED' && c.status !== 'REJECTED');

  const handleOpenUpdateModal = (complaint: Complaint) => {
    setActiveEditingComplaint(complaint);
    setNewProgressPercent(complaint.progressPercentage || 50);
    setProgressNotes('');
    setProgressPhotoUrl(
      complaint.category === 'POTHOLE' 
        ? 'https://images.unsplash.com/photo-1584463699039-44e2b027d14d?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=800&q=80'
    );
  };

  const handleSubmitProgressUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEditingComplaint) return;

    updateContractorProgress(
      activeEditingComplaint.id,
      newProgressPercent,
      progressPhotoUrl,
      progressNotes
    );

    setActiveEditingComplaint(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Contractor Company Profile Header */}
      <div className="glass-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(17, 24, 39, 0.8) 100%)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}>
            <Wrench size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Deccan Infra & Roadworks Pvt Ltd</h2>
              <span className="badge badge-low" style={{ fontSize: '0.7rem' }}>Authorized Municipal Contractor</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Contractor ID: CONT-HYD-8821 • Defect Liability Period (DLP) Remediation Portal
            </p>
          </div>
        </div>

        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '1.25rem',
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Quality Rating</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34D399' }}>4.8 / 5.0 ⭐</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>On-Time SLA</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#06B6D4' }}>96.2%</div>
          </div>
        </div>
      </div>

      {/* Active Work Orders Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          Active Defect Liability Work Orders ({workOrders.length})
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '1.25rem',
        }}>
          {workOrders.map((complaint) => {
            const isCompleted = complaint.progressPercentage === 100;

            return (
              <div
                key={complaint.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.85rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span className="badge badge-info">{complaint.ticketNumber}</span>
                    <span className={`badge badge-${complaint.priority.toLowerCase()}`}>
                      {complaint.priority} Priority
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{complaint.title}</h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    📍 {complaint.address}
                  </p>

                  {complaint.isUnderWarranty && (
                    <div style={{
                      marginTop: '0.6rem',
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      padding: '0.4rem 0.6rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.72rem',
                      color: '#34D399',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}>
                      <ShieldCheck size={14} />
                      <span>DLP Warranty Coverage: Valid until {complaint.warrantyExpiry || '2027'}</span>
                    </div>
                  )}
                </div>

                {/* Progress Bar */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Current Progress:</span>
                    <span style={{ fontWeight: 700, color: isCompleted ? '#34D399' : 'var(--accent-blue)' }}>
                      {complaint.progressPercentage}%
                    </span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${complaint.progressPercentage}%` }} />
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button
                    onClick={() => handleOpenUpdateModal(complaint)}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1, fontWeight: 700 }}
                  >
                    <UploadCloud size={14} />
                    <span>Update Progress & Upload Proof</span>
                  </button>

                  <button
                    onClick={() => setActiveComplaintForModal(complaint)}
                    className="btn btn-secondary btn-sm"
                  >
                    Audit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress & Resolution Photo Upload Modal */}
      {activeEditingComplaint && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '580px' }}>
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Update Work Order Progress</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  {activeEditingComplaint.ticketNumber} • {activeEditingComplaint.title}
                </p>
              </div>
              <button
                onClick={() => setActiveEditingComplaint(null)}
                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitProgressUpdate} style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Progress Slider / Quick Buttons */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  Select Repair Completion Percentage: <strong>{newProgressPercent}%</strong>
                </label>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setNewProgressPercent(pct)}
                      className={`btn btn-sm ${newProgressPercent === pct ? 'btn-primary' : 'btn-secondary'}`}
                      style={{ flex: 1, fontWeight: 700 }}
                    >
                      {pct}% {pct === 100 ? '(Resolved)' : ''}
                    </button>
                  ))}
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={newProgressPercent}
                  onChange={(e) => setNewProgressPercent(Number(e.target.value))}
                  style={{ width: '100%', cursor: 'pointer' }}
                />
              </div>

              {/* Progress Proof Photo Preview */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                  Contractor Photographic Proof of Work:
                </label>
                <div style={{
                  height: '160px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-medium)',
                  position: 'relative',
                }}>
                  <img
                    src={progressPhotoUrl}
                    alt="Progress proof"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '6px',
                    left: '6px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    color: '#34D399',
                  }}>
                    ● GPS-Timestamp Authenticated Contractor Snapshot
                  </div>
                </div>
              </div>

              {/* Field Engineer Notes */}
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                  Work Report & Material Notes:
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Excavated 40mm pothole crater, applied bitumen emulsion and hot-mix asphalt compaction..."
                  value={progressNotes}
                  onChange={(e) => setProgressNotes(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.5rem',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.85rem',
                  }}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className={`btn ${newProgressPercent === 100 ? 'btn-success' : 'btn-primary'}`}
                style={{ fontWeight: 700, padding: '0.75rem' }}
              >
                <FileCheck size={18} />
                <span>
                  {newProgressPercent === 100
                    ? 'Submit 100% Resolution for Citizen Verification'
                    : `Submit ${newProgressPercent}% Progress Update`}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
