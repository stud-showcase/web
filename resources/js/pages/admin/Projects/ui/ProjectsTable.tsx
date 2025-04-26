import { projects } from "../mocks";
import { Project } from "@/entities/Project";
import { columns } from "./columns";
import { DataTable } from "@/shared/ui/DataTable";

const labels = {
  id: "ID",
  name: "Название",
  mentor: "Наставник",
  status: "Статус",
  isHiring: "Набор в команду",
};

export function ProjectsTable() {
  const handleEdit = (row: Project) => {
    console.log("Редактирование", row);
  };

  const handleDelete = (selectedRows: Project[]) => {
    console.log("Удаление заявок:", selectedRows);
  };

  const searchConfig = {
    columnIds: ["name", "mentor"],
    placeholder: "Поиск по названю или наставнику...",
  };

  const filterConfig = [
    {
      label: "Статус",
      columnId: "status",
      filters: [
        {
          label: "На рассмотрении",
          value: "under_review",
        },
        {
          label: "В разработке",
          value: "in_progress",
        },
        {
          label: "Завершен",
          value: "completed",
        },
      ],
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={projects}
      labels={labels}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchConfig={searchConfig}
      filterConfig={filterConfig}
    />
  );
}
