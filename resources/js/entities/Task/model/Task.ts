import { TaskComplexity } from "./TaskCompexity";
import { TaskTag } from "./TaskTag";

export type Task = {
  id: number;
  title: string;
  canTake: boolean;
  description: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  maxMembers: number;
  deadline: string;
  complexity: TaskComplexity;
  tags?: TaskTag[];
  files?: { name: string; url: string }[];
};
