
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ASSESSMENT_QUESTIONS } from './questions';
import { TrophyRoom } from './TrophyRoom';
import { QuestionResponse, ExperienceLevel, AssessmentProfile } from '../../types';

export const AssessmentFlow: React.FC = () => {
  const navigate = useNavigate();
  
  // State for Phase 1 (Vibe Check)
  const [phase, setPhase] = useState<'vibe' | 'trophy'>('vibe');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vibeResponses, setVibeResponses] = useState<QuestionResponse[]>([]);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const question = ASSESSMENT_QUESTIONS[currentIndex];
  const progress = ((currentIndex) / ASSESSMENT_QUESTIONS.length) * 100;

  const handleVote = (vote: 'agree' | 'disagree') => {
    setDirection(vote === 'agree' ? 'right' : 'left');
    
    setTimeout(() => {
        const newResponse: QuestionResponse = {
            questionId: question.id,
            questionText: question.text,
            category: question.category,
            answer: vote 
        };

        const newResponses = [...vibeResponses, newResponse];
        setVibeResponses(newResponses);
        
        if (currentIndex < ASSESSMENT_QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setDirection(null);
        } else {
            // Phase 1 Complete -> Go to Trophy Room
            setPhase('trophy');
        }
    }, 200);
  };

  const handleBack = () => {
    if (currentIndex > 0) {
        // Go back to previous question and remove the last response so it can be re-answered
        setCurrentIndex(prev => prev - 1);
        setVibeResponses(prev => {
            const updated = [...prev];
            updated.pop();
            return updated;
        });
        setDirection(null);
    } else {
        // If on first question, navigate back to previous page (Auth/Welcome)
        navigate(-1);
    }
  };

  const handleTrophyComplete = (data: { 
      experience: ExperienceLevel; 
      educationMajor?: string;
      certifications: string[];
      previousIndustry?: string;
  }) => {
      const fullProfile: AssessmentProfile = {
          vibeResponses,
          experienceLevel: data.experience,
          educationMajor: data.educationMajor,
          certifications: data.certifications,
          previousIndustry: data.previousIndustry
      };

      localStorage.setItem('career_assessment_profile', JSON.stringify(fullProfile));
      navigate('/results?analyze=true');
  };

  // Icon mapping helper for Vibe Check
  const renderIcon = (name: string) => {
      const strokeColor = "#00ff88";
      const strokeWidth = 1.5;
      const size = 48;

      const commonProps = {
          width: size,
          height: size,
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeLinecap: "round" as "round",
          strokeLinejoin: "round" as "round"
      };

      switch(name) {
          case 'hands': // Physicality
            return <svg {...commonProps}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>;
          case 'heart': // Empathy
            return <svg {...commonProps}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
          case 'bullhorn': // Persuasion
             return <svg {...commonProps}><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>;
          case 'palette': // Creativity
            return <svg {...commonProps}><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
          case 'globe': // Environment/Travel
            return <svg {...commonProps}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
          case 'shield': // Risk/Stability
            return <svg {...commonProps}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
          case 'chart': // Data
            return <svg {...commonProps}><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
          case 'wrench': // Problem Solving
            return <svg {...commonProps}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>;
          default:
            return <svg {...commonProps}><circle cx="12" cy="12" r="10"/></svg>;
      }
  }

  if (phase === 'trophy') {
      return <TrophyRoom onComplete={handleTrophyComplete} />;
  }

  return (
    <div className="flex flex-col h-full p-6 bg-[#02100b]">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
            <h2 className="text-sm font-medium text-slate-400">Vibe Check</h2>
            <div className="w-32 h-1.5 bg-[#0a2518] rounded-full mt-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-[#00ff88]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
            </div>
        </div>
        <span className="text-xs font-bold text-[#00ff88]">
            {currentIndex + 1}/{ASSESSMENT_QUESTIONS.length}
        </span>
      </div>

      {/* Card Container */}
      <div className="flex-1 flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ 
                    opacity: 0, 
                    x: direction === 'right' ? 200 : -200, 
                    rotate: direction === 'right' ? 20 : -20 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-[#0a2518] border border-[#1f4a3a] rounded-[32px] p-8 h-[440px] flex flex-col items-center justify-center text-center shadow-2xl relative z-10"
            >
                <div className="w-24 h-24 bg-[#0f2e22] rounded-full flex items-center justify-center mb-8 border border-[#1f4a3a]">
                    {renderIcon(question.icon)}
                </div>

                <h3 className="text-xs font-bold text-[#00ff88] uppercase tracking-widest mb-4">
                    {question.category}
                </h3>

                <p className="text-2xl font-bold text-white leading-snug">
                    "{question.text}"
                </p>
                
                <div className="mt-8 flex gap-2 text-xs font-medium text-slate-500 opacity-50">
                    <span>SWIPE LEFT (NO)</span>
                    <span>•</span>
                    <span>SWIPE RIGHT (YES)</span>
                </div>
            </motion.div>
        </AnimatePresence>

        {/* Stack effect background cards */}
        <div className="absolute inset-0 flex items-center justify-center z-0">
           <div className="w-full h-[440px] bg-[#0a2518]/50 rounded-[32px] scale-95 translate-y-4 border border-[#1f4a3a]/50"></div>
        </div>
      </div>

      {/* Controls */}
      <div className="h-32 flex items-center justify-center gap-8">
         <button 
           onClick={handleBack} 
           className="w-14 h-14 rounded-full bg-[#0f2e22] flex items-center justify-center text-slate-400 hover:bg-[#1f4a3a] transition-colors border border-[#1f4a3a]"
         >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
         </button>

         <button 
           onClick={() => handleVote('disagree')}
           className="w-20 h-20 rounded-full bg-[#1a0f0f] border border-red-900/30 flex items-center justify-center text-red-500 hover:bg-red-900/20 transition-colors shadow-lg active:scale-90"
         >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
         </button>

         <button 
           onClick={() => handleVote('agree')}
           className="w-20 h-20 rounded-full bg-[#0f2e22] border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88] hover:bg-[#00ff88]/10 transition-colors shadow-[0_0_20px_rgba(0,255,136,0.2)] active:scale-90"
         >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
         </button>
      </div>

    </div>
  );
};
