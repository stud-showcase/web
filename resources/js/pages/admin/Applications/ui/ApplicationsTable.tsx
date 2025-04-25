import { applications } from "../mocks";
import { Application } from "../model/Application";
import { columns } from "./columns";
import { DataTable } from "@/shared/ui/DataTable";

const labels = {
  id: "ID",
  title: "Название",
  customerName: "Заказчик",
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
    columnIds: ["customerEmail", "customerName"],
    placeholder: "Поиск по email или заказчику...",
  };

  const filterConfig = [
    {
      label: "Тип заявки",
      columnId: "type",
      filters: [
        {
          label: "Банк задач",
          value: "task_bank",
        },
        {
          label: "Проект",
          value: "project",
        },
      ],
    },
    {
      label: "Заказчик",
      columnId: "customerName",
      filters: [
        {
          label: "Иван Иванов",
          value: "Иван Иванов",
        },
        {
          label: "Анна Смирнова",
          value: "Анна Смирнова",
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
