import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { DataTable } from "@/shared/ui/DataTable";

const columns = [
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

export function VacanciesTable({
  vacancies,
}: {
  vacancies: ServerPaginatedData<ExtendedVacancy>;
}) {
  return <DataTable data={vacancies} columns={columns} route="/admin/vacancies" />;
}
