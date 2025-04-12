import { Project } from "@/shared/types/Project";

export const mockProject: Project = {
  id: 1,
  name: "Умный помощник для библиотеки",
  abstract:
    "Проект направлен на создание интеллектуальной системы для автоматизации поиска, рекомендаций и выдачи книг в университетской библиотеке. Основное внимание уделяется обработке естественного языка и интеграции с базами данных библиотеки.",
  members: [
    { id: 1, name: "Иван Петров", role: "Разработчик фронтенда" },
    { id: 2, name: "Мария Смирнова", role: "Аналитик" },
    { id: 3, name: "Дмитрий Кузнецов" }, // без роли
    { id: 4, name: "Иван Иванович" }, // без роли
    { id: 5, name: "Петр Дятлов" }, // без роли
  ],
  mentor: "Александр Сергеевич Иванов",
  status: "in_progress",
  isHiring: true,
  files: [
    { name: "Техническое задание.pdf", url: "/files/ts.pdf" },
    { name: "Схема архитектуры.png", url: "/files/architecture.png" },
  ],
  task: {
    id: 42,
    title: "Автоматизация библиотечных процессов",
    tags: ["AI", "NLP", "Node.js", "PostgreSQL"],
    complexity: "hard",
  },
  vacancies: [
    { title: "Test Test", description: "Front-end разработчик" },
    { title: "Test Test", description: "Back-end разработчик" },
    { title: "Test Test", description: "UI/UX дизайнер" },
  ],
};
