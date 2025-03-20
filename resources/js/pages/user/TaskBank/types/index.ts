export type TaskComplexity = "easy" | "medium" | "hard";

export interface Task {
  id: number;
  title: string;
  description: string;
  customer: string;
  max_members: number;
  deadline: Date;
  complexity: TaskComplexity;
  tags: string[];
}
