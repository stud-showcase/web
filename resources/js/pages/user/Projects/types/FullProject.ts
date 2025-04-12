import { Project } from "@/entities/Project";
import { Task } from "@/entities/Task";

export type FullProject = {
  project: Project;
  task: Task;
}
