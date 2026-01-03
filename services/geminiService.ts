
// NOTE: This file contains server-side Gemini client usage. Do NOT import or call from browser bundles in production.
// If you need AI in the frontend, create a secure server endpoint that calls these functions and returns results.
import { GoogleGenAI } from "@google/genai";

// Alazar Pro Studio Services Logic

/**
 * Returns a GoogleGenAI client instance.
 */
export const getGeminiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

/**
 * Service to handle generic visual design queries if needed in the future.
 */
export const handleCreativeQuery = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      systemInstruction: "You are the creative coordinator for Alazar Pro. Be professional and concise."
    }
  });
  
  return response.text;
};

/**
 * Edits or generates a photo based on prompt and optional source image using gemini-2.5-flash-image.
 */
export const editPhoto = async (prompt: string, base64Image?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-2.5-flash-image';
  
  const parts: any[] = [{ text: prompt }];
  
  if (base64Image) {
    // Extract MIME type and data from the base64 data URL
    const mimeType = base64Image.match(/^data:(.*);base64,/)?.[1] || 'image/png';
    const data = base64Image.replace(/^data:.*;base64,/, '');
    parts.push({
      inlineData: {
        data,
        mimeType
      }
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts },
  });

  // Iterate through all parts to find the image part as recommended by the guidelines.
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }
  return null;
};

/**
 * Generates a cinematic video sequence using the Veo model.
 */
export const generateVideo = async (
  prompt: string, 
  options: { 
    aspectRatio: '16:9' | '9:16', 
    resolution: '720p' | '1080p',
    startImage?: string,
    endImage?: string 
  },
  onProgress?: (msg: string) => void
) => {
  // Creating instance right before call as per Veo instructions to ensure latest API key.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'veo-3.1-fast-generate-preview';
  
  const videoConfig: any = {
    numberOfVideos: 1,
    resolution: options.resolution,
    aspectRatio: options.aspectRatio
  };

  const payload: any = {
    model,
    prompt,
    config: videoConfig
  };

  if (options.startImage) {
    const data = options.startImage.replace(/^data:.*;base64,/, '');
    const mimeType = options.startImage.match(/^data:(.*);base64,/)?.[1] || 'image/png';
    payload.image = { imageBytes: data, mimeType };
  }

  if (options.endImage) {
    const data = options.endImage.replace(/^data:.*;base64,/, '');
    const mimeType = options.endImage.match(/^data:(.*);base64,/)?.[1] || 'image/png';
    videoConfig.lastFrame = { imageBytes: data, mimeType };
  }

  onProgress?.("Transmitting cinematic parameters to Veo engine...");
  let operation = await ai.models.generateVideos(payload);

  onProgress?.("Synthesizing high-fidelity frames (usually takes 1-2 minutes)...");
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) throw new Error("Video synthesis failed - no output source available.");
  
  // Appending API key for resource access as specified in guidelines.
  return `${downloadLink}&key=${process.env.API_KEY}`;
};

/**
 * Handles chat interaction with the Alazar Pro Assistant for project scoping.
 */
export const chatWithConsultant = async (message: string, _history: any[] = []) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are the Alazar Pro Assistant, an elite production consultant for Alazar Pro visual studio in Addis Ababa. You help clients scope music videos, fashion photography, and commercials. Be professional, sophisticated, and helpful."
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
