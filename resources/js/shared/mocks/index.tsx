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
  customer: { name: "Университет СевГУ", email: "contact@sevgu.ru" },
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
