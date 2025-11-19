
import { GoogleGenAI, Type } from "@google/genai";
import { CareerSuggestion, AssessmentProfile } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeCareerPath = async (
  profile: AssessmentProfile
): Promise<CareerSuggestion[]> => {
  
  if (!apiKey) {
    console.error("API Key missing");
    return [];
  }

  const promptContext = `
    You are an expert career counselor AI.
    
    TASK:
    Analyze the user's profile which consists of a "Universal 8 Vibe Check" (Industry Agnostic Preferences) and their "Trophy Room" (Experience/Credentials).
    Recommend 3 specific career paths.

    USER PROFILE:
    
    1. EXPERIENCE LEVEL: "${profile.experienceLevel}"
       - Rookie: Student/No Exp
       - Explorer: Career Switcher/Junior
       - Pro: Mid-Level
       - Veteran: Senior
       
    2. BACKGROUND & CREDENTIALS:
       - Education Major: ${profile.educationMajor || "None/Not Listed"}
       - Certifications: ${profile.certifications.length > 0 ? profile.certifications.join(', ') : "None"}
       - Previous Industry: ${profile.previousIndustry || "None"}

    3. VIBE CHECK (Universal 8 - Industry Agnostic Preferences):
       ${profile.vibeResponses.filter(r => r.answer === 'agree').map(r => `- AGREES with: "${r.questionText}" (${r.category})`).join('\n       ')}
       ${profile.vibeResponses.filter(r => r.answer === 'disagree').map(r => `- DISAGREES with: "${r.questionText}" (${r.category})`).join('\n       ')}

    LOGIC GUIDELINES:
    - **Seniority**: If Experience is 'Pro' or 'Veteran', suggest Senior/Lead roles. Do NOT suggest entry-level.
    - **Transferable Skills**: Use 'Previous Industry' to find bridge roles. 
      - Example: Retail + Empathy = Customer Success Manager. 
      - Example: Construction + Physicality = Field Engineer.
      - Example: Hospitality + Persuasion = High-end Sales/Real Estate.
    - **Education**: 
      - Business Major + Tech Interest -> Product Management / Analyst.
      - Arts Major + Tech Interest -> UX Design / Frontend.
      - Health Major + Tech Interest -> HealthTech Product / Implementation.
    - **Universal 8 Vibe Check Logic**:
      - "Physicality" (Hands) -> Trades, Healthcare, Field work, Hardware.
      - "Empathy" (Heart) -> Healthcare, EdTech, HR, Support, Community Mgmt.
      - "Persuasion" (Bullhorn) -> Sales, Marketing, Law, Recruiting.
      - "Creativity" (Palette) -> Design, Content, Culinary, Architecture.
      - "Environment" (Globe) -> Travel jobs, Field Sales, Real Estate, Events.
      - "Risk" (Shield) -> If Yes (Stable): Corp, Govt. If No (Risk): Startup, Sales, Founder.
      - "Data" (Chart) -> Analyst, Finance, Logistics, Backend.
      - "Problem Solving" (Wrench) -> IT Support, Ops, Mechanics, Emergency (Reactive fixing).

    OUTPUT FORMAT:
    Return JSON array of 3 suggestions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptContext,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              matchScore: { type: Type.INTEGER, description: "Percentage match 0-100" },
              description: { type: Type.STRING },
              fitReasons: {
                type: Type.ARRAY,
                description: "2-3 specific reasons matching their Vibe or Background (e.g. 'Your Background in Retail is perfect for...', 'Your Creative Vibe matches...')",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    reason: { type: Type.STRING, description: "Short title e.g. 'Transferable Skill'" },
                    description: { type: Type.STRING, description: "1 sentence explanation" }
                  },
                  required: ["reason", "description"]
                }
              },
              salaryRange: { type: Type.STRING },
              growthOutlook: { type: Type.STRING }
            },
            required: ["title", "matchScore", "description", "fitReasons", "salaryRange", "growthOutlook"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text) as CareerSuggestion[];
    return data;
  } catch (error) {
    console.error("Error fetching career suggestions:", error);
    throw error;
  }
};

export const getDailyMotivation = async (): Promise<string> => {
   if (!apiKey) return "Keep pushing forward!";

   try {
     const response = await ai.models.generateContent({
       model: 'gemini-2.5-flash',
       contents: "Give me a very short, punchy 1-sentence motivational quote for someone looking for a new career.",
     });
     return response.text || "Believe in your potential.";
   } catch (e) {
     return "Your future is bright.";
   }
};
