import { users } from "../mocks";
import { columns } from "./columns";
import { DataTable } from "@/shared/ui/DataTable";
import { User } from "@/entities/User";

const labels = {
  id: "ID",
  name: "ФИО",
  email: "Электронная почта",
  group: "Группа",
  roles: "Роли",
};

export function UsersTable() {
  const handleEdit = (row: User) => {
    console.log("Редактирование", row);
  };

  const handleDelete = (selectedRows: User[]) => {
    console.log("Удаление задач:", selectedRows);
  };

  const searchConfig = {
    columnIds: ["name"],
    placeholder: "Поиск...",
  };

  const filterConfig = [
    {
      label: "Роль",
      columnId: "roles",
      filters: [
        {
          label: "Администратор",
          value: "admin",
        },
        {
          label: "Наставник",
          value: "mentor",
        },
        {
          label: "Студент",
          value: "student",
        },
      ],
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      labels={labels}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchConfig={searchConfig}
      filterConfig={filterConfig}
    />
  );
}
