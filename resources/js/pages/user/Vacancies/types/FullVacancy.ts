import { Project } from "@/entities/Project";
import { Task } from "@/entities/Task";
import { Vacancy } from "@/entities/Vacancy";

export type FullVacancy = {
  vacancy: Vacancy;
  task: Task;
  project: Project;
};
