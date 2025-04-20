import { SearchBar } from "@/shared/ui/SearchBar";
import { Task  } from "@/entities/Task";
import { TaskCard } from "./TaskCard";

export function TaskBankPageContent({ tasks }: { tasks: Task[] }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <SearchBar />
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}
