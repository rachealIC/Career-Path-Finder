
export interface Question {
  id: number;
  text: string;
  category: string;
  icon: string; // Icon name for the UI
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  // 1. The Physicality Split (Hands vs. Screen)
  {
    id: 1,
    text: "I would rather work with my hands (tools, machinery, physical products) than sit behind a desk all day.",
    category: "Physicality",
    icon: "hands"
  },
  // 2. The Empathy Split (Care vs. Efficiency)
  {
    id: 2,
    text: "I have a lot of patience for helping people who are struggling, sick, or emotional.",
    category: "Empathy",
    icon: "heart"
  },
  // 3. The Persuasion Split (Convincing vs. Supporting)
  {
    id: 3,
    text: "I enjoy the thrill of convincing someone to buy something or change their mind.",
    category: "Persuasion",
    icon: "bullhorn"
  },
  // 4. The Creativity Split (Expression vs. Structure)
  {
    id: 4,
    text: "I prefer a job where I create something new from scratch (art, words, food) rather than following a strict manual.",
    category: "Creativity",
    icon: "palette"
  },
  // 5. The Environment Split (Field vs. Office)
  {
    id: 5,
    text: "I get restless staying in one building; I want a job where I travel or move around the city.",
    category: "Environment",
    icon: "globe"
  },
  // 6. The Risk Split (Stability vs. Commission)
  {
    id: 6,
    text: "I prefer a stable, guaranteed paycheck over a risky job where I might make a fortune based on performance.",
    category: "Risk Tolerance",
    icon: "shield"
  },
  // 7. The Data Split (Numbers vs. Words)
  {
    id: 7,
    text: "I feel comfortable looking at spreadsheets, budgets, and statistics.",
    category: "Data",
    icon: "chart"
  },
  // 8. The Problem-Solving Split (Fixing vs. Planning)
  {
    id: 8,
    text: "When something breaks, I want to be the one to jump in and fix it immediately.",
    category: "Problem Solving",
    icon: "wrench"
  }
];
