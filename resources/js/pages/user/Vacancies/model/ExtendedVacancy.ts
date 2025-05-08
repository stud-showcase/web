import { Project } from "@/entities/Project";
import { Task } from "@/entities/Task";
import { Vacancy } from "@/entities/Vacancy";

export type ExtendedVacancy = Vacancy & {
  project: Project;
  task: Task;
};
