import { Project } from "@/entities/Project";
import { Vacancy } from "@/entities/Vacancy";

export type ExtendedVacancy = Vacancy & {
  project: Project;
}
