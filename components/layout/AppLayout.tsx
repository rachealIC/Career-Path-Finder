import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show nav in specific authenticated dashboard views if we had them
  // For this linear flow (Welcome -> Auth -> Assessment -> Results), we essentially have no persistent bottom nav
  // except maybe on a "Home" dashboard which is not the focus of the screenshots.
  const showNav = ['/dashboard'].includes(location.pathname);
  
  // Background handling for full screen visuals
  const isFullScreen = ['/', '/auth', '/results'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#02100b] flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative text-slate-50">
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
        {children}
      </main>

      {/* Bottom Navigation - Hidden for this flow based on screenshots */}
      {showNav && (
        <nav className="sticky bottom-0 z-30 bg-[#0a2518]/90 backdrop-blur-lg border-t border-white/5 pb-safe">
          <div className="flex justify-around items-center h-16">
             <button onClick={() => navigate('/dashboard')} className="text-[#00ff88] flex flex-col items-center gap-1">
                <span className="text-xs">Home</span>
             </button>
          </div>
        </nav>
      )}
    </div>
  );
};