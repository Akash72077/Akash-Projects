import React from 'react';
import { CivicProvider, useCivic } from './store/CivicContext';
import { Header } from './components/common/Header';
import { Toast } from './components/common/Toast';
import { CivicFeed } from './components/citizen/CivicFeed';
import { CivicMapView } from './components/map/CivicMapView';
import { MyComplaintsView } from './components/citizen/MyComplaintsView';
import { AuthorityDashboard } from './components/authority/AuthorityDashboard';
import { ContractorPortal } from './components/contractor/ContractorPortal';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { ComplaintWizard } from './components/citizen/ComplaintWizard';
import { ComplaintDetailModal } from './components/complaint/ComplaintDetailModal';

const AppContent: React.FC = () => {
  const { activeTab } = useCivic();

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        {activeTab === 'FEED' && <CivicFeed />}
        {activeTab === 'MAP' && <CivicMapView />}
        {activeTab === 'MY_REPORTS' && <MyComplaintsView />}
        {activeTab === 'AUTHORITY' && <AuthorityDashboard />}
        {activeTab === 'CONTRACTOR' && <ContractorPortal />}
        {activeTab === 'ANALYTICS' && <AnalyticsView />}
      </main>

      {/* Global Modals & Notifications */}
      <ComplaintWizard />
      <ComplaintDetailModal />
      <Toast />

      {/* Responsive Footer */}
      <footer style={{
        background: 'rgba(11, 15, 23, 0.95)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '1.25rem 1.5rem',
        marginTop: '2rem',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}>
          <div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>CivicVerify</span> — Location-Aware Civic Complaint Verification & Accountability Platform
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            Architecture designed for municipal GIS & Defect Liability Period (DLP) contract integration
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <CivicProvider>
      <AppContent />
    </CivicProvider>
  );
}

export default App;
