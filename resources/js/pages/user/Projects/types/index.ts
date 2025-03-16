export type ProjectStatus = "under_review" | "in_progress" | "completed";
export type ProjectComplexity = "easy" | "medium" | "hard";

export interface Project {
  id: number;
  title: string;
  description: string;
  customer: string;
  status: ProjectStatus;
  complexity: ProjectComplexity;
  tags: string[];
  isHiring: boolean;
}
