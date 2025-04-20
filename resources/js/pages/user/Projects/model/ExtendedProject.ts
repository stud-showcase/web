import { Project } from "@/entities/Project";
import { Task } from "@/entities/Task";

export type ExtendedProject = {
  project: Project;
  task: Task;
}
