import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "lib/data/modelStats.json");

// READ
export function readStats() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "{}");
  } catch {
    return {};
  }
}

// WRITE
export function writeStats(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// PROMPT STATS FILE
const promptFilePath = path.join(process.cwd(), "lib/data/promptStats.json");

// READ PROMPT STATS
export function readPromptStats() {
  try {
    const data = fs.readFileSync(promptFilePath, "utf-8");
    return JSON.parse(data || "{}");
  } catch {
    return {};
  }
}

// WRITE PROMPT STATS
export function writePromptStats(data: any) {
  fs.writeFileSync(promptFilePath, JSON.stringify(data, null, 2));
}