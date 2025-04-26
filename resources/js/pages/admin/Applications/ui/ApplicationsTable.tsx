import { applications } from "../mocks";
import { Application } from "@/entities/Application";
import { columns } from "./columns";
import { DataTable } from "@/shared/ui/DataTable";

const labels = {
  id: "ID",
  title: "Название",
  customer: "Заказчик",
  customerEmail: "Электронная почта",
  customerPhone: "Телефон",
  type: "Тип заявки",
};

export function ApplicationsTable() {
  const handleEdit = (row: Application) => {
    console.log("Редактирование", row);
  };

  const handleDelete = (selectedRows: Application[]) => {
    console.log("Удаление заявок:", selectedRows);
  };

  const searchConfig = {
    columnIds: ["customerEmail", "customer"],
    placeholder: "Поиск по email или заказчику...",
  };

  const filterConfig = [
    {
      label: "Тип заявки",
      columnId: "type",
      filters: [
        {
          label: "Банк задач",
          value: "task",
        },
        {
          label: "Проект",
          value: "project",
        },
      ],
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={applications}
      labels={labels}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchConfig={searchConfig}
      filterConfig={filterConfig}
    />
  );
}
