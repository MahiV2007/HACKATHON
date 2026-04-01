export function calculateConfidence(answer: string) {
  let score = 50;

  // length check
  if (answer.length > 100) score += 20;

  // sentence structure
  if (answer.includes(".")) score += 10;

  // avoids uncertainty
  if (
    !answer.toLowerCase().includes("i don't know") &&
    !answer.toLowerCase().includes("not sure")
  ) {
    score += 20;
  }

  // richness
  if (answer.split(" ").length > 30) score += 10;

  return Math.min(score, 100);
}