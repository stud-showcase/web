import { Project } from "@/entities/Project";
import { Task } from "@/entities/Task"
import { Vacancy } from "@/entities/Vacancy";

export type ExtendedProject = Project & {
  task: Task;
  canJoin: boolean;
  vacancies: Vacancy[];
}
