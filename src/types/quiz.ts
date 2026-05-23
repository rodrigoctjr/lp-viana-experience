export type QuizCategory = "historia" | "cultura" | "turismo";

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  curiosity: string;
}

export const CATEGORY_LABELS: Record<QuizCategory, string> = {
  historia: "História",
  cultura: "Cultura",
  turismo: "Turismo",
};
