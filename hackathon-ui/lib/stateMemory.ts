import fs from "fs";
import path from "path";

// -----------------------------
// FILE PATH
// -----------------------------
const filePath = path.join(process.cwd(), "lib/data/stateStats.json");

// -----------------------------
// TYPES
// -----------------------------
type StateStats = {
  [state: string]: {
    [modelId: string]: {
      uses: number;
      reward: number;
    };
  };
};

// -----------------------------
// LOAD FROM FILE
// -----------------------------
export function readStateStats(): StateStats {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "{}");
  } catch {
    return {};
  }
}

// -----------------------------
// WRITE TO FILE
// -----------------------------
export function writeStateStats(data: StateStats) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// -----------------------------
// GLOBAL STATE
// -----------------------------
export let stateStats: StateStats = readStateStats();

// -----------------------------
// UPDATE STATE (RL CORE)
// -----------------------------
export function updateStateStats(
  state: string,
  modelId: string,
  reward: number
) {
  if (!stateStats[state]) {
    stateStats[state] = {};
  }

  if (!stateStats[state][modelId]) {
    stateStats[state][modelId] = {
      uses: 0,
      reward: 0,
    };
  }

  const stats = stateStats[state][modelId];
  const prevUses = stats.uses;

  stats.uses += 1;

  // 🔥 moving average reward
  stats.reward =
    (stats.reward * prevUses + reward) / stats.uses;
console.log("RL UPDATE:", state, modelId, reward);

  writeStateStats(stateStats);
}