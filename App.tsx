
import React from 'react';
import { PortfolioGrid } from './components/PortfolioGrid';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';

const App: React.FC = () => {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Work', href: '#work' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLetsChat = () => {
    window.open('https://t.me/alazarteg05', '_blank');
  };

  const socialLinks = [
    { name: 'Telegram', url: 'https://t.me/alazarteg05', color: 'hover:text-blue-400', icon: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/> },
    { name: 'Instagram', url: 'https://instagram.com/alazarpro', color: 'hover:text-pink-400', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.063 1.366-.333 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.063-2.633-.333-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> },
    { name: 'TikTok', url: 'https://tiktok.com/@alazarpro', color: 'hover:text-white', icon: <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 2.54 3.35 2.14 1.19-.16 2.15-1.21 2.26-2.4.03-4.28-.01-8.56.02-12.84z"/> },
    { name: 'YouTube', url: 'https://www.youtube.com/@alazarproethiopian9545', color: 'hover:text-red-500', icon: <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/> }
  ];

  const profilePhoto = "/photo_2024-08-11_21-23-48.jpg"; // Put your photo file in the project's `public/` folder (public/photo_2024-08-11_21-23-48.jpg)

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 font-sans">
      {/* Navigation */}
      <nav className="h-20 border-b border-white/5 bg-slate-950/70 backdrop-blur-2xl sticky top-0 z-[100] px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-emerald-500 rounded-xl shadow-xl shadow-blue-500/20 rotate-3 flex items-center justify-center font-black text-white italic">A</div>
          <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic">Alazar Pro</h1>
        </div>

        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-bold tracking-widest uppercase text-slate-400 hover:text-white transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
          <button 
            onClick={handleLetsChat}
            className="px-8 py-2.5 bg-white text-black text-xs font-black rounded-full hover:bg-blue-500 hover:text-white transition-all duration-500 shadow-lg"
          >
            LET'S CHAT
          </button>
        </div>
        
        {/* Mobile Shortcut */}
        <button 
          onClick={handleLetsChat}
          className="md:hidden p-3 bg-white text-black rounded-full shadow-lg"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>
        </button>
      </nav>

      <main className="relative z-10">
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-40 scroll-mt-20">
          <div className="absolute inset-0 z-[-1] overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[160px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 blur-[160px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="space-y-12 max-w-6xl">
            <div className="flex flex-col items-center gap-10">
              {/* Profile Image with Cinematic Effects (responsive sources, fallback, preload) */}
              <div className="relative group animate-fade-in">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white/5 overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.05] hover:rotate-2">
                  <picture>
                    <source srcSet="/photo_2024-08-11_21-23-48.avif 1x, /photo_2024-08-11_21-23-48@2x.avif 2x" type="image/avif" />
                    <source srcSet="/photo_2024-08-11_21-23-48.webp 1x, /photo_2024-08-11_21-23-48@2x.webp 2x" type="image/webp" />
                    <img 
                      src={profilePhoto}
                      alt="Alazar Ayalew" 
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </picture>
                </div>

                {/* Director's Photos placeholder */}
                <div className="w-full mt-6 flex flex-col items-center">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-3">Director's Photos</h4>
                  <div className="flex gap-4 items-center">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border border-white/5 bg-slate-900 shadow-lg">
                        <img src={profilePhoto} alt={`Photo ${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <span className="inline-block px-5 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-xs font-black uppercase tracking-[0.4em] animate-fade-in">
                  Visual Architect & Director
                </span>
                <h2 className="text-7xl md:text-[11rem] font-black tracking-tighter leading-[0.8] uppercase select-none animate-fade-in">
                  Alazar <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-slate-700">Ayalew</span>
                </h2>
                <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed mt-6 italic">
                  "Capturing life in its rawest, most cinematic form."
                </p>
              </div>
            </div>

            <div className="pt-8 space-y-8">
              <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-500">Connect with the director</h3>
              <div className="flex flex-wrap justify-center gap-10 md:gap-20">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`flex flex-col items-center gap-4 transition-all duration-500 group text-slate-500 ${social.color}`}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500 rounded-full" />
                      <svg className="w-14 h-14 md:w-20 md:h-20 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2" fill="currentColor" viewBox="0 0 24 24">
                        {social.icon}
                      </svg>
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100 transition-all">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 justify-center pt-12">
              <a 
                href="#work"
                className="px-12 py-6 bg-white text-black font-black rounded-2xl hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 shadow-2xl shadow-blue-500/10"
              >
                EXPLORE WORK
              </a>
              <a 
                href="#testimonials"
                className="px-12 py-6 glass-effect text-white font-black rounded-2xl border border-white/10 hover:bg-white/5 transition-all"
              >
                CLIENT VOICES
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4 opacity-30 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] rotate-90 origin-left ml-4 text-white">Director's Cut</span>
            <div className="w-[2px] h-16 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        <section id="work" className="py-32 bg-slate-950/20 backdrop-blur-3xl border-y border-white/5 scroll-mt-20">
          <PortfolioGrid />
        </section>

        <section id="testimonials" className="py-32 scroll-mt-20 border-b border-white/5">
          <Testimonials />
        </section>

        <section id="contact" className="py-32 bg-gradient-to-b from-transparent to-blue-900/10 scroll-mt-20">
          <ContactSection />
        </section>
      </main>

      <footer className="py-32 border-t border-white/5 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20 items-start">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center font-black italic text-white text-2xl shadow-xl shadow-blue-600/20">A</div>
              <span className="font-black tracking-tighter uppercase italic text-3xl">Alazar Pro</span>
            </div>
            <p className="text-slate-500 text-lg leading-relaxed font-medium">
              High-end visual production studio based in Addis Ababa. Redefining the cinematic landscape of East Africa.
            </p>
          </div>

          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">Navigation</h4>
            <div className="grid grid-cols-2 gap-4">
              {navLinks.map(link => (
                <a key={link.label} href={link.href} className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">{link.label}</a>
              ))}
              <a href="https://t.me/alazarteg05" target="_blank" className="text-slate-400 hover:text-white transition-colors font-bold text-sm uppercase tracking-widest">Telegram</a>
            </div>
          </div>

          <div className="space-y-10 text-left md:text-right flex flex-col md:items-end">
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">Direct Contact</h4>
              <a href="tel:+251943165014" className="text-3xl md:text-4xl font-black text-white hover:text-blue-400 transition-colors block tracking-tighter">
                +251 94 316 5014
              </a>
              <a href="mailto:hello@alazarpro.com" className="text-slate-400 hover:text-white transition-colors text-lg font-bold">
                hello@alazarpro.com
              </a>
            </div>
            <p className="text-slate-500 text-[11px] leading-loose uppercase tracking-widest opacity-60">
              All rights reserved © 2025 ALAZAR AYALEW. <br />
              Crafted for Excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
