
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { ExperienceLevel } from '../../types';

interface TrophyRoomProps {
  onComplete: (data: { 
    experience: ExperienceLevel; 
    educationMajor?: string;
    certifications: string[];
    previousIndustry?: string;
  }) => void;
}

const EXPERIENCE_LEVELS: { id: ExperienceLevel; label: string; sub: string; icon: string }[] = [
  { id: 'Rookie', label: 'Rookie', sub: 'Student / No Exp', icon: '🌱' },
  { id: 'Explorer', label: 'Explorer', sub: 'Career Switcher', icon: '🧭' },
  { id: 'Pro', label: 'Pro', sub: '3-5 Years Exp', icon: '⚡' },
  { id: 'Veteran', label: 'Veteran', sub: '5+ Years Exp', icon: '🏆' },
];

const MAJORS = [
  "Computer Science / IT",
  "Engineering (Non-IT)",
  "Business / Finance / Econ",
  "Arts / Humanities / Design",
  "Health / Science",
  "Other"
];

const INDUSTRIES = [
  "Retail / Customer Service",
  "Healthcare",
  "Finance / Banking",
  "Education",
  "Construction / Manual",
  "Tech (Already in industry)",
  "Hospitality / Food"
];

const CERT_PROVIDERS = [
  "Google Career Certs (Data, UX, IT)",
  "AWS / Azure / Cloud",
  "PMP / Agile / Scrum",
  "CPA / CFA (Finance)",
  "Salesforce / Hubspot",
  "Design / Adobe Creative",
  "CompTIA / Security+"
];

// Modal defined OUTSIDE the main component to prevent re-renders losing input focus
const Modal = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) => (
    <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
    >
        <motion.div 
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0a2518] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-[#1f4a3a] p-6 shadow-2xl max-h-[85vh] overflow-y-auto flex flex-col"
        >
            <div className="flex justify-between items-center mb-6 flex-shrink-0">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <button onClick={onClose} className="p-2 bg-[#0f2e22] rounded-full text-slate-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {children}
            </div>

            <div className="mt-6 flex-shrink-0">
                <Button fullWidth onClick={onClose}>Done</Button>
            </div>
        </motion.div>
    </motion.div>
);

export const TrophyRoom: React.FC<TrophyRoomProps> = ({ onComplete }) => {
  // Core Profile Data
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | null>(null);
  const [educationMajor, setEducationMajor] = useState<string | undefined>(undefined);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [previousIndustry, setPreviousIndustry] = useState<string | undefined>(undefined);

  // Custom Input State
  const [customCertInput, setCustomCertInput] = useState('');

  // Modal State
  const [activeModal, setActiveModal] = useState<'education' | 'certs' | 'industry' | null>(null);

  const handleSubmit = () => {
    if (experienceLevel) {
      onComplete({
        experience: experienceLevel,
        educationMajor,
        certifications,
        previousIndustry
      });
    }
  };

  const toggleCert = (cert: string) => {
    if (certifications.includes(cert)) {
      setCertifications(prev => prev.filter(c => c !== cert));
    } else {
      setCertifications(prev => [...prev, cert]);
    }
  };

  const addCustomCert = () => {
    const trimmed = customCertInput.trim();
    if (trimmed) {
       if (!certifications.includes(trimmed)) {
         setCertifications(prev => [...prev, trimmed]);
       }
       setCustomCertInput('');
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col h-full p-6 bg-[#02100b] overflow-y-auto no-scrollbar relative z-10"
      >
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-white">Trophy Room</h2>
          <p className="text-slate-400 text-sm">Select your character loadout.</p>
        </header>

        <div className="space-y-8 pb-24">
          {/* Section 1: Experience Level (Always Visible) */}
          <section>
            <h3 className="text-[#00ff88] font-bold uppercase text-xs tracking-widest mb-4">
              Experience Level
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {EXPERIENCE_LEVELS.map((level) => (
                <motion.button
                  key={level.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setExperienceLevel(level.id)}
                  className={`
                    relative p-4 rounded-2xl text-left border-2 transition-all
                    ${experienceLevel === level.id 
                      ? 'bg-[#0a2518] border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.3)]' 
                      : 'bg-[#0a2518]/50 border-transparent hover:bg-[#0a2518]'
                    }
                  `}
                >
                  <div className="text-2xl mb-2">{level.icon}</div>
                  <div className="font-bold text-white text-sm">{level.label}</div>
                  <div className="text-[10px] text-slate-400">{level.sub}</div>
                </motion.button>
              ))}
            </div>
          </section>

          {/* Section 2: Badges Grid */}
          <section>
            <h3 className="text-[#00ff88] font-bold uppercase text-xs tracking-widest mb-4">
              Achievements & Background
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {/* Education Badge */}
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('education')}
                    className={`flex items-center p-4 rounded-2xl border border-[#1f4a3a] bg-[#0a2518] hover:bg-[#0f2e22] transition-all ${educationMajor ? 'border-[#00ff88]/50 bg-[#00ff88]/5' : ''}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 ${educationMajor ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#0f2e22] text-slate-500'}`}>
                        🎓
                    </div>
                    <div className="text-left flex-1">
                        <h4 className="font-bold text-white">Education</h4>
                        <p className="text-xs text-slate-400">{educationMajor || "Tap to add degree/major"}</p>
                    </div>
                    {educationMajor && <div className="w-2 h-2 bg-[#00ff88] rounded-full" />}
                </motion.button>

                {/* Certifications Badge */}
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('certs')}
                    className={`flex items-center p-4 rounded-2xl border border-[#1f4a3a] bg-[#0a2518] hover:bg-[#0f2e22] transition-all ${certifications.length > 0 ? 'border-[#00ff88]/50 bg-[#00ff88]/5' : ''}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 ${certifications.length > 0 ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#0f2e22] text-slate-500'}`}>
                        📜
                    </div>
                    <div className="text-left flex-1">
                        <h4 className="font-bold text-white">Certifications</h4>
                        <p className="text-xs text-slate-400">{certifications.length > 0 ? `${certifications.length} selected` : "Tap to add certs"}</p>
                    </div>
                    {certifications.length > 0 && <div className="w-2 h-2 bg-[#00ff88] rounded-full" />}
                </motion.button>

                {/* Work History Badge */}
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('industry')}
                    className={`flex items-center p-4 rounded-2xl border border-[#1f4a3a] bg-[#0a2518] hover:bg-[#0f2e22] transition-all ${previousIndustry ? 'border-[#00ff88]/50 bg-[#00ff88]/5' : ''}`}
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 ${previousIndustry ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-[#0f2e22] text-slate-500'}`}>
                        💼
                    </div>
                    <div className="text-left flex-1">
                        <h4 className="font-bold text-white">Work History</h4>
                        <p className="text-xs text-slate-400">{previousIndustry || "Tap to add previous industry"}</p>
                    </div>
                    {previousIndustry && <div className="w-2 h-2 bg-[#00ff88] rounded-full" />}
                </motion.button>
            </div>
          </section>
        </div>

        {/* Footer Action */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#02100b] via-[#02100b] to-transparent z-20">
          <Button 
            fullWidth 
            size="lg" 
            disabled={!experienceLevel}
            onClick={handleSubmit}
            className="shadow-neon"
          >
            Reveal My Path
          </Button>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'education' && (
            <Modal title="What is your major field of study?" onClose={() => setActiveModal(null)}>
                <div className="space-y-2">
                    {MAJORS.map((major) => (
                        <button
                            key={major}
                            onClick={() => setEducationMajor(major)}
                            className={`w-full p-3 rounded-xl text-left text-sm font-medium transition-colors ${educationMajor === major ? 'bg-[#00ff88] text-[#02100b]' : 'bg-[#0f2e22] text-slate-300 hover:bg-[#1f4a3a]'}`}
                        >
                            {major}
                        </button>
                    ))}
                </div>
            </Modal>
        )}

        {activeModal === 'certs' && (
            <Modal title="Which certifications do you have?" onClose={() => setActiveModal(null)}>
                 <div className="space-y-2">
                    {/* Standard List */}
                    {CERT_PROVIDERS.map((cert) => (
                        <button
                            key={cert}
                            onClick={() => toggleCert(cert)}
                            className={`w-full p-3 rounded-xl text-left text-sm font-medium transition-colors flex justify-between items-center ${certifications.includes(cert) ? 'bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]' : 'bg-[#0f2e22] text-slate-300 border border-transparent hover:bg-[#1f4a3a]'}`}
                        >
                            {cert}
                            {certifications.includes(cert) && <span>✓</span>}
                        </button>
                    ))}

                    {/* Custom Added List */}
                    {certifications.filter(c => !CERT_PROVIDERS.includes(c)).length > 0 && (
                      <>
                        <div className="h-px bg-[#1f4a3a] my-4" />
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Custom Added</div>
                        {certifications.filter(c => !CERT_PROVIDERS.includes(c)).map((cert) => (
                            <button
                                key={cert}
                                onClick={() => toggleCert(cert)}
                                className="w-full p-3 rounded-xl text-left text-sm font-medium transition-colors flex justify-between items-center bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]"
                            >
                                {cert}
                                <span>✕</span>
                            </button>
                        ))}
                      </>
                    )}
                </div>

                {/* Manual Entry */}
                <div className="pt-4 mt-4 border-t border-[#1f4a3a]">
                    <label className="text-xs text-slate-400 block mb-2">Add Other Certification</label>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            value={customCertInput}
                            onChange={(e) => setCustomCertInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addCustomCert()}
                            placeholder="e.g. Certified Scrum Master"
                            className="flex-1 bg-[#0f2e22] border border-[#1f4a3a] rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-[#00ff88] placeholder-slate-600"
                            // prevent propagation to avoid modal closing on click inside input if event bubbling issues occur
                            onClick={(e) => e.stopPropagation()} 
                        />
                        <button 
                            onClick={addCustomCert}
                            disabled={!customCertInput.trim()}
                            className="bg-[#00ff88] text-[#02100b] font-bold px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#00cc6a] transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>
            </Modal>
        )}

        {activeModal === 'industry' && (
            <Modal title="Which industry are you coming from?" onClose={() => setActiveModal(null)}>
                 <div className="space-y-2">
                    {INDUSTRIES.map((ind) => (
                        <button
                            key={ind}
                            onClick={() => setPreviousIndustry(ind)}
                            className={`w-full p-3 rounded-xl text-left text-sm font-medium transition-colors ${previousIndustry === ind ? 'bg-[#00ff88] text-[#02100b]' : 'bg-[#0f2e22] text-slate-300 hover:bg-[#1f4a3a]'}`}
                        >
                            {ind}
                        </button>
                    ))}
                </div>
            </Modal>
        )}
      </AnimatePresence>
    </>
  );
};
    