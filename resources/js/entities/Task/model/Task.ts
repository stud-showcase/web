import { TaskComplexity } from "./TaskCompexity";

export type Task = {
  id: number;
  title: string;
  description: string;
  customer: { name: string; email?: string; phone?: string };
  maxMembers: number;
  deadline: Date;
  complexity: TaskComplexity;
  tags: string[];
  files?: { name: string; url: string }[];
}
