import { SearchBar } from "@/shared/components/SearchBar";
import { Task, TaskCard } from "@/entities/Task";

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
