import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { analyzeCareerPath } from '../../lib/gemini';
import { CareerSuggestion, LoadingState, AssessmentProfile } from '../../types';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const CareerResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const shouldAnalyze = queryParams.get('analyze') === 'true';
  
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [results, setResults] = useState<CareerSuggestion[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const storedProfile = localStorage.getItem('career_assessment_profile');
      
      if (shouldAnalyze && storedProfile) {
        setStatus(LoadingState.LOADING);
        try {
          const profile: AssessmentProfile = JSON.parse(storedProfile);
          const suggestions = await analyzeCareerPath(profile);
          setResults(suggestions);
          setStatus(LoadingState.SUCCESS);
          // Remove analyze param safely
          navigate('/results', { replace: true });
        } catch (error) {
          console.error(error);
          setStatus(LoadingState.ERROR);
        }
      } else {
        // Fallback Mock Data if no analysis was run (or for dev preview)
        if (results.length === 0) {
            const mockData: CareerSuggestion[] = [
                {
                    title: "UX/UI Designer",
                    matchScore: 92,
                    description: "Craft intuitive and beautiful digital experiences for users across web and mobile platforms.",
                    salaryRange: "$85k - $130k",
                    growthOutlook: "High Demand",
                    fitReasons: [
                        { reason: "Visual Eye", description: "Matches your interest in fonts, colors, and layout." },
                        { reason: "Team Player", description: "Aligns with your preference for brainstorming sessions." }
                    ]
                },
                {
                    title: "Software Engineer",
                    matchScore: 88,
                    description: "Design, develop, and maintain software systems that power our digital world.",
                    salaryRange: "$100k - $160k",
                    growthOutlook: "Very High",
                    fitReasons: [
                        { reason: "Logical Thinker", description: "Your love for logic puzzles makes you a natural problem solver." },
                        { reason: "Tech Curious", description: "You weren't scared when looking at code." }
                    ]
                }
            ];
            
            if (status === LoadingState.IDLE) {
                 setResults(mockData);
                 setStatus(LoadingState.SUCCESS);
            }
        }
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAnalyze]);

  if (status === LoadingState.LOADING) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-6 bg-[#02100b]">
        <div className="relative w-24 h-24 mb-8">
           <motion.div 
             className="absolute inset-0 border-4 border-[#0a2518] rounded-full"
           />
           <motion.div 
             className="absolute inset-0 border-4 border-[#00ff88] rounded-full border-t-transparent"
             animate={{ rotate: 360 }}
             transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
           />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Analyzing your profile</h2>
        <p className="text-slate-400">Processing Vibe Check & Experience...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="space-y-6 p-6 bg-[#02100b] min-h-screen"
    >
      {/* Header */}
      <header className="flex items-center gap-4">
        <button onClick={() => navigate('/assessment')} className="text-slate-400">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-xl font-bold text-white">Your Top Career Matches</h2>
      </header>

      {/* Notification Banner */}
      <div className="mb-6">
          <p className="text-sm text-slate-400 mb-2">You've unlocked {results.length} new paths!</p>
          <div className="h-1.5 bg-[#0a2518] rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} className="h-full bg-[#00ff88]" />
          </div>
      </div>

      <div className="grid gap-6 pb-8">
        {results.map((career, index) => (
          <Card key={index} delay={index * 0.1} className="relative overflow-hidden !p-0 border-[#1f4a3a]">
            
            {/* Decorative Header Graphic */}
            <div className={`h-32 w-full relative overflow-hidden ${index === 0 ? 'bg-[#1f4a3a]' : 'bg-[#0d2019]'}`}>
                {/* Abstract shapes */}
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-[#00ff88] opacity-10 blur-2xl"></div>
                <div className="absolute left-10 top-10 w-20 h-20 rounded-full bg-indigo-500 opacity-10 blur-xl"></div>
                
                <div className="absolute top-4 right-4 bg-[#0a2518]/80 backdrop-blur-md border border-[#00ff88]/20 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="#00ff88" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                   {career.matchScore}% Match
                </div>
            </div>

            <div className="p-6 -mt-4 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">{career.title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                    {career.description}
                </p>

                <div className="space-y-4 mb-8">
                    <p className="text-xs font-semibold text-slate-500 uppercase">Why It's a Great Fit:</p>
                    
                    {career.fitReasons?.map((fit, idx) => (
                        <div key={idx} className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-[#0f2e22] flex-shrink-0 flex items-center justify-center text-[#00ff88]">
                                {idx === 0 ? (
                                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="M10 12V2h4v10"/></svg>
                                ) : (
                                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>
                                )}
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">{fit.reason}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{fit.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Button 
                    fullWidth 
                    variant="neon" 
                    onClick={() => navigate('/roadmap', { state: { career } })}
                >
                    Explore Roadmap
                </Button>
            </div>
          </Card>
        ))}
        
        <div className="text-center pt-4">
            <button className="text-[#00ff88] text-sm font-medium hover:underline">See More Options</button>
        </div>
      </div>
    </motion.div>
  );
};