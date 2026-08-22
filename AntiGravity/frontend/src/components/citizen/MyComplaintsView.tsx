import React from 'react';
import { useCivic } from '../../store/CivicContext';
import { 
  UserCheck, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight,
  Award
} from 'lucide-react';

export const MyComplaintsView: React.FC = () => {
  const { 
    complaints, 
    currentUser, 
    setActiveComplaintForModal, 
    submitCitizenVerification,
    setIsComplaintWizardOpen
  } = useCivic();

  // Filter complaints where user is reporter or upvoter
  const myComplaints = complaints.filter(c => c.hasUserUpvoted || c.citizenId === currentUser.id || c.timeline.some(t => t.actorName === currentUser.name));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Citizen Profile & Reputation Stats Banner */}
      <div className="glass-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(17, 24, 39, 0.8) 100%)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            fontWeight: 800,
            color: '#fff',
          }}>
            {currentUser.name[0]}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{currentUser.name}</h2>
              <span className="badge badge-low" style={{ fontSize: '0.7rem' }}>Verified Citizen</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Ward Jurisdiction: {currentUser.ward || 'Ward 104 - Kondapur / Madhapur'}
            </p>
          </div>
        </div>

        {/* Reputation Score Metric */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '0.6rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Reputation Score</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
              <Award size={18} />
              <span>{currentUser.reputationScore}</span>
            </div>
          </div>

          <div style={{ width: '1px', height: '30px', background: 'var(--border-subtle)' }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Active Grievances</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#3B82F6' }}>
              {myComplaints.length}
            </div>
          </div>
        </div>
      </div>

      {/* List of Citizen's Grievances */}
      {myComplaints.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <UserCheck size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>No Active Grievances Reported</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.25rem' }}>
            Help improve your neighborhood by capturing real-time evidence of road potholes, drainage leaks, or garbage accumulation.
          </p>
          <button
            onClick={() => setIsComplaintWizardOpen(true)}
            className="btn btn-primary"
          >
            📸 Report Your First Civic Issue
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Tracked Civic Grievances ({myComplaints.length})
          </h3>

          {myComplaints.map((complaint) => {
            const isPendingVerification = complaint.status === 'RESOLVED_PENDING_CITIZEN_CONFIRMATION';

            return (
              <div
                key={complaint.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  borderColor: isPendingVerification ? 'rgba(16, 185, 129, 0.5)' : undefined,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <img
                      src={complaint.initialImageUrl}
                      alt={complaint.title}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: 'var(--radius-md)',
                        objectFit: 'cover',
                      }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span className="badge badge-info">{complaint.ticketNumber}</span>
                        <span className={`badge badge-${complaint.priority.toLowerCase()}`}>
                          {complaint.priority} Priority
                        </span>
                        {complaint.isUnderWarranty && (
                          <span className="badge badge-low" style={{ fontSize: '0.65rem' }}>
                            DLP Warranty
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{complaint.title}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        <MapPin size={13} color="var(--accent-blue)" />
                        <span>{complaint.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress & Target SLA */}
                  <div style={{ textAlign: 'right', minWidth: '160px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Progress Status:</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: complaint.progressPercentage === 100 ? '#34D399' : 'var(--accent-blue)' }}>
                      {complaint.progressPercentage}% Resolved
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      SLA: {complaint.slaHours}h target
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${complaint.progressPercentage}%` }} />
                </div>

                {/* Citizen Verification Prompt (If 100% complete) */}
                {isPendingVerification && (
                  <div style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}>
                    <div>
                      <strong style={{ color: '#34D399', fontSize: '0.85rem' }}>Contractor Submitted 100% Completion Proof:</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Please verify if this issue was fixed satisfactorily in real life.
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => submitCitizenVerification(complaint.id, 'FIXED')}
                        className="btn btn-success btn-sm"
                        style={{ fontWeight: 700 }}
                      >
                        <CheckCircle2 size={14} />
                        <span>Confirm Fixed (+15 Pts)</span>
                      </button>

                      <button
                        onClick={() => submitCitizenVerification(complaint.id, 'NOT_FIXED', 'Citizen verified defect still present')}
                        className="btn btn-danger btn-sm"
                      >
                        <AlertTriangle size={14} />
                        <span>Not Fixed</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Card Action */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setActiveComplaintForModal(complaint)}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>View Complete Audit Trail & Tripartite Photos</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
