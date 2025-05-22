import { Application } from "@/entities/Application";
import { Badge } from "@/shared/ui/Badge";

export const columns = [
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
