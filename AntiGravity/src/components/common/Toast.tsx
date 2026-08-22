import React from 'react';
import { useCivic } from '../../store/CivicContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useCivic();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={20} color="#10B981" />;
      case 'error':
        return <AlertCircle size={20} color="#EF4444" />;
      case 'warning':
        return <AlertTriangle size={20} color="#F59E0B" />;
      default:
        return <Info size={20} color="#3B82F6" />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${toast.type}`}>
        <div style={{ marginTop: '2px' }}>{getIcon()}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.15rem' }}>
            {toast.title}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {toast.message}
          </div>
        </div>
      </div>
    </div>
  );
};
