
import React from 'react';

interface EditorLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export const EditorLayout: React.FC<EditorLayoutProps> = ({ title, description, children, sidebar }) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] overflow-hidden">
      {/* Sidebar / Controls */}
      <aside className="w-full lg:w-96 glass-effect p-6 overflow-y-auto lg:h-[calc(100vh-64px)] sticky top-0 border-r border-white/5">
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{title}</h2>
          <p className="text-slate-400 text-sm mt-2">{description}</p>
        </div>
        {sidebar}
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 bg-slate-950 p-6 flex flex-col items-center justify-center overflow-y-auto relative">
        <div className="w-full max-w-4xl space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
};
