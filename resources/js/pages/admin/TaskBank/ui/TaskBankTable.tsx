import { tasks } from "../mocks";
import { Task } from "@/entities/Task";
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

export function TaskBankTable() {
  const handleEdit = (row: Task) => {
    console.log("Редактирование", row);
  };

  const handleDelete = (selectedRows: Task[]) => {
    console.log("Удаление задач:", selectedRows);
  };

  const searchConfig = {
    columnIds: ["title"],
    placeholder: "Поиск названию...",
  };

  const filterConfig = [
    {
      label: "Сложность",
      columnId: "complexity",
      filters: [
        {
          label: "Легкий",
          value: "easy",
        },
        {
          label: "Средний",
          value: "medium",
        },
        {
          label: "Сложный",
          value: "hard",
        },
      ],
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={tasks}
      labels={labels}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchConfig={searchConfig}
      filterConfig={filterConfig}
    />
  );
}
