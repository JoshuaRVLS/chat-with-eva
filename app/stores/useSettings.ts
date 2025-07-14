import { create } from "zustand";

export const useSettings = create<{
  topP: number;
  topK: number;
  maxTokens: number;
  temperature: number;
  presencePenalty: number;
  frequencyPenalty: number;
  repetitionPenalty: number;
  showSettings: boolean;

  setTopP: (topP: number) => void;
  setTopK: (topK: number) => void;
  setMaxTokens: (maxTokens: number) => void;
  setTemperature: (temperature: number) => void;
  setPresencePenalty: (presencePenalty: number) => void;
  setFrequencyPenalty: (frequencyPenalty: number) => void;
  setRepetitionPenalty: (repetitionPenalty: number) => void;
  setShowSettings: (showSettings: boolean) => void;
}>((set) => ({
  topP: 1,
  topK: 40,
  maxTokens: 350,
  temperature: 0.7,
  presencePenalty: 0,
  frequencyPenalty: 0,
  repetitionPenalty: 0,
  showSettings: false,
  setTopP: (topP: number) => set({ topP }),
  setTopK: (topK: number) => set({ topK }),
  setMaxTokens: (maxTokens: number) => set({ maxTokens }),
  setTemperature: (temperature: number) => set({ temperature }),
  setPresencePenalty: (presencePenalty: number) => set({ presencePenalty }),
  setFrequencyPenalty: (frequencyPenalty: number) => set({ frequencyPenalty }),
  setRepetitionPenalty: (repetitionPenalty: number) =>
    set({ repetitionPenalty }),
  setShowSettings: (showSettings: boolean) => set({ showSettings }),
}));
