import { ExtendedVacancy } from "../model/ExtendedVacancy";

export const columns = [
  { title: "ID", cell: (vacancy: ExtendedVacancy) => vacancy.id },
  { title: "Название", cell: (vacancy: ExtendedVacancy) => vacancy.name },
  {
    title: "Описание",
    cell: (vacancy: ExtendedVacancy) => vacancy.description,
  },
  {
    title: "Проект",
    cell: (vacancy: ExtendedVacancy) => vacancy.project.name,
  },
];
