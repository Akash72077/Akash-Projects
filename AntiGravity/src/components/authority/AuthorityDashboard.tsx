import React, { useState } from 'react';
import { useCivic } from '../../store/CivicContext';
import { 
  Building2, 
  Clock, 
  Flame, 
  Send
} from 'lucide-react';

export const AuthorityDashboard: React.FC = () => {
  const { 
    complaints, 
    escalateComplaint,
    setActiveComplaintForModal,
    showToast
  } = useCivic();

  const [broadcastTitle, setBroadcastTitle] = useState<string>('');
  const [broadcastMessage, setBroadcastMessage] = useState<string>('');
  const [broadcastWard, setBroadcastWard] = useState<string>('Ward 104 - Kondapur / Madhapur');
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState<boolean>(false);

  const totalComplaints = complaints.length;
  const criticalCount = complaints.filter(c => c.priority === 'CRITICAL' && c.status !== 'CLOSED').length;
  const escalatedCount = complaints.filter(c => c.isEscalated).length;
  const resolvedCount = complaints.filter(c => c.status === 'CLOSED' || c.status === 'RESOLVED_PENDING_CITIZEN_CONFIRMATION').length;
  const warrantyLinkedCount = complaints.filter(c => c.isUnderWarranty).length;

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;
    showToast('Civic Alert Broadcasted', `Advisory published to public feed for ${broadcastWard}.`, 'success');
    setIsBroadcastModalOpen(false);
    setBroadcastTitle('');
    setBroadcastMessage('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Officer Header with Broadcast CTA */}
      <div className="glass-card" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(17, 24, 39, 0.8) 100%)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}>
            <Building2 size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Municipal Authority Control Desk</h2>
              <span className="badge badge-medium" style={{ fontSize: '0.7rem' }}>GHMC / Zonal Portal</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Executive Engineering & Automated SLA Escalation Management
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsBroadcastModalOpen(true)}
          className="btn btn-primary"
          style={{ fontWeight: 700 }}
        >
          <Send size={16} />
          <span>Broadcast Public Civic Advisory</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        <div className="glass-card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Active Grievances</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.2rem', color: '#fff' }}>
            {totalComplaints}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-blue)', marginTop: '0.25rem' }}>
            {complaints.reduce((acc, curr) => acc + curr.reportCount, 0)} Total Citizen Signatures
          </div>
        </div>

        <div className="glass-card" style={{ borderColor: criticalCount > 0 ? 'rgba(239, 68, 68, 0.4)' : undefined }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Critical & Escalated Tickets</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.2rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Flame size={24} />
            <span>{criticalCount + escalatedCount}</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#F87171', marginTop: '0.25rem' }}>
            Requires immediate executive intervention
          </div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>DLP Warranty Active Assets</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.2rem', color: '#10B981' }}>
            {warrantyLinkedCount}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#34D399', marginTop: '0.25rem' }}>
            100% Contractor Liability (Zero Municipal Cost)
          </div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Resolution Rate</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.2rem', color: '#3B82F6' }}>
            {Math.round((resolvedCount / Math.max(1, totalComplaints)) * 100)}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Avg Redressal Time: 28.4 Hours
          </div>
        </div>
      </div>

      {/* SLA Escalation Live Queue Table */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={18} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Active Grievance Redressal SLA Monitor</h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-refreshes every 15s</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Ticket #</th>
                <th style={{ padding: '0.75rem 1rem' }}>Issue & Ward</th>
                <th style={{ padding: '0.75rem 1rem' }}>Assigned Contractor / Dept</th>
                <th style={{ padding: '0.75rem 1rem' }}>SLA Deadline</th>
                <th style={{ padding: '0.75rem 1rem' }}>Progress</th>
                <th style={{ padding: '0.75rem 1rem' }}>Escalation</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((c) => {
                const isOverdue = new Date() > new Date(c.slaDeadline);

                return (
                  <tr key={c.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                      {c.ticketNumber}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{c.ward}</div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ color: 'var(--accent-blue)', fontWeight: 500 }}>{c.contractorName || c.departmentName}</div>
                      {c.isUnderWarranty && (
                        <span className="badge badge-low" style={{ fontSize: '0.65rem', marginTop: '2px' }}>
                          DLP Warranty
                        </span>
                      )}
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ color: isOverdue ? '#EF4444' : 'var(--text-primary)', fontWeight: isOverdue ? 700 : 500 }}>
                        {isOverdue ? '⚠️ SLA BREACHED' : new Date(c.slaDeadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        Target: {c.slaHours} Hours
                      </div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '60px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${c.progressPercentage}%`, height: '100%', background: '#3B82F6' }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{c.progressPercentage}%</span>
                      </div>
                    </td>

                    <td style={{ padding: '0.75rem 1rem' }}>
                      {c.isEscalated ? (
                        <span className="badge badge-critical">Level {c.escalationLevel}</span>
                      ) : (
                        <span className="badge badge-low">Within SLA</span>
                      )}
                    </td>

                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                        <button
                          onClick={() => setActiveComplaintForModal(c)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                        >
                          Audit
                        </button>

                        {!c.isEscalated && (
                          <button
                            onClick={() => escalateComplaint(c.id, 'Officer manual emergency escalation')}
                            className="btn btn-danger btn-sm"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                          >
                            Escalate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broadcast Public Advisory Modal */}
      {isBroadcastModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.1rem' }}>Broadcast Civic Advisory</h3>
              <button onClick={() => setIsBroadcastModalOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
            </div>
            <form onSubmit={handleBroadcastSubmit} style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Target Ward</label>
                <select
                  value={broadcastWard}
                  onChange={(e) => setBroadcastWard(e.target.value)}
                  style={{ width: '100%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.5rem', color: '#fff' }}
                >
                  <option value="Ward 104 - Kondapur / Madhapur">Ward 104 - Kondapur / Madhapur</option>
                  <option value="Ward 98 - Jubilee Hills">Ward 98 - Jubilee Hills</option>
                  <option value="Ward 142 - Secunderabad Cantt">Ward 142 - Secunderabad Cantt</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Alert Title</label>
                <input
                  type="text"
                  placeholder="e.g. ⚠️ Precaution: Water Trunk Pipeline Repair Underway"
                  value={broadcastTitle}
                  onChange={(e) => setBroadcastTitle(e.target.value)}
                  required
                  style={{ width: '100%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.5rem', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Public Advisory Message</label>
                <textarea
                  rows={3}
                  placeholder="Explain the scheduled maintenance, affected routes, or safety precautions for citizens..."
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  required
                  style={{ width: '100%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.5rem', color: '#fff' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                Publish Broadcast Alert
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
