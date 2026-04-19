"use client";

import { create } from "zustand";

type ModelState = {
  selectedModel: string;
  setModel: (model: string) => void;
};

export const useModel = create<ModelState>((set) => ({
  selectedModel: "GPT-4o",
  setModel: (model) => set({ selectedModel: model }),
}));