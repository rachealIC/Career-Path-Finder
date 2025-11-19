import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

interface RoadmapItem {
  id: string;
  title: string;
  status: 'completed' | 'current' | 'locked';
}

interface RoadmapPhase {
  month: string;
  title: string;
  items: RoadmapItem[];
}

export const CareerRoadmap: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const careerTitle = location.state?.career?.title || "AI Product Manager";

  const [emailEnabled, setEmailEnabled] = useState(true);

  // Mock Data matching the wireframe
  const phases: RoadmapPhase[] = [
    {
      month: "Month 1",
      title: "Foundational Skills",
      items: [
        { id: "1", title: "Learn Python Basics", status: "completed" },
        { id: "2", title: "Master SQL Queries", status: "completed" },
        { id: "3", title: "Complete a Data Visualization Course", status: "locked" }
      ]
    },
    {
      month: "Month 2",
      title: "Core Competencies",
      items: [
        { id: "4", title: "Build a Portfolio Project", status: "locked" },
        { id: "5", title: "Network with 5 Professionals", status: "locked" }
      ]
    }
  ];

  const jobs = [
    {
      company: "Google",
      role: "AI Product Manager",
      logo: "G",
      color: "bg-blue-600",
      tags: ["Machine Learning", "User Research"]
    },
    {
      company: "Microsoft",
      role: "Product Manager II",
      logo: "M",
      color: "bg-sky-500",
      tags: ["Cloud", "Strategy"]
    }
  ];

  const renderStatusIcon = (status: string) => {
    if (status === 'completed') {
      return (
        <div className="w-6 h-6 rounded-full bg-[#00ff88] flex items-center justify-center shadow-[0_0_10px_rgba(0,255,136,0.4)] relative z-10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#02100b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      );
    }
    return (
      <div className="w-6 h-6 rounded-full bg-[#1f4a3a] border-2 border-[#2d5e4d] flex items-center justify-center relative z-10">
        <div className="w-2 h-2 rounded-full bg-[#2d5e4d]" />
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-[#02100b] pb-24"
    >
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#02100b]/90 backdrop-blur-md p-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-[#0a2518] flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
          <h1 className="text-xl font-bold text-white truncate">{careerTitle}</h1>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white font-medium">Overall Progress</span>
            <span className="text-[#00ff88] font-bold">25%</span>
          </div>
          <div className="h-2 bg-[#0a2518] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "25%" }} 
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.5)]" 
            />
          </div>
        </div>
      </header>

      <div className="p-6 space-y-8 overflow-y-auto">
        
        {/* Timeline */}
        <div className="space-y-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-[11px] top-2 bottom-0 w-0.5 bg-[#0a2518]" />

          {phases.map((phase, pIndex) => (
            <div key={pIndex} className="relative">
              <h3 className="text-white font-bold text-lg mb-4 ml-10">
                {phase.month}: <span className="text-slate-400 font-normal">{phase.title}</span>
              </h3>
              
              <div className="space-y-6">
                {phase.items.map((item, iIndex) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * iIndex + (pIndex * 0.2) }}
                    className="flex gap-4 relative"
                  >
                    {/* Status Icon */}
                    <div className="flex-shrink-0">
                      {renderStatusIcon(item.status)}
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-1 pt-0.5 ${item.status === 'locked' ? 'opacity-50' : 'opacity-100'}`}>
                      <h4 className="text-slate-200 font-medium leading-snug">{item.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Jobs Section */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Top Companies Hiring</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
            {jobs.map((job, idx) => (
              <div key={idx} className="min-w-[280px] bg-[#0a2518] rounded-2xl p-5 border border-[#1f4a3a]">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-full ${job.color} flex items-center justify-center text-white font-bold`}>
                    {job.logo}
                  </div>
                  <span className="text-[10px] bg-[#0f2e22] text-slate-400 px-2 py-1 rounded-md border border-[#1f4a3a]">Full Time</span>
                </div>
                
                <h4 className="text-white font-bold text-lg">{job.company}</h4>
                <p className="text-slate-400 text-sm mb-4">{job.role}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-[#00ff88] bg-[#00ff88]/10 px-2 py-1 rounded-full border border-[#00ff88]/20">
                      {tag}
                    </span>
                  ))}
                </div>

                <Button fullWidth size="sm" variant="neon">View Job</Button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3">
           <Button fullWidth variant="secondary" className="justify-center gap-2">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
             Download Roadmap (PDF)
           </Button>
           
           <div 
             className="bg-[#0a2518] rounded-xl p-4 flex items-center justify-between border border-[#1f4a3a] cursor-pointer"
             onClick={() => setEmailEnabled(!emailEnabled)}
           >
              <span className="text-white font-medium text-sm">Email Notifications</span>
              <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${emailEnabled ? 'bg-[#00ff88] text-[#02100b]' : 'bg-[#0f2e22] text-transparent border border-[#1f4a3a]'}`}>
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Floating Button */}
      <div className="fixed bottom-6 left-6 right-6">
        <Button 
          fullWidth 
          size="lg" 
          variant="neon" 
          className="shadow-[0_0_30px_rgba(0,255,136,0.3)]"
          onClick={() => navigate('/auth')}
        >
          Create an Account to Save Progress
        </Button>
      </div>
    </motion.div>
  );
};
