import React, { useState } from 'react';
import { useCivic } from '../../store/CivicContext';
import { 
  X, 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft,
  Building2,
  Clock,
  Zap,
  Droplets,
  Hammer,
  Trash2,
  Construction,
  Waves,
  Filter,
  LightbulbOff
} from 'lucide-react';
import type { ComplaintCategory, Coordinates, LocationConfidence, LocationMethod } from '../../types';
import { CameraModal } from './CameraModal';
import { LocationPicker } from './LocationPicker';
import { DuplicateAlertModal } from './DuplicateAlertModal';
import { CATEGORY_DEPARTMENT_MAP, simulateAIVerification, type AICivilClassificationResult } from '../../utils/aiSimulator';

const CATEGORY_ICONS: Record<ComplaintCategory, React.ReactNode> = {
  POTHOLE: <Hammer size={18} color="#3B82F6" />,
  ROAD_DEFECT: <Construction size={18} color="#3B82F6" />,
  WATER_LEAK: <Droplets size={18} color="#06B6D4" />,
  GARBAGE: <Trash2 size={18} color="#10B981" />,
  OPEN_MANHOLE: <AlertTriangle size={18} color="#EF4444" />,
  SEWAGE_OVERFLOW: <Waves size={18} color="#F59E0B" />,
  DRAINAGE_BLOCK: <Filter size={18} color="#F59E0B" />,
  BROKEN_STREETLIGHT: <LightbulbOff size={18} color="#8B5CF6" />,
  ELECTRICAL_HAZARD: <Zap size={18} color="#EF4444" />,
};

export const ComplaintWizard: React.FC = () => {
  const { 
    isComplaintWizardOpen, 
    setIsComplaintWizardOpen, 
    submitComplaint, 
    clusterDuplicateReport,
    checkNearbyDuplicates 
  } = useCivic();

  const [step, setStep] = useState<number>(1);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);

  // Form State
  const [imageUrl, setImageUrl] = useState<string>('');
  const [capturedViaCamera, setCapturedViaCamera] = useState<boolean>(true);
  const [rawCoordinates, setRawCoordinates] = useState<Coordinates | null>(null);
  
  const [latitude, setLatitude] = useState<number>(17.4623);
  const [longitude, setLongitude] = useState<number>(78.3562);
  const [address, setAddress] = useState<string>('Near Kondapur Main Road');
  const [ward, setWard] = useState<string>('Ward 104 - Kondapur / Madhapur');
  const [zone, setZone] = useState<string>('Serilingampally West Zone');
  const [locationConfidence, setLocationConfidence] = useState<LocationConfidence>('HIGH');
  const [locationMethod, setLocationMethod] = useState<LocationMethod>('GPS_HARDWARE');

  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory>('POTHOLE');
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // AI Inference State
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [aiResult, setAiResult] = useState<AICivilClassificationResult | null>(null);

  // Duplicate Check Modal State
  const [duplicateList, setDuplicateList] = useState<any[]>([]);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState<boolean>(false);

  if (!isComplaintWizardOpen) return null;

  const handleCameraCapture = (img: string, coords: Coordinates | null, isLive: boolean) => {
    setImageUrl(img);
    setCapturedViaCamera(isLive);
    if (coords) {
      setRawCoordinates(coords);
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    }
  };

  const handleRunAiAnalysis = async (cat: ComplaintCategory) => {
    setSelectedCategory(cat);
    setIsAiAnalyzing(true);
    try {
      const result = await simulateAIVerification(cat, description, imageUrl);
      setAiResult(result);
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleAttemptFinalSubmit = () => {
    // Check for nearby duplicates first
    const nearby = checkNearbyDuplicates(latitude, longitude, selectedCategory);
    if (nearby.length > 0) {
      setDuplicateList(nearby);
      setIsDuplicateModalOpen(true);
      return;
    }
    executeFinalCreation();
  };

  const executeFinalCreation = () => {
    submitComplaint({
      title: title || `${CATEGORY_DEPARTMENT_MAP[selectedCategory].displayName} at ${address.slice(0, 30)}`,
      description,
      category: selectedCategory,
      latitude,
      longitude,
      address,
      ward,
      zone,
      locationConfidence,
      locationMethod,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      capturedViaCamera,
      aiConfidence: aiResult?.confidence || 0.95,
      aiNotes: aiResult?.verificationNotes,
    });

    handleCloseModal();
  };

  const handleClusterMatch = (masterId: string) => {
    clusterDuplicateReport(masterId, description);
    setIsDuplicateModalOpen(false);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsComplaintWizardOpen(false);
    setStep(1);
    setImageUrl('');
    setAiResult(null);
    setTitle('');
    setDescription('');
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-content" style={{ maxWidth: '680px' }}>
          {/* Header */}
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem' }}>Report Civic Grievance</h3>
                <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                  Step {step} of 3
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {step === 1 && '1. Capture live camera evidence and verify location'}
                {step === 2 && '2. Select category & AI Computer Vision validation'}
                {step === 3 && '3. Review municipal department routing & Defect Liability check'}
              </p>
            </div>
            <button
              onClick={handleCloseModal}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Stepper Wizard Body */}
          <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* STEP 1: Camera Evidence & Location */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Camera Card */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    1. Camera-Based Evidence <span style={{ color: '#EF4444' }}>*</span>
                  </label>

                  {imageUrl ? (
                    <div style={{
                      position: 'relative',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      border: '1px solid var(--border-medium)',
                      aspectRatio: '16/9',
                    }}>
                      <img src={imageUrl} alt="Captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute',
                        bottom: '8px',
                        left: '8px',
                        right: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.4rem 0.75rem',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.75rem',
                        color: '#fff',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <CheckCircle2 size={15} color="#10B981" />
                          <span>Live Evidence Authenticated</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsCameraModalOpen(true)}
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                        >
                          Change Photo
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsCameraModalOpen(true)}
                      style={{
                        border: '2px dashed var(--accent-blue)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '2rem 1.5rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        background: 'rgba(59, 130, 246, 0.04)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(59, 130, 246, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.75rem',
                      }}>
                        <Camera size={24} color="var(--accent-blue)" />
                      </div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Click to Open Live Camera</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                        Enforces genuine real-time capture to reduce duplicate & recycled images
                      </p>
                    </div>
                  )}
                </div>

                {/* Location Picker */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>
                    2. Location Detection & 4-Tier Fallback <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <LocationPicker
                    initialCoordinates={rawCoordinates}
                    onLocationChange={(loc) => {
                      setLatitude(loc.latitude);
                      setLongitude(loc.longitude);
                      setAddress(loc.address);
                      setWard(loc.ward);
                      setZone(loc.zone);
                      setLocationConfidence(loc.locationConfidence);
                      setLocationMethod(loc.locationMethod);
                    }}
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Issue Category & AI Vision Inference */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.6rem' }}>
                    Select Problem Category:
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: '0.6rem',
                  }}>
                    {(Object.keys(CATEGORY_DEPARTMENT_MAP) as ComplaintCategory[]).map((cat) => {
                      const meta = CATEGORY_DEPARTMENT_MAP[cat];
                      const isSelected = selectedCategory === cat;
                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleRunAiAnalysis(cat)}
                          className="glass-card"
                          style={{
                            padding: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            textAlign: 'left',
                            background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-tertiary)',
                            borderColor: isSelected ? 'var(--accent-blue)' : 'var(--border-subtle)',
                            cursor: 'pointer',
                          }}
                        >
                          <div style={{ flexShrink: 0 }}>{CATEGORY_ICONS[cat]}</div>
                          <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {meta.displayName}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                              SLA: {meta.slaHours}h
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* AI Computer Vision Live Analysis Box */}
                <div style={{
                  background: 'rgba(59, 130, 246, 0.05)',
                  border: '1px solid rgba(59, 130, 246, 0.25)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '0.9rem' }}>
                      <Sparkles size={16} />
                      <span>AI Computer Vision Pipeline</span>
                    </div>
                    {isAiAnalyzing ? (
                      <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>Running Vision Inference...</span>
                    ) : aiResult ? (
                      <span className="badge badge-low" style={{ fontSize: '0.7rem' }}>
                        {(aiResult.confidence * 100).toFixed(0)}% Confidence Match
                      </span>
                    ) : (
                      <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>Ready</span>
                    )}
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    {aiResult ? aiResult.verificationNotes : 'Analyzing image characteristics, surface fractures, and environmental signatures against municipal taxonomy...'}
                  </p>

                  {aiResult && (
                    <div style={{
                      marginTop: '0.75rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.4rem',
                    }}>
                      {aiResult.detectedFeatures.map((feat, i) => (
                        <span key={i} style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          color: '#E5E7EB',
                        }}>
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Optional Title & Description */}
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>
                    Detailed Notes (Optional):
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Provide additional context such as depth, landmark references, or immediate hazard risks..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.6rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Review & Municipal Routing Summary */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {CATEGORY_ICONS[selectedCategory]}
                      <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                        {CATEGORY_DEPARTMENT_MAP[selectedCategory].displayName}
                      </span>
                    </div>
                    <span className={`badge badge-${CATEGORY_DEPARTMENT_MAP[selectedCategory].defaultPriority.toLowerCase()}`}>
                      {CATEGORY_DEPARTMENT_MAP[selectedCategory].defaultPriority} Priority
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Assigned Department:</span>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 600, marginTop: '2px' }}>
                        {CATEGORY_DEPARTMENT_MAP[selectedCategory].departmentName}
                      </div>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Response SLA:</span>
                      <div style={{ color: 'var(--accent-blue)', fontWeight: 600, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Clock size={14} />
                        <span>{CATEGORY_DEPARTMENT_MAP[selectedCategory].slaHours} Hours Clock</span>
                      </div>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Municipal Ward:</span>
                      <div style={{ color: 'var(--text-primary)', fontWeight: 500, marginTop: '2px' }}>
                        {ward}
                      </div>
                    </div>

                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Location Confidence:</span>
                      <div style={{ marginTop: '2px' }}>
                        <span className={`badge badge-${locationConfidence === 'HIGH' ? 'low' : 'medium'}`}>
                          {locationConfidence} ({locationMethod})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Defect Liability Period (DLP) Banner */}
                  {(selectedCategory === 'POTHOLE' || selectedCategory === 'ROAD_DEFECT' || selectedCategory === 'WATER_LEAK') && (
                    <div style={{
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.65rem 0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontSize: '0.75rem',
                    }}>
                      <Building2 size={18} color="#10B981" />
                      <div>
                        <strong style={{ color: '#34D399' }}>Contractor DLP Warranty Detected:</strong>
                        <div style={{ color: 'var(--text-secondary)' }}>
                          This infrastructure segment is under active 3-Year contractor warranty (Deccan Infra Ltd). Auto-routing defect rectification notice directly to contractor.
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Stepper Footer Buttons */}
          <div style={{
            padding: '1.25rem 1.5rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(prev => prev - 1)}
                className="btn btn-secondary btn-sm"
              >
                <ChevronLeft size={16} />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && !imageUrl) {
                    setIsCameraModalOpen(true);
                    return;
                  }
                  if (step === 1 && !aiResult) {
                    handleRunAiAnalysis(selectedCategory);
                  }
                  setStep(prev => prev + 1);
                }}
                className="btn btn-primary"
                style={{ fontWeight: 700 }}
              >
                <span>Continue</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAttemptFinalSubmit}
                className="btn btn-success btn-lg"
                style={{ fontWeight: 700, padding: '0.65rem 1.5rem', fontSize: '0.95rem' }}
              >
                <CheckCircle2 size={18} />
                <span>Submit Grievance to Municipal Desk</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Camera Capture Modal */}
      <CameraModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Geospatial Duplicate Prevention Modal */}
      <DuplicateAlertModal
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
        duplicates={duplicateList}
        userLat={latitude}
        userLng={longitude}
        onCluster={handleClusterMatch}
        onProceedSeparate={() => {
          setIsDuplicateModalOpen(false);
          executeFinalCreation();
        }}
      />
    </>
  );
};
