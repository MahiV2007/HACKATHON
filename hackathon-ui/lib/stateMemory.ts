type ModelRLStats = {
  uses: number;
  reward: number;
};

type StateMemory = {
  vector: number[];
  models: Record<string, ModelRLStats>;
};

export const stateMemory: StateMemory[] = [];

// -----------------------------
// SIMPLE VECTOR (NO KEYWORDS)
// -----------------------------
export function getVector(prompt: string): number[] {
  const length = prompt.length;
  const words = prompt.split(" ").length;
  const avgWordLength =
    prompt.split(" ").reduce((a, w) => a + w.length, 0) / (words || 1);

  return [length / 100, words / 20, avgWordLength / 10];
}

// -----------------------------
// COSINE SIMILARITY
// -----------------------------
function similarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, v) => sum + v * v, 0));
  const magB = Math.sqrt(b.reduce((sum, v) => sum + v * v, 0));

  return dot / (magA * magB + 0.00001);
}

// -----------------------------
// FIND CLOSEST STATE
// -----------------------------
export function findClosestState(vector: number[]) {
  let best = null;
  let bestSim = -1;

  for (const s of stateMemory) {
    const sim = similarity(vector, s.vector);

    if (sim > bestSim) {
      bestSim = sim;
      best = s;
    }
  }

  return { state: best, similarity: bestSim };
}

// -----------------------------
// UPDATE RL MEMORY
// -----------------------------
export function updateStateMemory(
  prompt: string,
  modelId: string,
  reward: number
) {
  const vector = getVector(prompt);

  const { state, similarity } = findClosestState(vector);

  // 🔥 if similar state exists → update
  if (state && similarity > 0.8) {
    if (!state.models[modelId]) {
      state.models[modelId] = { uses: 0, reward: 0 };
    }

    const stats = state.models[modelId];

    stats.uses += 1;
    stats.reward =
      (stats.reward * (stats.uses - 1) + reward) / stats.uses;

    return;
  }

  // 🔥 else create new state
  stateMemory.push({
    vector,
    models: {
      [modelId]: {
        uses: 1,
        reward,
      },
    },
  });
}