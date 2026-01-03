
import React, { useState, useRef, useEffect } from 'react';
import { chatWithConsultant } from '../services/geminiService';

export const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hello! I'm the Alazar Pro Assistant. Whether you're planning a cinematic music video, a professional photoshoot in Addis, or need high-end color grading, I'm here to help you scope your project." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Prefer server-side AI endpoint if configured (avoid exposing API keys in client bundles)
      const aiApi = (import.meta.env.VITE_AI_API_URL as string) || '';
      if (aiApi) {
        const res = await fetch(`${aiApi}/api/ai-chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMsg })
        });
        if (res.ok) {
          const body = await res.json().catch(() => null);
          setMessages(prev => [...prev, { role: 'model', text: body?.text || 'No response' }]);
        } else {
          setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the AI server." }]);
        }
      } else {
        // Fallback: client-side call using services (note: this exposes API key if used)
        console.warn('VITE_AI_API_URL not set — calling Gemini from the client (not recommended for production).');
        const response = await chatWithConsultant(userMsg, []);
        setMessages(prev => [...prev, { role: 'model', text: response || 'I apologize, something went wrong.' }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="glass-effect rounded-[48px] border border-white/5 overflow-hidden flex flex-col md:flex-row h-[700px] shadow-3xl bg-slate-950/40 relative">
        {/* Abstract background highlight */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] pointer-events-none" />
        
        <div className="w-full md:w-[350px] bg-emerald-500/5 p-12 flex flex-col justify-between border-r border-white/5 relative z-10">
          <div>
            <div className="w-16 h-16 bg-emerald-500 rounded-[24px] mb-8 flex items-center justify-center shadow-xl shadow-emerald-500/20">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
            </div>
            <h3 className="text-3xl font-black mb-6 tracking-tight leading-tight uppercase">AI Strategy <br /><span className="text-emerald-400">Assistant</span></h3>
            <p className="text-slate-400 text-base leading-relaxed font-medium">
              We leverage Gemini to process your creative brief and suggest the most efficient production workflow for your specific vision.
            </p>
          </div>
          <div className="pt-8">
            <div className="text-[10px] text-emerald-400/50 uppercase tracking-[0.4em] font-black mb-4">Production Intelligence</div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-slate-800" />
              <div className="w-2 h-2 rounded-full bg-slate-800" />
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col relative z-10">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] px-7 py-4 rounded-[28px] text-base leading-relaxed font-medium shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-none' 
                    : 'bg-slate-900/80 text-slate-200 rounded-tl-none border border-white/10 backdrop-blur-md'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-900/80 p-5 rounded-[24px] rounded-tl-none flex gap-1.5 border border-white/5">
                  <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
          
          <div className="p-8 border-t border-white/5">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Brief us on your next visual project..."
                className="w-full bg-slate-900/40 border border-white/10 rounded-full px-8 py-5 pr-20 text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 placeholder:text-slate-600 group-hover:border-white/20"
              />
              <button 
                onClick={handleSend}
                className="absolute right-3 top-3 w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-emerald-500/20"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
            <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mt-6">Powered by Google Gemini 3 Technology</p>
          </div>
        </div>
      </div>
    </div>
  );
};
