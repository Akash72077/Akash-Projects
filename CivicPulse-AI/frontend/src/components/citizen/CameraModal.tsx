import { useEffect, useRef, useState } from 'react';
import { Camera, Loader2, RotateCcw, X } from 'lucide-react';

export default function CameraModal({ open, onClose, onCapture }: { open: boolean; onClose: () => void; onCapture: (file: File) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null); const streamRef = useRef<MediaStream | null>(null); const [error,setError] = useState(''); const [loading,setLoading] = useState(false);
  const stop = () => { streamRef.current?.getTracks().forEach(t=>t.stop()); streamRef.current=null; };
  const start = async () => { setError(''); setLoading(true); stop(); try { const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false}); streamRef.current=stream; if(videoRef.current){videoRef.current.srcObject=stream; await videoRef.current.play();} } catch { setError('Camera access was blocked or is not available. You can use Upload Existing Photo instead.'); } finally { setLoading(false); } };
  useEffect(()=>{ if(open) start(); else stop(); return stop; },[open]);
  if(!open) return null;
  const capture = () => { const video=videoRef.current; if(!video || !video.videoWidth) return; const canvas=document.createElement('canvas'); canvas.width=video.videoWidth; canvas.height=video.videoHeight; const ctx=canvas.getContext('2d'); if(!ctx)return; ctx.drawImage(video,0,0); canvas.toBlob(blob=>{ if(!blob)return; const file=new File([blob],`civic-evidence-${Date.now()}.jpg`,{type:'image/jpeg'}); onCapture(file); stop(); onClose(); },'image/jpeg',0.9); };
  return <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="w-full max-w-3xl rounded-2xl border border-slate-700 bg-[#0f1725] shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700"><div><h3 className="font-display font-bold text-white">Live Camera Evidence</h3><p className="text-xs text-slate-400">Capture a clear photo of the civic issue.</p></div><button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"><X className="w-5 h-5"/></button></div>
      <div className="relative bg-black aspect-video flex items-center justify-center">
        {loading && <Loader2 className="w-8 h-8 text-blue-400 animate-spin"/>}
        <video ref={videoRef} playsInline muted className={`w-full h-full object-contain ${loading?'hidden':''}`}/>
        {error && <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-amber-300">{error}</div>}
      </div>
      <div className="p-4 flex gap-3 justify-end"><button onClick={start} className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center gap-2"><RotateCcw className="w-4 h-4"/>Restart camera</button><button onClick={capture} disabled={!!error||loading} className="px-5 py-2.5 rounded-xl bg-blue-500 text-white font-semibold disabled:opacity-40 flex items-center gap-2"><Camera className="w-4 h-4"/>Capture Photo</button></div>
    </div>
  </div>;
}
