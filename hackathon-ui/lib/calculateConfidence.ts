// export function calculateConfidence(answer: string): number {
//   if (!answer || answer.length < 20) return 50;

//   let score = 60;

//   // length check
//   if (answer.length > 100) score += 10;
//   if (answer.length > 300) score += 10;

//   // structure check
//   if (answer.includes(".") || answer.includes(",")) score += 5;

//   // explanation keywords
//   if (
//     answer.toLowerCase().includes("because") ||
//     answer.toLowerCase().includes("therefore") ||
//     answer.toLowerCase().includes("explains")
//   ) {
//     score += 5;
//   }

//   return Math.min(score, 95);
// }


export function calculateScore(m: any) {
  if (m.uses === 0) return 0;

  return (
    m.success_rate * 0.5 +
    (1 / (m.avg_latency || 1)) * 0.3 +
    (1 / (m.avg_cost || 1)) * 0.2
  );
}