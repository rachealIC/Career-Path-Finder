
// Global shared types

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface FitReason {
  reason: string;
  description: string;
}

export interface CareerSuggestion {
  title: string;
  matchScore: number;
  description: string;
  fitReasons: FitReason[];
  salaryRange: string;
  growthOutlook: string;
}

export interface UserProfile {
  name: string;
  completedAssessment: boolean;
}

// --- New Assessment Types ---

export type ExperienceLevel = 'Rookie' | 'Explorer' | 'Pro' | 'Veteran';

export interface PowerUp {
  id: string;
  label: string;
  icon: string;
}

export interface QuestionResponse {
  questionId: number;
  questionText: string;
  answer: 'agree' | 'disagree';
  category: string;
}

export interface AssessmentProfile {
  vibeResponses: QuestionResponse[];
  experienceLevel: ExperienceLevel;
  educationMajor?: string;
  certifications: string[];
  previousIndustry?: string;
}
