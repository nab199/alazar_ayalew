
import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const apiBase = (import.meta.env.VITE_CONTACT_API_URL as string) || 'http://localhost:3001';
        const res = await fetch(`${apiBase}/api/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || 'Server error');
        }

        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } catch (err:any) {
        setErrors({ form: err.message || 'Failed to send. Try again later.' });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-6">
            <h2 className="text-5xl font-black mb-4 tracking-tighter uppercase leading-[0.9]">
              Let's Create <br />
              <span className="text-blue-500 italic">Something Iconic</span>
            </h2>
            <p className="text-slate-400 text-lg">Professional results require professional collaboration. Let's discuss your next production.</p>
          </div>

          <div className="space-y-10">
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 shrink-0 border border-blue-500/10 group-hover:bg-blue-600 transition-all group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/40">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              <div>
                <h4 className="font-black text-slate-500 text-xs uppercase tracking-[0.2em] mb-1">Direct Line</h4>
                <a href="tel:+251943165014" className="text-slate-100 text-xl font-bold hover:text-blue-400 transition-colors">+251 94 316 5014</a>
              </div>
            </div>
            
            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-emerald-600/10 rounded-2xl flex items-center justify-center text-emerald-400 shrink-0 border border-emerald-500/10 group-hover:bg-emerald-600 transition-all group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/40">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <h4 className="font-black text-slate-500 text-xs uppercase tracking-[0.2em] mb-1">Email</h4>
                {/* --- CHANGE EMAIL ADDRESS HERE --- */}
                <a href="mailto:hello@alazarpro.com" className="text-slate-100 text-xl font-bold hover:text-emerald-400 transition-colors">hello@alazarpro.com</a>
              </div>
            </div>

            <div className="flex items-start gap-6 group">
              <div className="w-14 h-14 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-400 shrink-0 border border-purple-500/10 group-hover:bg-purple-600 transition-all group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-500/40">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <h4 className="font-black text-slate-500 text-xs uppercase tracking-[0.2em] mb-1">Location</h4>
                <p className="text-slate-100 text-xl font-bold">Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="glass-effect p-8 md:p-14 rounded-[40px] border border-white/5 shadow-2xl relative">
            {isSubmitted ? (
              <div className="h-full py-20 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h3 className="text-3xl font-black uppercase mb-2">Inquiry Received!</h3>
                  <p className="text-slate-400 text-lg">Alazar will review your vision and reach out within 24 hours.</p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-blue-400 font-bold hover:underline tracking-widest text-sm uppercase"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {errors.form && <p className="text-red-500 text-sm font-bold">{errors.form}</p>}                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">Full Identity</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Abenezer Bekele"
                      className={`w-full bg-slate-900/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-tighter">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">Digital Inbox</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className={`w-full bg-slate-900/50 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium`}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-tighter">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-3">Project Vision & Goals</label>
                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the project context, timeline, and artistic direction..."
                    className={`w-full bg-slate-900/50 border ${errors.message ? 'border-red-500' : 'border-white/10'} rounded-3xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none font-medium leading-relaxed`}
                  />
                  {errors.message && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-tighter">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
                    isSubmitting ? 'bg-slate-800 text-slate-500' : 'bg-white hover:bg-blue-500 text-black hover:text-white shadow-2xl shadow-black active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin" />
                      SECURELY TRANSMITTING...
                    </>
                  ) : 'INITIATE PRODUCTION'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
