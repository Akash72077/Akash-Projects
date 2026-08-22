import React, { useState } from 'react';
import { useCivic } from '../../store/CivicContext';
import { 
  X, 
  MapPin, 
  Wrench, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  ThumbsUp, 
  Award,
  Flame
} from 'lucide-react';

export const ComplaintDetailModal: React.FC = () => {
  const { 
    activeComplaintForModal, 
    setActiveComplaintForModal, 
    currentUser, 
    upvoteComplaint, 
    submitCitizenVerification,
    escalateComplaint
  } = useCivic();

  const [disputeComment, setDisputeComment] = useState<string>('');
  const [showDisputeForm, setShowDisputeForm] = useState<boolean>(false);

  if (!activeComplaintForModal) return null;

  const complaint = activeComplaintForModal;
  const isPendingCitizenConfirm = complaint.status === 'RESOLVED_PENDING_CITIZEN_CONFIRMATION';

  const handleVerify = (feedback: 'FIXED' | 'PARTIALLY_FIXED' | 'NOT_FIXED') => {
    submitCitizenVerification(complaint.id, feedback, disputeComment);
    setActiveComplaintForModal(null);
  };

  const getStatusBadge = () => {
    switch (complaint.status) {
      case 'CLOSED':
        return <span className="badge badge-low">Closed & Verified</span>;
      case 'RESOLVED_PENDING_CITIZEN_CONFIRMATION':
        return <span className="badge badge-purple">Pending Citizen Confirmation</span>;
      case 'WORK_IN_PROGRESS':
        return <span className="badge badge-info">Work In Progress ({complaint.progressPercentage}%)</span>;
      case 'ESCALATED':
        return <span className="badge badge-critical">Level {complaint.escalationLevel} Escalated</span>;
      case 'REOPENED':
        return <span className="badge badge-critical">Disputed & Reopened</span>;
      case 'CONTRACTOR_NOTIFIED':
        return <span className="badge badge-medium">Contractor Notified</span>;
      default:
        return <span className="badge badge-info">{complaint.status.replace(/_/g, ' ')}</span>;
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1050 }}>
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        {/* Modal Top Bar */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="badge badge-info" style={{ fontFamily: 'var(--font-mono)' }}>
              {complaint.ticketNumber}
            </span>
            {getStatusBadge()}
            {complaint.isEscalated && (
              <span className="badge badge-critical" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Flame size={12} />
                <span>SLA Escalation</span>
              </span>
            )}
          </div>
          <button
            onClick={() => setActiveComplaintForModal(null)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Title & Location Summary */}
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              {complaint.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={14} color="var(--accent-blue)" />
                {complaint.address}
              </span>
              <span>• {complaint.ward}</span>
              <span className={`badge badge-${complaint.locationConfidence === 'HIGH' ? 'low' : 'medium'}`} style={{ fontSize: '0.65rem' }}>
                Location: {complaint.locationConfidence} ({complaint.locationMethod})
              </span>
            </div>
          </div>

          {/* Tripartite Proof of Work: Before / Progress / After */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Camera size={16} />
              <span>Tripartite Visual Proof of Work (Before / Progress / After)</span>
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.75rem',
            }}>
              {/* 1. Initial Citizen Photo */}
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-tertiary)',
              }}>
                <div style={{ height: '140px', position: 'relative' }}>
                  <img
                    src={complaint.initialImageUrl}
                    alt="Initial Defect"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    color: '#F87171',
                    fontWeight: 700,
                  }}>
                    ● INITIAL CITIZEN PROOF (0%)
                  </div>
                </div>
                <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  Captured: {new Date(complaint.captureTimestamp).toLocaleDateString()}
                </div>
              </div>

              {/* 2. Progress Photo */}
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-tertiary)',
              }}>
                <div style={{ height: '140px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {complaint.progressImageUrl ? (
                    <img
                      src={complaint.progressImageUrl}
                      alt="Work in Progress"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', padding: '0.5rem' }}>
                      <Wrench size={24} style={{ margin: '0 auto 0.25rem' }} />
                      <span>Material delivery & excavation staging in progress</span>
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    color: '#60A5FA',
                    fontWeight: 700,
                  }}>
                    ● PROGRESS PROOF ({complaint.progressPercentage}%)
                  </div>
                </div>
                <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {complaint.contractorName || 'Contractor Active'}
                </div>
              </div>

              {/* 3. Resolution Photo */}
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-tertiary)',
              }}>
                <div style={{ height: '140px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {complaint.resolvedImageUrl ? (
                    <img
                      src={complaint.resolvedImageUrl}
                      alt="Resolved"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.75rem', padding: '0.5rem' }}>
                      <CheckCircle2 size={24} style={{ margin: '0 auto 0.25rem' }} />
                      <span>Awaiting 100% completion upload</span>
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    left: '6px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                    color: '#34D399',
                    fontWeight: 700,
                  }}>
                    ● COMPLETION PROOF (100%)
                  </div>
                </div>
                <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  {complaint.status === 'CLOSED' ? 'Verified by Citizens' : 'Pending Citizen Sign-off'}
                </div>
              </div>
            </div>
          </div>

          {/* Citizen Verification Action Box (If pending citizen confirmation) */}
          {isPendingCitizenConfirm && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={20} color="#10B981" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34D399' }}>
                  Citizen Resolution Verification Required
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                The assigned contractor marked this civic issue 100% complete with completion proof. As a community member, please confirm if the repair was genuinely executed.
              </p>

              {!showDisputeForm ? (
                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                  <button
                    onClick={() => handleVerify('FIXED')}
                    className="btn btn-success"
                    style={{ fontWeight: 700 }}
                  >
                    <CheckCircle2 size={16} />
                    <span>Confirm Fixed & Close Ticket (+15 Pts)</span>
                  </button>

                  <button
                    onClick={() => setShowDisputeForm(true)}
                    className="btn btn-danger"
                    style={{ fontWeight: 600 }}
                  >
                    <AlertTriangle size={16} />
                    <span>Dispute / Not Fixed</span>
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
                  <textarea
                    rows={2}
                    placeholder="Describe why this repair is incomplete or fake..."
                    value={disputeComment}
                    onChange={(e) => setDisputeComment(e.target.value)}
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.5rem',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleVerify('NOT_FIXED')}
                      className="btn btn-danger btn-sm"
                    >
                      Submit Dispute & Reopen Escalation
                    </button>
                    <button
                      onClick={() => setShowDisputeForm(false)}
                      className="btn btn-secondary btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Defect Liability Period (DLP) & Contractor Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            fontSize: '0.82rem',
          }}>
            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Assigned Department:</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {complaint.departmentName || 'Municipal Operations'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>Contractor / Agency:</div>
              <div style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>
                {complaint.contractorName || 'In-House Municipal Crew'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>DLP Warranty Coverage:</div>
              <div style={{ fontWeight: 600, color: complaint.isUnderWarranty ? '#34D399' : 'var(--text-secondary)' }}>
                {complaint.isUnderWarranty ? `Active (Until ${complaint.warrantyExpiry})` : 'Standard Municipal Maintenance'}
              </div>
            </div>

            <div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '2px' }}>SLA Target:</div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                {complaint.slaHours}h response ({new Date(complaint.slaDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
              </div>
            </div>
          </div>

          {/* Detailed Audit Trail & Event Timeline */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Transparent Audit Log & Lifecycle Timeline
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {complaint.timeline.map((evt, idx) => (
                <div key={evt.id || idx} style={{
                  display: 'flex',
                  gap: '0.75rem',
                  position: 'relative',
                }}>
                  {/* Timeline Node Line */}
                  {idx < complaint.timeline.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      left: '11px',
                      top: '24px',
                      bottom: '-14px',
                      width: '2px',
                      background: 'rgba(255, 255, 255, 0.1)',
                    }} />
                  )}

                  <div style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: evt.actorRole === 'AI' ? '#3B82F6' : evt.actorRole === 'SYSTEM' ? '#EF4444' : evt.actorRole === 'CONTRACTOR' ? '#10B981' : 'var(--bg-tertiary)',
                    border: '2px solid var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 1,
                  }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#fff' }}>
                      {evt.actorRole[0]}
                    </span>
                  </div>

                  <div style={{
                    flex: 1,
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.6rem 0.85rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                        {evt.title}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {new Date(evt.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {evt.description}
                    </p>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Actor: <strong>{evt.actorName}</strong> ({evt.actorRole})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <button
            onClick={() => upvoteComplaint(complaint.id)}
            className="btn btn-secondary btn-sm"
            style={{ color: complaint.hasUserUpvoted ? 'var(--accent-blue)' : 'var(--text-secondary)' }}
          >
            <ThumbsUp size={14} />
            <span>{complaint.upvotesCount} Citizens Upvoted</span>
          </button>

          {currentUser.role === 'OFFICER' && !complaint.isEscalated && (
            <button
              onClick={() => escalateComplaint(complaint.id, 'Officer manual escalation for priority inspection')}
              className="btn btn-danger btn-sm"
            >
              <AlertTriangle size={14} />
              <span>Escalate to Zonal Commissioner</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
