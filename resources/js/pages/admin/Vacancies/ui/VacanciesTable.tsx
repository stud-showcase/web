import { vacancies } from "../mocks";
import { Vacancy } from "@/entities/Vacancy";
import { columns } from "./columns";
import { DataTable } from "@/shared/ui/DataTable";

const labels = {
  id: "ID",
  title: "Название",
  customer: "Заказчик",
  customerEmail: "Электронная почта",
  customerPhone: "Телефон",
  maxMembers: "Макс. участников",
  deadline: "Дедлайн",
  complexity: "Сложность",
};

export function VacanciesTable() {
  const handleEdit = (row: Vacancy) => {
    console.log("Редактирование", row);
  };

  const handleDelete = (selectedRows: Vacancy[]) => {
    console.log("Удаление задач:", selectedRows);
  };

  const searchConfig = {
    columnIds: ["title"],
    placeholder: "Поиск...",
  };

  return (
    <DataTable
      columns={columns}
      data={vacancies}
      labels={labels}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchConfig={searchConfig}
    />
  );
}
