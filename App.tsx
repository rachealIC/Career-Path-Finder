
import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppLayout } from './components/layout/AppLayout';
import { Welcome } from './features/onboarding/Welcome';
import { Auth } from './features/auth/Auth';
import { AssessmentFlow } from './features/assessment/AssessmentFlow';
import { CareerResults } from './features/results/CareerResults';
import { Dashboard } from './features/dashboard/Dashboard';
import { CareerRoadmap } from './features/roadmap/CareerRoadmap';

// Wrapper to handle AnimatePresence with Routes
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/assessment" element={<AssessmentFlow />} />
        <Route path="/results" element={<CareerResults />} />
        <Route path="/roadmap" element={<CareerRoadmap />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Catch all - redirect to Welcome */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppLayout>
        <AnimatedRoutes />
      </AppLayout>
    </HashRouter>
  );
};

export default App;
    