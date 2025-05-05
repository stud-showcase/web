import { Vacancy } from "@/entities/Vacancy";

export type ExtendedVacancy = Vacancy & {
  project: {
    id: number;
    name: string;
  };
  taskTitle: string;
};
