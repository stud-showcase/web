import { SearchBar } from "@/features/SearchBar";
import { mockTasks } from "../mocks";
import { TaskCard } from "./TaskCard";

export function TaskBankPageContent() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <SearchBar />
      {mockTasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}
