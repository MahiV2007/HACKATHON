export interface AIResponse {
  fallbackUsed: any;
  answer: string;
  confidence: string;
  model: string;
  cost: string;
  reason: string;
}
export interface ModelResponse {
  text: string;
  cost: number;
}