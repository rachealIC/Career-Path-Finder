import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { getDailyMotivation } from '../../lib/gemini';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState<string>("Loading motivation...");

  useEffect(() => {
    // Fetch AI motivation on mount
    getDailyMotivation().then(setQuote);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Welcome Section */}
      <section>
        <h2 className="text-2xl font-bold text-slate-800">Hello, Explorer 👋</h2>
        <p className="text-slate-500 mt-1">Ready to design your future today?</p>
      </section>

      {/* Daily Insight Card */}
      <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-none">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">Daily Insight</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10h-10V2z"/><path d="m12 2 10 10"/><path d="m12 2-10 10"/></svg>
        </div>
        <p className="text-lg font-medium leading-relaxed mb-4">
          "{quote}"
        </p>
        <div className="flex items-center text-xs text-indigo-200">
          <span>Powered by Gemini 2.5</span>
        </div>
      </Card>

      {/* Action Section */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-slate-800">Your Journey</h3>
        </div>
        
        <div className="grid gap-4">
          <Card onClick={() => navigate('/assessment')} delay={0.1} className="border-l-4 border-l-indigo-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">Start Assessment</h4>
                <p className="text-sm text-slate-500">Discover your strengths and ideal roles</p>
              </div>
              <div className="text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
          </Card>

          <Card onClick={() => navigate('/results')} delay={0.2} className="border-l-4 border-l-teal-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">Saved Paths</h4>
                <p className="text-sm text-slate-500">Review your career roadmaps</p>
              </div>
              <div className="text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-100 p-4 rounded-2xl flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-800">12</span>
          <span className="text-xs text-slate-500 mt-1">Skills Identified</span>
        </div>
        <div className="bg-slate-100 p-4 rounded-2xl flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-800">3</span>
          <span className="text-xs text-slate-500 mt-1">Paths Unlocked</span>
        </div>
      </div>
    </motion.div>
  );
};