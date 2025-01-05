import intents from '../data/intents.json';
import type { IntentsData } from '../types/chat';

function calculateSimilarity(str1: string, str2: string): number {
  const words1 = str1.toLowerCase().split(/\s+/);
  const words2 = str2.toLowerCase().split(/\s+/);
  
  const commonWords = words1.filter(word => words2.includes(word));
  const similarity = commonWords.length / Math.max(words1.length, words2.length);
  
  return similarity;
}

export function findBestMatch(userInput: string): string {
  const normalizedInput = userInput.toLowerCase().trim();
  const data = intents as IntentsData;
  
  let bestMatch = {
    intent: null as any,
    score: 0
  };

  for (const intent of data.intents) {
    for (const pattern of intent.patterns) {
      const similarity = calculateSimilarity(normalizedInput, pattern);
      
      if (similarity > bestMatch.score) {
        bestMatch = {
          intent: intent,
          score: similarity
        };
      }
    }
  }

  // Umbral mínimo de similitud (50%)
  if (bestMatch.score >= 0.5 && bestMatch.intent) {
    return bestMatch.intent.responses[
      Math.floor(Math.random() * bestMatch.intent.responses.length)
    ];
  }
  
  return "Lo siento, no entendí tu pregunta. ¿Podrías reformularla de otra manera?";
}