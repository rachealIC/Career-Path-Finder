import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleAuth = () => {
    // Mock auth - go straight to assessment
    navigate('/assessment');
  };

  return (
    <div className="flex-1 flex flex-col p-6 bg-[#02100b]">
      
      {/* Header Logo Area */}
      <div className="flex-1 flex flex-col items-center justify-center max-h-[30vh]">
        <div className="w-32 h-32 bg-[#0a2518] rounded-2xl flex items-center justify-center border border-[#1f4a3a] mb-6 relative overflow-hidden">
           <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00ff88] via-transparent to-transparent" />
           {/* Compass Icon */}
           <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
             <circle cx="12" cy="12" r="10"/>
             <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#00ff88" fillOpacity="0.2"/>
           </svg>
        </div>
        <h1 className="text-3xl font-bold text-white text-center">Chart Your Course</h1>
        <p className="text-slate-400 text-center mt-2 text-sm px-8">
          Welcome! Sign in or create an account to start your journey.
        </p>
      </div>

      {/* Form Area */}
      <div className="space-y-6">
        
        {/* Toggle */}
        <div className="bg-[#0a2518] p-1 rounded-full flex relative border border-[#1f4a3a]">
          <motion.div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#00ff88] rounded-full shadow-lg"
            animate={{ x: mode === 'login' ? 0 : '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button 
            className={`flex-1 py-3 rounded-full text-sm font-bold z-10 transition-colors ${mode === 'login' ? 'text-[#022c1e]' : 'text-slate-400'}`}
            onClick={() => setMode('login')}
          >
            Log In
          </button>
          <button 
            className={`flex-1 py-3 rounded-full text-sm font-bold z-10 transition-colors ${mode === 'signup' ? 'text-[#022c1e]' : 'text-slate-400'}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full bg-[#0f2e22] border border-[#1f4a3a] rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#00ff88] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Enter your password"
                className="w-full bg-[#0f2e22] border border-[#1f4a3a] rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-[#00ff88] transition-colors"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>
        </div>

        <Button fullWidth size="lg" onClick={handleAuth}>
          {mode === 'login' ? 'Log In' : 'Sign Up'}
        </Button>

        {mode === 'login' && (
          <div className="text-center">
            <button className="text-[#00ff88] text-sm hover:underline">Forgot Password?</button>
          </div>
        )}

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-[#1f4a3a]"></div>
          <span className="flex-shrink-0 mx-4 text-slate-500 text-xs">or</span>
          <div className="flex-grow border-t border-[#1f4a3a]"></div>
        </div>

        <Button variant="google" fullWidth onClick={handleAuth} className="flex items-center gap-3 justify-center">
           <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center p-1">
             <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
               <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238501)">
                 <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                 <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.059 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.424 63.239 -14.754 63.239 Z"/>
                 <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.489 -26.754 49.309 -26.754 51.239 C -26.754 53.169 -26.284 54.989 -25.464 56.619 L -21.484 53.529 Z"/>
                 <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.424 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
               </g>
             </svg>
           </div>
           Continue with Google
        </Button>
        
        <div className="pt-4 text-center text-[10px] text-slate-600 px-10">
           By continuing, you agree to our <span className="text-[#00ff88]">Terms of Service</span> and <span className="text-[#00ff88]">Privacy Policy</span>.
        </div>

      </div>
    </div>
  );
};