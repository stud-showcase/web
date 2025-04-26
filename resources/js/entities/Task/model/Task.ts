import { TaskComplexity } from "./TaskCompexity";

export type Task = {
  id: number;
  title: string;
  description: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  maxMembers: number;
  deadline: Date;
  complexity: TaskComplexity;
  tags: string[];
  files?: { name: string; url: string }[];
};
