import { SearchBar } from "@/shared/ui/SearchBar";
import { Task } from "@/entities/Task";
import { TaskCard } from "./TaskCard";

export function TaskBankPageContent({ tasks }: { tasks: Task[] }) {
  return (
    <>
      <SearchBar />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </>
  );
}
