import { Button } from "@/shared/ui/Button";
import {
  BookOpenIcon,
  InfoIcon,
  ContactIcon,
  FolderIcon,
  BookmarkIcon,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import { Task } from "@/shared/types/Task"; // Предполагаю, что у тебя есть тип Task

interface TaskSidebarProps {
  task: Task;
  taskProjects: any[];
  onTakeTask: () => void;
}

export function TaskSidebar({
  task,
  taskProjects,
  onTakeTask,
}: TaskSidebarProps) {
  return (
    <aside className="lg:w-1/5 w-full lg:sticky lg:top-0 lg:h-screen">
      <nav className="flex flex-col justify-between bg-white border rounded-lg p-6 text-sm h-full lg:max-h-screen">
        <div className="flex flex-col gap-4">
          <Link
            href="#header"
            className="flex items-center gap-3 p-2 font-medium text-gray-700"
          >
            <BookmarkIcon className="h-4 w-4" />
            <span>Заголовок</span>
          </Link>
          <Link
            href="#description"
            className="flex items-center gap-3 p-2 font-medium text-gray-700"
          >
            <BookOpenIcon className="h-4 w-4" />
            <span>Описание</span>
          </Link>
          <Link
            href="#info"
            className="flex items-center gap-3 p-2 font-medium text-gray-700"
          >
            <InfoIcon className="h-4 w-4" />
            <span>Информация</span>
          </Link>
          {(task.customer.email || task.customer.phone) && (
            <Link
              href="#contacts"
              className="flex items-center gap-3 p-2 font-medium text-gray-700"
            >
              <ContactIcon className="h-4 w-4" />
              <span>Контакты</span>
            </Link>
          )}
          {taskProjects?.length > 0 && (
            <Link
              href="#projects"
              className="flex items-center gap-3 p-2 font-medium text-gray-700"
            >
              <FolderIcon className="h-4 w-4" />
              <span>Проекты</span>
            </Link>
          )}
        </div>
        <Button
          variant="default"
          className="mt-6 w-full flex items-center gap-2"
          onClick={onTakeTask}
        >
          Взять задачу
        </Button>
      </nav>
    </aside>
  );
}
