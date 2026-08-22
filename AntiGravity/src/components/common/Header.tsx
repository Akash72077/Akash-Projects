import React from 'react';
import { useCivic } from '../../store/CivicContext';
import { 
  ShieldCheck, 
  MapPin, 
  Layers, 
  Building2, 
  Wrench, 
  BarChart3, 
  Camera, 
  UserCheck, 
  RefreshCw,
  Award
} from 'lucide-react';
import type { Role } from '../../types';

export const Header: React.FC = () => {
  const { 
    currentUser, 
    setCurrentRole, 
    activeTab, 
    setActiveTab, 
    setIsComplaintWizardOpen,
    complaints,
    resetData
  } = useCivic();

  const escalatedCount = complaints.filter(c => c.isEscalated).length;
  const criticalCount = complaints.filter(c => c.priority === 'CRITICAL' && c.status !== 'CLOSED').length;
  const pendingCitizenConfirmCount = complaints.filter(c => c.status === 'RESOLVED_PENDING_CITIZEN_CONFIRMATION').length;

  return (
    <header style={{
      background: 'rgba(11, 15, 23, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 900,
      padding: '0.75rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        {/* Logo & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow-blue)',
          }}>
            <ShieldCheck size={26} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                Civic<span style={{ color: 'var(--accent-blue)' }}>Verify</span>
              </h1>
              <span className="badge badge-info" style={{ fontSize: '0.65rem' }}>
                v2.6 Live
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Location-Aware Civic Verification & Contractor Accountability
            </p>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '0.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
        }}>
          <button
            onClick={() => setActiveTab('FEED')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'FEED' ? 'var(--bg-tertiary)' : 'transparent',
              color: activeTab === 'FEED' ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: activeTab === 'FEED' ? '1px solid var(--border-medium)' : '1px solid transparent',
            }}
          >
            <Layers size={15} />
            <span>Civic Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('MAP')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'MAP' ? 'var(--bg-tertiary)' : 'transparent',
              color: activeTab === 'MAP' ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: activeTab === 'MAP' ? '1px solid var(--border-medium)' : '1px solid transparent',
            }}
          >
            <MapPin size={15} />
            <span>Hotspots Map</span>
          </button>

          <button
            onClick={() => setActiveTab('MY_REPORTS')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'MY_REPORTS' ? 'var(--bg-tertiary)' : 'transparent',
              color: activeTab === 'MY_REPORTS' ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: activeTab === 'MY_REPORTS' ? '1px solid var(--border-medium)' : '1px solid transparent',
              position: 'relative'
            }}
          >
            <UserCheck size={15} />
            <span>My Grievances</span>
            {pendingCitizenConfirmCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#10B981',
                color: 'white',
                fontSize: '0.65rem',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}>
                {pendingCitizenConfirmCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('AUTHORITY')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'AUTHORITY' ? 'var(--bg-tertiary)' : 'transparent',
              color: activeTab === 'AUTHORITY' ? 'var(--accent-amber)' : 'var(--text-secondary)',
              border: activeTab === 'AUTHORITY' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
              position: 'relative'
            }}
          >
            <Building2 size={15} />
            <span>Authority Desk</span>
            {(escalatedCount > 0 || criticalCount > 0) && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#EF4444',
                color: 'white',
                fontSize: '0.65rem',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}>
                {escalatedCount + criticalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('CONTRACTOR')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'CONTRACTOR' ? 'var(--bg-tertiary)' : 'transparent',
              color: activeTab === 'CONTRACTOR' ? 'var(--accent-cyan)' : 'var(--text-secondary)',
              border: activeTab === 'CONTRACTOR' ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
            }}
          >
            <Wrench size={15} />
            <span>Contractor Desk</span>
          </button>

          <button
            onClick={() => setActiveTab('ANALYTICS')}
            className="btn btn-sm"
            style={{
              background: activeTab === 'ANALYTICS' ? 'var(--bg-tertiary)' : 'transparent',
              color: activeTab === 'ANALYTICS' ? 'var(--accent-purple)' : 'var(--text-secondary)',
              border: activeTab === 'ANALYTICS' ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid transparent',
            }}
          >
            <BarChart3 size={15} />
            <span>Analytics</span>
          </button>
        </nav>

        {/* User Role Switcher & Action CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Role Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '0.2rem 0.5rem',
            gap: '0.4rem',
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role:</span>
            <select
              value={currentUser.role}
              onChange={(e) => setCurrentRole(e.target.value as Role)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="CITIZEN" style={{ background: '#111827' }}>👤 Citizen (Aarav)</option>
              <option value="OFFICER" style={{ background: '#111827' }}>🏛️ Ward Officer (Er. Rajesh)</option>
              <option value="CONTRACTOR" style={{ background: '#111827' }}>🛠️ Contractor (Deccan Infra)</option>
            </select>

            {currentUser.role === 'CITIZEN' && (
              <div 
                title={`Reputation: ${currentUser.reputationScore} Points`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.2rem',
                  fontSize: '0.75rem',
                  color: '#F59E0B',
                  fontWeight: 700,
                  marginLeft: '0.25rem'
                }}
              >
                <Award size={13} />
                <span>{currentUser.reputationScore}</span>
              </div>
            )}
          </div>

          {/* Reset Demo Data */}
          <button
            onClick={resetData}
            title="Reset to initial seed dataset"
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.45rem' }}
          >
            <RefreshCw size={14} />
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => setIsComplaintWizardOpen(true)}
            className="btn btn-primary btn-sm"
            style={{
              padding: '0.55rem 1rem',
              fontWeight: 700,
            }}
          >
            <Camera size={16} />
            <span>Report Grievance</span>
          </button>
        </div>
      </div>
    </header>
  );
};
