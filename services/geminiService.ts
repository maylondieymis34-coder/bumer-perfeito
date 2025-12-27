
import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateIcebreaker(targetUser: UserProfile, currentUser: string) {
    try {
      const prompt = `
        Aja como um assistente de socialização inteligente para o app "Bumer".
        Gere um quebra-gelo criativo, curto e envolvente em Português para o usuário ${currentUser} enviar para ${targetUser.name}.
        Bio da ${targetUser.name}: "${targetUser.bio}".
        O tom deve ser amigável, moderno e descontraído. Use o conceito de "Bumerangue" (conectar e voltar) se fizer sentido.
      `;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      return response.text || "Oi! Adorei seu perfil. Como você está?";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Oi! Achei seu perfil muito legal. Vamos conversar?";
    }
  }

  async simulateResponse(targetUser: UserProfile, lastMessage: string) {
    try {
      const prompt = `
        Você é a ${targetUser.name}, ${targetUser.age} anos. Sua bio é: "${targetUser.bio}".
        O usuário acabou de te enviar: "${lastMessage}".
        Responda como se fosse ela, de forma curta, natural e mantendo a conversa fluindo.
        Responda apenas com o texto da mensagem.
      `;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      return response.text || "Que legal! Me conta mais sobre isso?";
    } catch (error) {
      console.error("Gemini Response Error:", error);
      return "Interessante! O que mais você gosta de fazer?";
    }
  }
}

export const gemini = new GeminiService();
