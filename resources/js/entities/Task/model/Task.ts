import { ServerFile } from "@/shared/types/ServerFile";
import { TaskComplexity } from "./TaskCompexity";
import { TaskTag } from "./TaskTag";

export type Task = {
  id: number;
  title: string;
  canTake: boolean;
  description: string;
  customer: string;
  customerEmail: string | null;
  customerPhone: string | null;
  maxMembers: number;
  deadline: string;
  maxProjects: number | null;
  complexity: TaskComplexity;
  tags: TaskTag[];
  files: ServerFile[];
};
