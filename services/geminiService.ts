import { GoogleGenAI } from "@google/genai";
import { PROFILE, PUBLICATIONS, EXPERIENCES, AWARDS, ACTIVITIES } from '../constants';

// Construct a context string for the AI
const SYSTEM_CONTEXT = `
You are an AI research assistant for ${PROFILE.name}. 
Your goal is to answer questions about ${PROFILE.name}'s research, publications, and professional background based strictly on the provided context.

Here is the profile context:
Name: ${PROFILE.name}
Bio: ${PROFILE.bio}
Affiliation: ${PROFILE.affiliation}
Email: ${PROFILE.email}

Experience:
${EXPERIENCES.map(e => `- ${e.role} at ${e.institution} (${e.period}). ${e.description || ''}`).join('\n')}

Awards:
${AWARDS.map(a => `- ${a.year}: ${a.title}. ${a.description || ''}`).join('\n')}

Publications:
${PUBLICATIONS.map(p => `- "${p.title}" (${p.year}) at ${p.venue}. Authors: ${p.authors.map(a => a.name).join(', ')}. Highlights: ${p.abstract}`).join('\n')}

Professional Activities:
${ACTIVITIES.map(a => `- ${a.category}: ${a.items.join(', ')}`).join('\n')}

Instructions:
- Be polite, professional, and concise (academic tone).
- If you don't know the answer based on the context, say "I don't have that information in my current context, but feel free to email Lei directly."
- Keep answers relatively short (under 100 words) unless asked for a detailed summary.
`;

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient && process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const sendMessageToGemini = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]) => {
  const client = getClient();
  if (!client) {
    throw new Error("API Key not found");
  }

  try {
    const chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_CONTEXT,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({
      message: userMessage
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};