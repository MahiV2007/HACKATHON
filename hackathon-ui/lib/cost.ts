export function estimateCost(model: string) {
  if (model.includes("Haiku")) return "$0.001";
  if (model.includes("Sonnet")) return "$0.003";
  if (model.includes("Opus")) return "$0.01";
  return "$0.002";
}