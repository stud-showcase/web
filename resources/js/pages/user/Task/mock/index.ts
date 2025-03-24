import { Project } from "@/shared/types/Project";
import { Task } from "@/shared/types/Task";

export const mockTask: Task = {
  id: 1,
  title: "Разработка системы управления складом",
  description: `Необходимо создать веб-приложение для управления складскими запасами.
      Система должна позволять отслеживать поступление и отгрузку товаров в реальном времени.
      Требуется реализовать авторизацию пользователей с разными ролями: администратор, менеджер и кладовщик.
      Важно предусмотреть генерацию отчетов по движению товаров за заданный период.
      Интерфейс должен быть интуитивно понятным и адаптивным для использования на мобильных устройствах.
      Также необходимо интегрировать систему с существующей базой данных товаров через REST API.
      В качестве дополнительной функции заказчик просит добавить возможность сканирования штрих-кодов через камеру устройства.
      Проект должен быть задокументирован, включая инструкцию для пользователей и разработчиков. `,
  customer: {
    name: "ООО 'Складские Решения'",
    email: "info@warehouse.ru",
    phone: "+7 (495) 555-01-23",
  },
  max_members: 5,
  deadline: new Date("2025-07-20"),
  complexity: "medium",
  tags: ["веб-разработка", "React", "TypeScript", "API", "склад"],
  files: [
    { name: "ТЗ_Склад.pdf", url: "/files/warehouse-spec.pdf" },
    { name: "Схема БД.sql", url: "/files/db-schema.sql" },
  ],
};

export const mockTaskProjects: Project[] = [
  {
    id: 1,
    title: "Команда Альфа",
    description: "Здесь должна быть аннотация",
    customer: "ООО Техно",
    status: "in_progress",
    complexity: "medium",
    tags: ["web", "react"],
    isHiring: true,
  },
  {
    id: 2,
    title: "Команда Бета",
    description: "Здесь должна быть аннотация",
    customer: "ООО Техно",
    status: "in_progress",
    complexity: "medium",
    tags: ["frontend", "typescript"],
    isHiring: false,
  },
  {
    id: 3,
    title: "Команда Бета",
    description: "Здесь должна быть аннотация",
    customer: "ООО Техно",
    status: "in_progress",
    complexity: "medium",
    tags: ["frontend", "typescript"],
    isHiring: false,
  },
  {
    id: 4,
    title: "Команда Бета",
    description: "Здесь должна быть аннотация",
    customer: "ООО Техно",
    status: "in_progress",
    complexity: "medium",
    tags: ["frontend", "typescript"],
    isHiring: false,
  },
];
