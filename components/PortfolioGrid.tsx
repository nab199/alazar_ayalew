
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Project, PhotoCategory, VideoCategory } from '../types';

const PROJECTS: Project[] = [
  // PHOTOGRAPHY DATA
  { id: 'p1', title: 'Habesha Union', type: 'Photography', category: 'Wedding', imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', description: 'Traditional Ethiopian wedding celebration.' },
  { id: 'p2', title: 'Eternal Bonds', type: 'Photography', category: 'Wedding', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', description: 'Candid moments of joy.' },
  { id: 'p3', title: 'Street Luxe', type: 'Photography', category: 'Modeling', imageUrl: 'https://images.unsplash.com/photo-1529139513065-07b2c2390598?auto=format&fit=crop&q=80&w=800', description: 'Editorial fashion shoot.' },
  { id: 'p4', title: 'AAU Excellence', type: 'Photography', category: 'Graduation', imageUrl: 'https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=800', description: 'Celebrating academic milestones.' },
  { id: 'p5', title: 'Iconic Portrait', type: 'Photography', category: 'Celebrity', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800', description: 'Private session with industry lead.' },

  // VIDEOGRAPHY DATA
  { id: 'v1', title: 'Tech StartUp', type: 'Videography', category: 'Promotion', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', videoUrl: 'promo1.mp4', description: 'Brand storytelling for a local business.' },
  { id: 'v2', title: 'Voices of Omo', type: 'Videography', category: 'Short Film', imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800', videoUrl: 'short1.mp4', description: 'Cinematic documentary on heritage.' },
  { id: 'v3', title: 'The Royal Gala', type: 'Videography', category: 'Wedding', imageUrl: 'https://images.unsplash.com/photo-1465495910483-0d6745778503?auto=format&fit=crop&q=80&w=800', videoUrl: 'wedding_v1.mp4', description: 'Premium wedding cinematography.' },
  { id: 'v4', title: 'Runway Motion', type: 'Videography', category: 'Modeling', imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800', videoUrl: 'model_v1.mp4', description: 'High-fashion motion editorial.' },
];

export const PortfolioGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Photography' | 'Videography'>('Photography');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Swipe logic
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const photoCategories: PhotoCategory[] = ['Wedding', 'Modeling', 'Graduation', 'Celebrity'];
  const videoCategories: VideoCategory[] = ['Promotion', 'Short Film', 'Wedding', 'Modeling'];

  const currentCategories = activeTab === 'Photography' ? photoCategories : videoCategories;

  const getItemsForCategory = useCallback((cat: string) => 
    PROJECTS.filter(p => p.type === activeTab && p.category === cat), [activeTab]);

  const nextSlide = useCallback(() => {
    if (!selectedCategory) return;
    const items = getItemsForCategory(selectedCategory);
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [selectedCategory, getItemsForCategory]);

  const prevSlide = useCallback(() => {
    if (!selectedCategory) return;
    const items = getItemsForCategory(selectedCategory);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [selectedCategory, getItemsForCategory]);

  const openGallery = (cat: string) => {
    setSelectedCategory(cat);
    setActiveIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedCategory(null);
    document.body.style.overflow = 'unset';
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCategory) return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'Escape') closeGallery();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCategory, nextSlide, prevSlide]);

  // Swipe handlers
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  return (
    <div className="px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
        <div className="animate-fade-in">
          <h2 className="text-4xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter uppercase">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Archive</span>
          </h2>
          <p className="text-slate-400 max-w-md text-base md:text-lg font-medium leading-relaxed">
            Classified high-end visual production. Select a medium and category to explore the full collection.
          </p>
        </div>
        
        <div className="flex p-1 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl self-start">
          <button
            onClick={() => setActiveTab('Photography')}
            className={`px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'Photography' ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Photography
          </button>
          <button
            onClick={() => setActiveTab('Videography')}
            className={`px-6 md:px-8 py-2.5 md:py-3 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'Videography' ? 'bg-white text-black shadow-xl' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Videography
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {currentCategories.map((cat, idx) => {
          const items = getItemsForCategory(cat);
          if (items.length === 0) return null;
          const cover = items[0];

          return (
            <div 
              key={cat} 
              onClick={() => openGallery(cat)}
              className="group cursor-pointer space-y-4 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative aspect-[3/4] rounded-[32px] md:rounded-[40px] overflow-hidden border border-white/5 bg-slate-900 shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                <img 
                  src={cover.imageUrl} 
                  alt={cat} 
                  loading="lazy"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                
                <div className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white">
                  {items.length} {items.length === 1 ? 'Asset' : 'Assets'}
                </div>

                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                  <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-1">{cat}</h4>
                  <p className="text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">Explore Category</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedCategory && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-6 lg:p-12">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={closeGallery} />
          
          <div className="relative w-full max-w-7xl h-full flex flex-col items-center justify-center">
            {/* Gallery Header */}
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-30 pointer-events-none">
              <div className="pointer-events-auto flex flex-col items-start gap-1">
                 <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.4em]">{activeTab} // {selectedCategory}</span>
                 <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">{activeIndex + 1} of {getItemsForCategory(selectedCategory).length}</span>
              </div>
              <button 
                onClick={closeGallery}
                className="pointer-events-auto p-3 bg-white/5 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-95"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Cinematic Media Area */}
            <div 
              className="relative w-full h-full flex items-center justify-center group overflow-hidden touch-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Desktop Swipe Navigation Buttons */}
              {getItemsForCategory(selectedCategory).length > 1 && (
                <>
                  <button 
                    onClick={prevSlide}
                    className="hidden md:flex absolute left-8 z-40 p-5 bg-black/20 hover:bg-blue-600 rounded-full text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="hidden md:flex absolute right-8 z-40 p-5 bg-black/20 hover:bg-blue-600 rounded-full text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </>
              )}

              {/* Media Content */}
              <div className="w-full h-full flex items-center justify-center animate-fade-in px-4 md:px-0" key={activeIndex}>
                {activeTab === 'Videography' ? (
                  <div className="relative w-full max-w-5xl aspect-video rounded-2xl md:rounded-[40px] overflow-hidden shadow-3xl bg-slate-900 border border-white/5">
                    <video 
                      ref={videoRef}
                      src={getItemsForCategory(selectedCategory)[activeIndex].videoUrl} 
                      className="w-full h-full object-contain"
                      controls
                      autoPlay
                      playsInline
                    />
                  </div>
                ) : (
                  <img 
                    src={getItemsForCategory(selectedCategory)[activeIndex].imageUrl} 
                    className="max-h-[85vh] max-w-full rounded-2xl md:rounded-[40px] shadow-3xl object-contain bg-slate-900 border border-white/5"
                    alt="Gallery visual"
                  />
                )}
              </div>
            </div>

            {/* Info Overlay (Floating Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20 pointer-events-none">
              <div className="max-w-4xl mx-auto pointer-events-auto bg-black/40 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl translate-y-4 md:translate-y-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-white leading-none">
                      {getItemsForCategory(selectedCategory)[activeIndex].title}
                    </h3>
                    <p className="text-slate-400 font-medium text-sm md:text-lg italic leading-relaxed">
                      "{getItemsForCategory(selectedCategory)[activeIndex].description}"
                    </p>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="flex gap-1.5 self-center">
                    {getItemsForCategory(selectedCategory).map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-1 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-10 bg-blue-500' : 'w-2 bg-white/10'}`} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
