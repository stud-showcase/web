import { SearchBar } from "@/shared/ui/SearchBar";
import { Task } from "@/entities/Task";
import { TaskCard } from "./TaskCard";
import { useContext } from "react";
import { TaskBankFiltersContext } from "../context/TaskBankFiltersContext";
import { sendTaskBankFilters } from "../util/sendTaskBankFilters";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { DataPagination } from "@/shared/ui/DataPagination";
import { Text } from "@/shared/ui/Text";

function NoTasksText() {
  return <Text variant="large">Не было найдено задач</Text>;
}

export function TaskBankPageContent({
  tasks,
}: {
  tasks: ServerPaginatedData<Task>;
}) {
  const { filters, setFilters } = useContext(TaskBankFiltersContext);

  const handleSearch = () => {
    sendTaskBankFilters(filters);
  };

  const handleChange = (value: string) => {
    setFilters({ ...filters, search: value || undefined });
  };

  return (
    <>
      <SearchBar
        value={filters.search ?? ""}
        onChange={handleChange}
        onSearch={handleSearch}
      />
      <div className="flex flex-col mt-4 gap-6">
        {tasks.data.length === 0 ? (
          <NoTasksText />
        ) : (
          tasks.data.map((task) => <TaskCard task={task} key={task.id} />)
        )}
      </div>
      <DataPagination paginatedData={tasks} className="mt-6" />
    </>
  );
}
