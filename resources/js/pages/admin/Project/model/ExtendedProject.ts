import { Project } from "@/entities/Project";
import { Vacancy } from "@/entities/Vacancy";

export type ExtendedProject = Project & {
  vacancies: Vacancy[];
}
