import { Project } from "@/entities/Project";
import { Task } from "@/entities/Task";

export type ExtendedTask = Task & {
  projects: Project[];
}
