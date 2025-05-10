import { Project } from "@/entities/Project";
import { Task } from "@/entities/Task";
import { Vacancy } from "@/entities/Vacancy";

export const project: Project = {
  id: 1,
  name: "AI Assistant",
  abstract: "Помощник на базе ИИ для студентов",
  members: [{ id: 1, name: "Иван Иванов", role: "Разработчик" }],
  mentor: "Алексей Смирнов",
  files: [{ name: "ТЗ.pdf", url: "/files/specs.pdf" }],
  status: "in_progress" as const,
  isHiring: true,
  requests: [{ name: "Иван Иванович Иванов", role: "Designer" }],
};

export const task: Task = {
  id: 1,
  title: "Разработка ИИ помощника",
  description: "Создание чат-бота с ИИ для помощи студентам.",
  customer: "Университет СевГУ",
  customerEmail: "contact@sevgu.ru",
  customerPhone: "+7-978-727-3252",
  maxMembers: 4,
  deadline: new Date(),
  complexity: "medium" as const,
  tags: ["AI", "chatbot", "university"],
  files: [{ name: "dataset.zip", url: "/files/dataset.zip" }],
};

export const vacancy: Vacancy = {
  id: 1,
  title: "Frontend разработчик",
  description: "Разработка UI для веб-приложения.",
};

export const mockVacancies: Vacancy[] = [
  {
    id: 1,
    name: "Frontend Developer",
    description:
      "Разработка пользовательских интерфейсов с использованием React и TypeScript.",
  },
  {
    id: 2,
    name: "Backend Developer",
    description:
      "Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. Создание и поддержка серверной логики на Node.js и Express. ",
  },
  {
    id: 3,
    name: "UI/UX Designer",
    description:
      "Автоматизация CI/CD процессов и управление облачной инфраструктурой.",
  },
  {
    id: 4,
    name: "DevOps Engineer",
    description:
      "Автоматизация CI/CD процессов и управление облачной инфраструктурой.",
  },
  {
    id: 5,
    name: "Project Manager",
    description: "Координация проектов и управление командами разработки.",
  },
];
