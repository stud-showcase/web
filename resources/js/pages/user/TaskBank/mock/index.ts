import { Task } from "@/shared/types/Task";

export const mockTasks: Task[] = [
    {
        id: 1,
        title: "Разработка landing page",
        description:
            "Создать одностраничный сайт для рекламной кампании нового продукта",
        customer: { name: "ООО МаркетПлюс" },
        max_members: 3,
        deadline: new Date("2025-04-15"),
        complexity: "medium",
        tags: ["web", "frontend", "design"],
    },
    {
        id: 2,
        title: "Настройка CI/CD",
        description: "Настроить автоматизацию деплоя для серверного приложения",
        customer: { name: "TechCorp" },
        max_members: 2,
        deadline: new Date("2025-03-30"),
        complexity: "hard",
        tags: ["devops", "backend", "automation"],
    },
    {
        id: 3,
        title: "Исправление багов в мобильном приложении",
        description: "Устранить ошибки в отображении интерфейса на iOS",
        customer: { name: "AppVenture" },
        max_members: 4,
        deadline: new Date("2025-04-05"),
        complexity: "easy",
        tags: ["mobile", "ios", "bugfix"],
    },
    {
        id: 4,
        title: "Оптимизация базы данных",
        description: "Ускорить выполнение запросов к PostgreSQL",
        customer: { name: "DataFlow Inc." },
        max_members: 2,
        deadline: new Date("2025-05-01"),
        complexity: "hard",
        tags: ["database", "backend", "optimization"],
    },
    {
        id: 5,
        title: "Создание баннеров",
        description: "Разработать серию рекламных баннеров для сайта",
        customer: { name: "Creative Agency" },
        max_members: 1,
        deadline: new Date("2025-03-25"),
        complexity: "easy",
        tags: ["design", "marketing"],
    },
    {
        id: 6,
        title: "Интеграция API платежной системы",
        description: "Подключить Stripe для обработки платежей",
        customer: { name: "E-Shop Ltd." },
        max_members: 3,
        deadline: new Date("2025-04-20"),
        complexity: "medium",
        tags: ["backend", "api", "payments"],
    },
    {
        id: 7,
        title: "Редизайн логотипа",
        description: "Обновить брендовый логотип компании",
        customer: { name: "BrandWorks" },
        max_members: 2,
        deadline: new Date("2025-04-10"),
        complexity: "easy",
        tags: ["design", "branding"],
    },
    {
        id: 8,
        title: "Тестирование безопасности",
        description: "Провести аудит безопасности веб-приложения",
        customer: { name: "SecureSoft" },
        max_members: 3,
        deadline: new Date("2025-05-15"),
        complexity: "hard",
        tags: ["security", "testing"],
    },
    {
        id: 9,
        title: "Разработка чат-бота",
        description: "Создать бота для Telegram для службы поддержки",
        customer: { name: "SupportPro" },
        max_members: 2,
        deadline: new Date("2025-04-25"),
        complexity: "medium",
        tags: ["bot", "backend", "support"],
    },
    {
        id: 10,
        title: "Обновление документации",
        description: "Актуализировать техническую документацию проекта",
        customer: { name: "DocuTech" },
        max_members: 1,
        deadline: new Date("2025-03-28"),
        complexity: "easy",
        tags: ["documentation", "techwriting"],
    },
    {
        id: 11,
        title: "Миграция на новый фреймворк",
        description: "Перенести приложение с Angular на React",
        customer: { name: "Web Innovate" },
        max_members: 4,
        deadline: new Date("2025-06-01"),
        complexity: "hard",
        tags: ["frontend", "react", "migration"],
    },
];
