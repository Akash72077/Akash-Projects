import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { navigateTo } from '@/lib/router';
import { analyzeText } from '@/lib/ai';
import { analyzeWithBackend, createComplaint, findDuplicates, toggleSupport, uploadPhoto } from '@/services/complaintService';
import type { AIAnalysisResult, ComplaintCategory, DuplicateMatch, Severity } from '@/types';
import { CATEGORY_LABELS, DEPARTMENTS, SEVERITY_LABELS } from '@/lib/constants';
import AIAnalysisCard from '@/components/AIAnalysisCard';
import ComplaintCard from '@/components/ComplaintCard';
import CameraModal from '@/components/citizen/CameraModal';
import LocationPicker from '@/components/citizen/LocationPicker';
import {
  AlertCircle, ArrowLeft, ArrowRight, Camera, Check, CheckCircle2, Crosshair, Edit3,
  FileText, ImagePlus, Landmark, Loader2, LocateFixed, MapPin, Navigation, Sparkles,
  ThumbsUp, Upload, X
} from 'lucide-react';

type Step = 1 | 2 | 3;

export default function ReportIssuePage() {
  const { user } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [editableResult, setEditableResult] = useState<AIAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [needsDescription, setNeedsDescription] = useState(false);
  const [editing, setEditing] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationText, setLocationText] = useState('');
  const [locationAccuracy, setLocationAccuracy] = useState<number | null>(null);
  const [locating, setLocating] = useState(false);
  const [landmark, setLandmark] = useState('');
  const [locationMode, setLocationMode] = useState<'gps'|'map'|'landmark'>('gps');
  const [duplicates, setDuplicates] = useState<DuplicateMatch[]>([]);
  const [dupChecking, setDupChecking] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setPhotoFile = useCallback((file: File) => {
    setPhoto(file);
    setPhotoPreview(prev => { if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev); return URL.createObjectURL(file); });
    setAiResult(null); setEditableResult(null); setNeedsDescription(false); setDescription(''); setError(null);
  }, []);

  useEffect(() => () => { if (photoPreview?.startsWith('blob:')) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

  const autoDetectLocation = useCallback(() => {
    setLocationMode('gps'); setLocating(true); setError(null);
    if (!navigator.geolocation) { setLocating(false); setError('GPS is not supported in this browser. Please pin the issue on the map.'); return; }
    navigator.geolocation.getCurrentPosition(
      p => {
        const lat=p.coords.latitude, lng=p.coords.longitude;
        setLocation({lat,lng}); setLocationAccuracy(Math.round(p.coords.accuracy)); setLocationText(`${lat.toFixed(5)}°N, ${lng.toFixed(5)}°E`); setLocating(false);
      },
      () => { setLocating(false); setError('GPS permission was not available. Please pin the location on the map or enter a landmark.'); setLocationMode('map'); },
      { enableHighAccuracy:true, timeout:9000, maximumAge:15000 }
    );
  }, []);

  useEffect(() => { autoDetectLocation(); }, [autoDetectLocation]);

  const onMapSelect = useCallback((lat:number,lng:number) => {
    setLocationMode('map'); setLocation({lat,lng}); setLocationAccuracy(null); setLocationText(`${lat.toFixed(5)}°N, ${lng.toFixed(5)}°E`); setError(null);
  }, []);

  async function runAnalysis(text = description) {
    if (!photo && !text.trim()) return;
    setAiLoading(true); setNeedsDescription(false); setError(null);
    try {
      let response;
      try {
        response = await analyzeWithBackend(text, photo);
      } catch (backendError) {
        // Never pretend to understand image pixels from a filename. If the vision backend
        // is unavailable, only fall back to text the citizen actually provided.
        response = text.trim()
          ? analyzeText(text)
          : { couldNotIdentify: true, result: null, message: 'Image AI is unavailable. Please describe the issue or configure the vision API.' };
        if (!text.trim()) setError(backendError instanceof Error ? backendError.message : 'Image AI is unavailable.');
      }
      if (response.result) {
        setAiResult(response.result); setEditableResult(response.result); setNeedsDescription(false);
      } else {
        setNeedsDescription(true); setAiResult(null); setEditableResult(null);
        if (response.message) setError(response.message);
      }
    } finally { setAiLoading(false); }
  }

  async function goToAnalysis() {
    if (!photo) { setError('Capture or upload a photo before continuing.'); return; }
    if (!location && !landmark.trim()) { setError('Confirm the issue location before continuing.'); return; }
    if (landmark.trim() && !locationText) setLocationText(landmark.trim());
    setStep(2); setError(null); if (!editableResult) await runAnalysis();
  }

  async function goToReview() {
    if (!editableResult) { setError('Complete the AI analysis first.'); return; }
    if (!location) { setStep(3); setDuplicates([]); return; }
    setStep(3); setDupChecking(true); setError(null);
    try { setDuplicates(await findDuplicates(location.lat, location.lng, editableResult.category, 300)); }
    catch { setDuplicates([]); }
    finally { setDupChecking(false); }
  }

  async function supportExisting(id:string) {
    if(!user) return;
    try { await toggleSupport(id,user.id); } finally { navigateTo({name:'complaint',id}); }
  }

  async function submit() {
    if(!user || !editableResult || (!location && !locationText)) return;
    setSubmitting(true); setError(null);
    try {
      const photoUrl = photo ? await uploadPhoto(photo,user.id) : null;
      const complaint = await createComplaint({
        user_id:user.id, title:editableResult.title, description:description || editableResult.photo_description || editableResult.ai_summary,
        category:editableResult.category, severity:editableResult.severity, priority_score:editableResult.priority_score,
        suggested_department:editableResult.suggested_department, ai_summary:editableResult.ai_summary, photo_url:photoUrl,
        latitude:location?.lat ?? null, longitude:location?.lng ?? null, location_text:locationText || landmark || null,
        assigned_to:null, supporters:[]
      } as any);
      navigateTo({name:'complaint',id:complaint.id});
    } catch(e) { setError(e instanceof Error ? e.message : 'Could not submit the complaint.'); setSubmitting(false); }
  }

  const confidence = location ? (locationAccuracy == null ? 'PINNED' : locationAccuracy <= 25 ? 'HIGH' : locationAccuracy <= 75 ? 'MEDIUM' : 'LOW') : 'WAITING';

  return (
    <div className="min-h-screen bg-[#070d18] py-6 md:py-8 px-3 md:px-6 page-enter">
      <div className="max-w-[920px] mx-auto rounded-[28px] border border-slate-700/80 bg-[#111a2b] shadow-2xl overflow-hidden">
        <div className="px-6 md:px-8 py-6 border-b border-slate-700/60 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl md:text-2xl font-display font-bold text-white">Report Civic Issue</h1>
              <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-bold tracking-wide text-blue-400">STEP {step} OF 3</span>
            </div>
            <p className="mt-1 text-sm text-slate-400">{step===1?'Capture evidence and verify the exact issue location':step===2?'AI understands, categorizes and prioritizes your complaint':'Check duplicates and submit your verified report'}</p>
          </div>
          <button onClick={()=>navigateTo({name:'citizen-dashboard'})} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"><X className="w-5 h-5"/></button>
        </div>

        <div className="h-1 bg-slate-800"><div className="h-full bg-blue-500 transition-all" style={{width:`${step/3*100}%`}}/></div>

        <div className="p-6 md:p-8">
          {error && <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 flex items-start gap-2"><AlertCircle className="w-4 h-4 mt-0.5 shrink-0"/>{error}</div>}

          {step===1 && <div className="space-y-7">
            <section>
              <label className="block text-sm font-semibold text-slate-300 mb-3">1. Camera-Based Evidence <span className="text-red-400">*</span></label>
              {!photoPreview ? (
                <div className="rounded-2xl border-2 border-dashed border-blue-500 bg-[#122037]/60 p-8 md:p-10 text-center">
                  <button onClick={()=>setCameraOpen(true)} className="mx-auto flex flex-col items-center group">
                    <span className="w-16 h-16 rounded-full bg-blue-500/15 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/25 transition"><Camera className="w-7 h-7"/></span>
                    <span className="mt-4 text-lg font-bold text-white">Click to Open Live Camera</span>
                    <span className="mt-1 text-sm text-slate-400">Capture genuine evidence of the civic problem</span>
                  </button>
                  <div className="my-5 flex items-center gap-3 text-xs text-slate-500"><span className="h-px bg-slate-700 flex-1"/>OR<span className="h-px bg-slate-700 flex-1"/></div>
                  <button onClick={()=>fileRef.current?.click()} className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800/80 px-4 py-2.5 text-sm font-semibold text-slate-200 hover:border-blue-500/60 hover:text-white"><Upload className="w-4 h-4"/>Upload Existing Photo</button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)setPhotoFile(f)}}/>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-700 bg-[#0d1625] p-4">
                  <div className="relative overflow-hidden rounded-xl bg-black"><img src={photoPreview} className="w-full max-h-[340px] object-contain" alt="Civic evidence"/><button onClick={()=>{setPhoto(null);setPhotoPreview(null)}} className="absolute top-3 right-3 rounded-full bg-black/70 p-2 text-white"><X className="w-4 h-4"/></button></div>
                  <div className="mt-3 flex flex-wrap justify-between gap-2"><div className="text-sm text-slate-300 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400"/>Evidence ready</div><div className="flex gap-2"><button onClick={()=>setCameraOpen(true)} className="px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200">Retake</button><button onClick={()=>fileRef.current?.click()} className="px-3 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200">Replace</button></div></div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f)setPhotoFile(f)}}/>
                </div>
              )}
            </section>

            <section>
              <label className="block text-sm font-semibold text-slate-300 mb-3">2. Location Detection & Fallback <span className="text-red-400">*</span></label>
              <div className="grid grid-cols-3 rounded-xl border border-slate-700 bg-[#151f31] p-1 gap-1">
                <button onClick={autoDetectLocation} className={`rounded-lg px-2 py-2.5 text-xs md:text-sm font-semibold flex items-center justify-center gap-2 ${locationMode==='gps'?'bg-blue-500 text-white':'text-slate-400 hover:text-white'}`}>{locating?<Loader2 className="w-4 h-4 animate-spin"/>:<Navigation className="w-4 h-4"/>}<span className="hidden sm:inline">Device GPS</span><span className="sm:hidden">GPS</span></button>
                <button onClick={()=>setLocationMode('map')} className={`rounded-lg px-2 py-2.5 text-xs md:text-sm font-semibold flex items-center justify-center gap-2 ${locationMode==='map'?'bg-blue-500 text-white':'text-slate-400 hover:text-white'}`}><MapPin className="w-4 h-4"/><span className="hidden sm:inline">Pin on Map</span><span className="sm:hidden">Map</span></button>
                <button onClick={()=>setLocationMode('landmark')} className={`rounded-lg px-2 py-2.5 text-xs md:text-sm font-semibold flex items-center justify-center gap-2 ${locationMode==='landmark'?'bg-blue-500 text-white':'text-slate-400 hover:text-white'}`}><Landmark className="w-4 h-4"/>Landmark</button>
              </div>

              <div className="mt-4 rounded-xl border border-slate-700 bg-[#151f31] px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className={`rounded-full px-3 py-1 text-xs font-bold border ${location?'border-emerald-500/30 bg-emerald-500/10 text-emerald-400':'border-slate-600 bg-slate-800 text-slate-400'}`}>LOCATION CONFIDENCE: {confidence}</span>
                <span className="text-sm font-mono text-slate-300 flex-1">{locationText || landmark || 'Waiting for location...'}</span>
                {locationAccuracy!=null && <span className="text-xs text-slate-500">±{locationAccuracy}m precision</span>}
              </div>

              {locationMode==='landmark' && <div className="mt-4"><input value={landmark} onChange={e=>{setLandmark(e.target.value);setLocationText(e.target.value)}} placeholder="e.g. Near Cyber Towers, main gate" className="w-full rounded-xl border border-slate-700 bg-[#0d1625] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-blue-500"/></div>}
              {locationMode!=='landmark' && <div className="mt-4 overflow-hidden rounded-2xl border border-slate-700"><LocationPicker location={location} onSelect={onMapSelect} height="260px"/><div className="bg-[#0d1625] px-4 py-2.5 text-xs text-slate-400 flex items-center gap-2"><LocateFixed className="w-4 h-4 text-amber-400"/>Click or drag the pin to adjust the exact issue location.</div></div>}
            </section>

            <div className="flex justify-end"><button onClick={goToAnalysis} className="rounded-xl bg-blue-500 hover:bg-blue-400 px-6 py-3 text-sm font-bold text-white flex items-center gap-2">Continue to AI Analysis<ArrowRight className="w-4 h-4"/></button></div>
          </div>}

          {step===2 && <div className="space-y-5">
            <div className="grid md:grid-cols-[180px_1fr] gap-4 rounded-2xl border border-slate-700 bg-[#0d1625] p-4">
              {photoPreview && <img src={photoPreview} className="w-full h-36 object-cover rounded-xl" alt="Evidence"/>}
              <div className="flex flex-col justify-center"><div className="text-xs uppercase tracking-wider text-blue-400 font-bold">AI Evidence Scan</div><h2 className="text-xl text-white font-display font-bold mt-1">Understanding the civic problem</h2><p className="text-sm text-slate-400 mt-2">The analysis generates a complaint summary, category, severity, priority and responsible department.</p></div>
            </div>

            {aiLoading && <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6"><div className="flex items-center gap-3 text-white font-semibold"><Loader2 className="w-5 h-5 animate-spin text-blue-400"/>Analyzing civic issue...</div><div className="grid sm:grid-cols-2 gap-2 mt-4 text-sm text-slate-400"><span>✓ Detecting issue</span><span>✓ Estimating severity</span><span>✓ Finding department</span><span>✓ Calculating priority</span></div></div>}

            {needsDescription && !aiLoading && <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5"><div className="flex gap-2 text-amber-300 font-bold"><AlertCircle className="w-5 h-5"/>We could not clearly identify the problem. Please describe the issue.</div><textarea value={description} onChange={e=>setDescription(e.target.value)} rows={4} placeholder="The electric wire is hanging very low near the school entrance." className="mt-4 w-full rounded-xl border border-amber-500/20 bg-[#0d1625] px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-amber-400"/><button onClick={()=>runAnalysis(description)} disabled={!description.trim()} className="mt-3 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 disabled:opacity-40 flex items-center gap-2"><Sparkles className="w-4 h-4"/>Analyze Description</button></div>}

            {editableResult && !aiLoading && <div className="civic-dark-analysis"><AIAnalysisCard result={editableResult}/></div>}

            {editableResult && !editing && <button onClick={()=>setEditing(true)} className="rounded-xl border border-slate-700 bg-[#151f31] px-4 py-2.5 text-sm font-semibold text-slate-300 flex items-center gap-2"><Edit3 className="w-4 h-4"/>Confirm or Edit AI Results</button>}
            {editableResult && editing && <div className="rounded-2xl border border-slate-700 bg-[#0d1625] p-5 space-y-4">
              <DarkField label="Complaint title"><input value={editableResult.title} onChange={e=>setEditableResult({...editableResult,title:e.target.value})} className="dark-input"/></DarkField>
              <div className="grid md:grid-cols-2 gap-4"><DarkField label="Category"><select value={editableResult.category} onChange={e=>setEditableResult({...editableResult,category:e.target.value as ComplaintCategory})} className="dark-input">{(Object.keys(CATEGORY_LABELS) as ComplaintCategory[]).map(c=><option key={c} value={c}>{CATEGORY_LABELS[c]}</option>)}</select></DarkField><DarkField label="Severity"><select value={editableResult.severity} onChange={e=>setEditableResult({...editableResult,severity:e.target.value as Severity})} className="dark-input">{(['low','medium','high','critical'] as Severity[]).map(s=><option key={s} value={s}>{SEVERITY_LABELS[s]}</option>)}</select></DarkField></div>
              <div className="grid md:grid-cols-2 gap-4"><DarkField label="Priority score"><input type="number" min="0" max="100" value={editableResult.priority_score} onChange={e=>setEditableResult({...editableResult,priority_score:Math.min(100,Math.max(0,+e.target.value||0))})} className="dark-input"/></DarkField><DarkField label="Department"><select value={editableResult.suggested_department} onChange={e=>setEditableResult({...editableResult,suggested_department:e.target.value})} className="dark-input">{DEPARTMENTS.map(d=><option key={d}>{d}</option>)}</select></DarkField></div>
              {editableResult.photo_description && <DarkField label="AI photo description"><textarea rows={3} value={editableResult.photo_description} onChange={e=>setEditableResult({...editableResult,photo_description:e.target.value})} className="dark-input resize-none"/></DarkField>}
              <DarkField label="AI complaint summary"><textarea rows={3} value={editableResult.ai_summary} onChange={e=>setEditableResult({...editableResult,ai_summary:e.target.value})} className="dark-input resize-none"/></DarkField>
              <DarkField label="Additional citizen description (optional)"><textarea rows={3} value={description} onChange={e=>setDescription(e.target.value)} className="dark-input resize-none" placeholder="Add any useful detail the photo cannot show."/></DarkField>
              <button onClick={()=>setEditing(false)} className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 flex items-center gap-2"><Check className="w-4 h-4"/>Save confirmation</button>
            </div>}

            <div className="flex gap-3"><button onClick={()=>setStep(1)} className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 flex items-center gap-2"><ArrowLeft className="w-4 h-4"/>Back</button><button onClick={goToReview} disabled={!editableResult} className="flex-1 rounded-xl bg-blue-500 px-5 py-3 text-sm font-bold text-white disabled:opacity-40 flex items-center justify-center gap-2">Confirm & Continue<ArrowRight className="w-4 h-4"/></button></div>
          </div>}

          {step===3 && <div className="space-y-5">
            <div className="rounded-2xl border border-slate-700 bg-[#0d1625] p-5"><div className="text-xs text-blue-400 font-bold uppercase tracking-wider">Final Review</div><h2 className="text-xl font-display font-bold text-white mt-1">Ready to submit</h2><div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mt-5 text-sm"><Review label="Issue" value={editableResult?.title}/><Review label="Category" value={editableResult?CATEGORY_LABELS[editableResult.category]:undefined}/><Review label="Severity" value={editableResult?SEVERITY_LABELS[editableResult.severity]:undefined}/><Review label="Priority" value={editableResult?`${editableResult.priority_score}/100`:undefined}/><Review label="Department" value={editableResult?.suggested_department}/><Review label="Location" value={locationText || landmark}/></div></div>

            {dupChecking && <div className="rounded-2xl border border-slate-700 bg-[#151f31] p-5 text-sm text-slate-300 flex gap-2 items-center"><Loader2 className="w-4 h-4 animate-spin text-blue-400"/>Checking nearby reports for duplicates...</div>}
            {!dupChecking && duplicates.length>0 && <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5"><div className="text-amber-300 font-bold flex gap-2"><AlertCircle className="w-5 h-5"/>This issue may already be reported.</div><p className="text-sm text-amber-200/70 mt-1">Support an existing complaint to increase the number of affected citizens and its priority.</p><div className="mt-4 space-y-3">{duplicates.slice(0,2).map(d=><div key={d.complaint.id} className="rounded-xl bg-white p-3"><ComplaintCard complaint={d.complaint} compact/><div className="mt-2 flex justify-between items-center"><span className="text-xs text-slate-500">{Math.round(d.distanceMeters)}m away</span><button onClick={()=>supportExisting(d.complaint.id)} className="rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-slate-950 flex gap-1 items-center"><ThumbsUp className="w-3.5 h-3.5"/>I also face this issue</button></div></div>)}</div></div>}
            {!dupChecking && duplicates.length===0 && <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-300 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/>No matching unresolved complaint found within 300 metres.</div>}

            <div className="flex gap-3"><button onClick={()=>setStep(2)} disabled={submitting} className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 flex items-center gap-2"><ArrowLeft className="w-4 h-4"/>Back</button><button onClick={submit} disabled={submitting} className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 disabled:opacity-50 flex items-center justify-center gap-2">{submitting?<><Loader2 className="w-4 h-4 animate-spin"/>Submitting...</>:<><CheckCircle2 className="w-4 h-4"/>Submit Civic Report</>}</button></div>
          </div>}
        </div>
      </div>
      <CameraModal open={cameraOpen} onClose={()=>setCameraOpen(false)} onCapture={setPhotoFile}/>
    </div>
  );
}

function DarkField({label,children}:{label:string;children:React.ReactNode}){return <label className="block"><span className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</span>{children}</label>}
function Review({label,value}:{label:string;value?:string}){return <div><div className="text-xs text-slate-500">{label}</div><div className="font-semibold text-slate-200 mt-0.5">{value||'—'}</div></div>}
