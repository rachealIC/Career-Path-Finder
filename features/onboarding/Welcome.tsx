
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

const SLIDES = [
  {
    title: "Your Career Adventure Awaits",
    text: "Discover your perfect career through AI-driven challenges and games."
  },
  {
    title: "Vibe Check",
    text: "Swipe through rapid-fire questions to reveal your work personality."
  },
  {
    title: "Trophy Room",
    text: "Showcase your skills and experience with a tap—no boring forms."
  },
  {
    title: "AI Roadmap",
    text: "Get a personalized step-by-step guide to land your dream job."
  }
];

export const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col relative bg-[#02100b] overflow-hidden min-h-full"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#052e21] to-[#02100b] opacity-50" />

      {/* Abstract Network Mesh SVG */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
         <svg className="w-full h-full" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
           <defs>
             <linearGradient id="welcomeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#00ff88" stopOpacity="0.1" />
               <stop offset="100%" stopColor="#00ff88" stopOpacity="0.6" />
             </linearGradient>
           </defs>
           {/* Nodes */}
           <g fill="#00ff88">
             <circle cx="50" cy="100" r="2" opacity="0.5" />
             <circle cx="350" cy="150" r="2" opacity="0.5" />
             <circle cx="200" cy="250" r="3" />
             <circle cx="80" cy="350" r="2" opacity="0.6" />
             <circle cx="320" cy="320" r="2" opacity="0.6" />
             <circle cx="150" cy="450" r="2.5" />
             <circle cx="250" cy="480" r="2" opacity="0.5" />
           </g>
           {/* Connections */}
           <g stroke="url(#welcomeLineGrad)" strokeWidth="0.5">
             <line x1="50" y1="100" x2="200" y2="250" />
             <line x1="350" y1="150" x2="200" y2="250" />
             <line x1="80" y1="350" x2="200" y2="250" />
             <line x1="320" y1="320" x2="200" y2="250" />
             <line x1="150" y1="450" x2="80" y2="350" />
             <line x1="150" y1="450" x2="200" y2="250" />
             <line x1="250" y1="480" x2="320" y2="320" />
             <line x1="250" y1="480" x2="150" y2="450" />
           </g>
         </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full p-6 pt-20">
        
        {/* Top Visual Area */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full aspect-square max-w-[300px] relative"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/20 to-transparent rounded-full blur-3xl" />
             {/* Rotating Mesh Animation */}
             <motion.svg 
                viewBox="0 0 200 200" 
                className="w-full h-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             >
                <circle cx="100" cy="100" r="90" fill="url(#welcomeGradRadial)" opacity="0.1" />
                <defs>
                  <radialGradient id="welcomeGradRadial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="#00ff88" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#02100b" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Dots connected */}
                {[...Array(12)].map((_, i) => {
                   const angle = (i / 12) * Math.PI * 2;
                   const r = 70;
                   const x = 100 + Math.cos(angle) * r;
                   const y = 100 + Math.sin(angle) * r;
                   return (
                     <g key={i}>
                       <circle cx={x} cy={y} r={2} fill="#00ff88" opacity="0.8" />
                       <line x1="100" y1="100" x2={x} y2={y} stroke="#00ff88" strokeWidth="0.5" strokeOpacity="0.2" />
                     </g>
                   )
                })}
                <circle cx="100" cy="100" r="4" fill="#00ff88" />
             </motion.svg>
          </motion.div>
        </div>

        {/* Bottom Text & Actions */}
        <div className="space-y-8 pb-8 min-h-[280px] flex flex-col justify-end">
          <div className="text-center relative h-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                  {SLIDES[currentSlide].title}
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed px-2">
                  {SLIDES[currentSlide].text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2">
             {SLIDES.map((_, index) => (
               <motion.div 
                 key={index}
                 className={`h-2 rounded-full ${index === currentSlide ? 'bg-[#00ff88]' : 'bg-[#1f4a3a]'}`}
                 animate={{ width: index === currentSlide ? 24 : 8 }}
                 transition={{ duration: 0.3 }}
               />
             ))}
          </div>

          <div className="space-y-4 pt-4">
            <Button fullWidth size="lg" onClick={() => navigate('/auth')}>
              Start Your Journey
            </Button>
            
            <button onClick={() => navigate('/auth')} className="w-full text-center text-[#00ff88] font-medium text-sm hover:underline">
              Already have an account? Sign In
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
