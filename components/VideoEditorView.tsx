
import React, { useState, useEffect } from 'react';
import { EditorLayout } from './EditorLayout';
import { generateVideo } from '../services/geminiService';

export const VideoEditorView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [startImage, setStartImage] = useState<string | null>(null);
  const [endImage, setEndImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressMessage, setProgressMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [config, setConfig] = useState<{
    aspectRatio: '16:9' | '9:16';
    resolution: '720p' | '1080p';
  }>({
    aspectRatio: '16:9',
    resolution: '720p'
  });

  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      if (window.aistudio?.hasSelectedApiKey) {
        const has = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(has);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    // @ts-ignore
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true); // Assume success per instructions
    }
  };

  const handleFileChange = (setter: (val: string | null) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setProgressMessage("Initiating request...");
    try {
      const result = await generateVideo(prompt, { ...config, startImage: startImage || undefined, endImage: endImage || undefined }, setProgressMessage);
      setVideoUrl(result);
    } catch (error: any) {
      if (error.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert("API Key error. Please select a valid paid project key.");
      } else {
        alert("Video generation failed. Please try again.");
      }
    } finally {
      setIsProcessing(false);
      setProgressMessage('');
    }
  };

  if (!hasApiKey) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <div className="glass-effect p-12 rounded-[40px] border border-emerald-500/20 shadow-2xl">
          <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
            <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-4xl font-black uppercase mb-4 tracking-tighter">Veo 3.1 Authorization</h2>
          <p className="text-slate-400 text-lg mb-8 max-w-sm mx-auto leading-relaxed">
            High-fidelity video generation requires a valid paid project API key.
          </p>
          <div className="flex flex-col gap-4">
            <button 
              onClick={handleSelectKey}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-sm"
            >
              Select Paid API Key
            </button>
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-emerald-500/50 text-xs font-bold hover:text-emerald-400 transition-colors tracking-widest uppercase">
              Billing Requirements Info
            </a>
          </div>
        </div>
      </div>
    );
  }

  const sidebar = (
    <div className="space-y-6">
      <div>
        <label className="block text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Visual Narrative</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the cinematic action... e.g., 'A slow drone zoom into a tribal ceremony in the Omo Valley'"
          className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none h-32 resize-none font-medium leading-relaxed"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2">Initial Frame</label>
          <input type="file" accept="image/*" onChange={handleFileChange(setStartImage)} className="hidden" id="start-frame" />
          <label htmlFor="start-frame" className="block w-full h-24 border border-dashed border-white/5 rounded-2xl cursor-pointer hover:bg-white/5 flex flex-col items-center justify-center transition-all">
             {startImage ? (
               <div className="text-emerald-500 flex flex-col items-center gap-1">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                 <span className="text-[10px] font-bold uppercase tracking-tighter">Uploaded</span>
               </div>
             ) : (
               <span className="text-slate-600 font-bold uppercase text-[10px] tracking-widest">Select</span>
             )}
          </label>
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-2">Target Frame</label>
          <input type="file" accept="image/*" onChange={handleFileChange(setEndImage)} className="hidden" id="end-frame" />
          <label htmlFor="end-frame" className="block w-full h-24 border border-dashed border-white/5 rounded-2xl cursor-pointer hover:bg-white/5 flex flex-col items-center justify-center transition-all">
             {endImage ? (
               <div className="text-emerald-500 flex flex-col items-center gap-1">
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                 <span className="text-[10px] font-bold uppercase tracking-tighter">Uploaded</span>
               </div>
             ) : (
               <span className="text-slate-600 font-bold uppercase text-[10px] tracking-widest">Select</span>
             )}
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Format</label>
        <div className="flex gap-2">
           <button 
             onClick={() => setConfig(prev => ({...prev, aspectRatio: '16:9'}))}
             className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${config.aspectRatio === '16:9' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-900/50 text-slate-500'}`}
           >Landscape</button>
           <button 
             onClick={() => setConfig(prev => ({...prev, aspectRatio: '9:16'}))}
             className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${config.aspectRatio === '9:16' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-900/50 text-slate-500'}`}
           >Portrait</button>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => setConfig(prev => ({...prev, resolution: '720p'}))}
             className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${config.resolution === '720p' ? 'bg-white text-black' : 'bg-slate-900/50 text-slate-500'}`}
           >720P Fast</button>
           <button 
             onClick={() => setConfig(prev => ({...prev, resolution: '1080p'}))}
             className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${config.resolution === '1080p' ? 'bg-white text-black' : 'bg-slate-900/50 text-slate-500'}`}
           >1080P Pro</button>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isProcessing || !prompt}
        className={`w-full py-5 px-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all ${
          isProcessing || !prompt
            ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-500/20 active:scale-95'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Rendering...
          </div>
        ) : 'Generate Sequence'}
      </button>
    </div>
  );

  return (
    <EditorLayout 
      title="Veo Studio" 
      description="Advanced cinematic synthesis engine. Transforming descriptions into high-fidelity visual sequences."
      sidebar={sidebar}
    >
      <div className="w-full max-w-2xl mx-auto space-y-6">
        <div className={`aspect-video rounded-[32px] glass-effect border border-white/5 overflow-hidden flex items-center justify-center relative shadow-3xl bg-slate-950/60 ${config.aspectRatio === '9:16' ? 'max-w-sm mx-auto aspect-[9/16]' : ''}`}>
          {isProcessing ? (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 p-8 text-center backdrop-blur-xl">
              <div className="w-20 h-20 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin mb-8" />
              <h4 className="text-2xl font-black uppercase tracking-tighter mb-2">Synthesizing Frames</h4>
              <p className="text-slate-500 text-sm max-w-xs font-medium">{progressMessage}</p>
            </div>
          ) : null}
          
          {videoUrl ? (
            <video 
              src={videoUrl} 
              controls 
              autoPlay 
              loop 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-6 text-slate-800">
               <div className="p-10 border-2 border-dashed border-white/5 rounded-full">
                 <svg className="w-20 h-20 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                   <path d="M10 15.17L11.41 13.76L13.17 15.53V9H15.17V15.53L16.94 13.76L18.35 15.17L14.17 19.35L10 15.17ZM4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4ZM4 6V18H20V6H4Z" />
                 </svg>
               </div>
               <span className="font-black uppercase tracking-[0.4em] text-xs opacity-20">Awaiting Generation</span>
            </div>
          )}
        </div>

        {videoUrl && (
          <div className="flex justify-center">
            <a 
              href={videoUrl} 
              download="alazarpro-synth.mp4"
              className="px-10 py-4 bg-white text-black hover:bg-emerald-500 hover:text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl"
            >
              Export Sequence
            </a>
          </div>
        )}
      </div>
    </EditorLayout>
  );
};
