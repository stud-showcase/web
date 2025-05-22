import { Application } from "@/entities/Application";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Badge } from "@/shared/ui/Badge";
import { DataTable } from "@/shared/ui/DataTable";

const columns = [
  { title: "ID", cell: (application: Application) => application.id },
  { title: "Задача", cell: (application: Application) => application.title },
  {
    title: "Проект",
    cell: (application: Application) => application.projectName || "-",
  },
  {
    title: "Заказчик",
    cell: (application: Application) => application.customer,
  },
  {
    title: "Email",
    cell: (application: Application) => application.customerEmail,
  },
  {
    title: "Телефон",
    cell: (application: Application) => application.customerPhone || "-",
  },
  {
    title: "Тип заявки",
    cell: (application: Application) =>
      application.withProject ? (
        <Badge
          variant="secondary"
          title="Заявка на создание проекта с собственной темой"
        >
          Проект
        </Badge>
      ) : (
        <Badge
          variant="secondary"
          title="Заявка на добавление новой задачи в банк задач"
        >
          Банк задач
        </Badge>
      ),
  },
];

export function ApplicationsTable({
  applications,
}: {
  applications: ServerPaginatedData<Application>;
}) {
  return (
    <DataTable data={applications} columns={columns} route="/admin/applications" />
  );
}
