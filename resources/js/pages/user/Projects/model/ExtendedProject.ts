import { Project } from "@/entities/Project";
import { Task } from "@/entities/Task";

export type ExtendedProject = Project & {
  task: Task;
};
