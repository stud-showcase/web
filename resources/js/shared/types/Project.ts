import { TaskComplexity } from "./Task";

export type ProjectStatus = "under_review" | "in_progress" | "completed";

export interface Project {
  id: number;
  title: string;
  description: string;
  customer: string;
  status: ProjectStatus;
  complexity: TaskComplexity;
  tags: string[];
  isHiring: boolean;
}
