
import React from 'react';

export const Testimonials: React.FC = () => {
  // These represent the 3 original videos you provided.
  // Rename your files to testimonial1.mp4, etc. or update these strings to match your file names.
  const testimonialVideos = [
    {
      id: 'v1',
      src: 'testimonial1.mp4',
      name: 'Featured Client 01',
      title: 'Cinematic Collaboration'
    },
    {
      id: 'v2',
      src: 'testimonial2.mp4',
      name: 'Featured Client 02',
      title: 'Studio Session Impact'
    },
    {
      id: 'v3',
      src: 'testimonial3.mp4',
      name: 'Featured Client 03',
      title: 'Visual Identity Project'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <div className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6 border border-blue-500/20">
          Client Impact
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase">
          Industry <span className="text-slate-500 italic">Voices</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
          The following sequences showcase our original high-fidelity production process and client testimonials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonialVideos.map((video) => (
          <div key={video.id} className="group relative flex flex-col">
            <div className="relative aspect-[9/16] rounded-[48px] overflow-hidden glass-effect border border-white/10 shadow-3xl bg-slate-900 group-hover:scale-[1.02] transition-transform duration-700">
              <video
                src={video.src}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                controls
                playsInline
                loop
                muted={false}
              />
              
              {/* Premium Overlay Badge */}
              <div className="absolute top-8 left-8">
                <div className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-white shadow-2xl">
                  Original Asset
                </div>
              </div>

              {/* Bottom Info Gradient */}
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Production Archive</p>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter">{video.name}</h4>
                <p className="text-slate-400 text-sm font-medium">{video.title}</p>
              </div>
            </div>
            
            <div className="mt-6 px-4">
              <h4 className="text-lg font-black uppercase tracking-tighter text-slate-100 group-hover:text-blue-400 transition-colors">{video.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Verified Collaboration</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 p-16 glass-effect rounded-[60px] border border-white/5 text-center relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative z-10">
          <h3 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Ready to be the next success story?</h3>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto text-lg font-medium">Join our roster of elite brands and redefine your visual legacy with Alazar Pro.</p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 uppercase tracking-widest text-xs shadow-2xl shadow-white/5"
          >
            Start Your Production
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
};
