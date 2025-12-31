
import React, { useState } from 'react';
import { EditorLayout } from './EditorLayout';
import { editPhoto } from '../services/geminiService';

export const PhotoEditorView: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    try {
      const result = await editPhoto(prompt, image || undefined);
      if (result) setResultImage(result);
    } catch (error) {
      alert("Failed to edit photo. Please check your API usage or prompt.");
    } finally {
      setIsProcessing(false);
    }
  };

  const sidebar = (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Upload Source Photo</label>
        <div className="relative group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-all"
          >
            <span className="text-slate-400 text-sm">Click to upload image</span>
            {image && <span className="text-emerald-400 text-xs mt-2 truncate max-w-[200px]">Image Loaded</span>}
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Instructions</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Make it look like a cyberpunk neon city' or 'Add a friendly cat sitting on the bench'"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none h-32 resize-none"
        />
      </div>

      <button
        onClick={handleEdit}
        disabled={isProcessing || !prompt}
        className={`w-full py-4 px-6 rounded-xl font-bold transition-all ${
          isProcessing || !prompt
            ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating...
          </div>
        ) : 'Magic Edit'}
      </button>
    </div>
  );

  return (
    <EditorLayout 
      title="Photo Editor" 
      description="Reimagine your photos with AI. Add objects, change styles, or generate new scenes."
      sidebar={sidebar}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Source</h3>
          <div className="aspect-square rounded-2xl overflow-hidden glass-effect flex items-center justify-center border border-white/10">
            {image ? (
              <img src={image} className="w-full h-full object-contain" alt="Source" />
            ) : (
              <div className="text-slate-600 text-center p-8 italic">No source image uploaded</div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Result</h3>
          <div className="aspect-square rounded-2xl overflow-hidden glass-effect flex items-center justify-center border border-white/10 relative">
            {isProcessing && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/50 backdrop-blur-sm">
                <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
                <p className="text-blue-400 font-medium animate-pulse">Processing Pixel Perfection...</p>
              </div>
            )}
            {resultImage ? (
              <img src={resultImage} className="w-full h-full object-contain" alt="Result" />
            ) : (
              <div className="text-slate-600 text-center p-8 italic">Generation result will appear here</div>
            )}
          </div>
          {resultImage && (
             <a 
               href={resultImage} 
               download="lumina-edit.png"
               className="block w-full text-center py-2 text-blue-400 hover:text-blue-300 text-sm font-medium"
             >
               Download Result
             </a>
          )}
        </div>
      </div>
    </EditorLayout>
  );
};
