import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head, Link } from "@inertiajs/react";
import { TaskBankTable } from "./TaskBankTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Task } from "@/entities/Task";
import { Button } from "@/shared/ui/Button";
import { Plus } from "lucide-react";
import { TaskBankFiltersContext } from "../context/TaskBankFiltersContext";
import { useFilters } from "@/shared/hooks/useFilters";
import { TaskBankFilters } from "../model/TaskBankFilters";

type Props = {
  tasks: ServerPaginatedData<Task>;
  filters: TaskBankFilters;
  availableFilters: { customers: string[] };
};

const defaultTaskBankFilters: TaskBankFilters = {
  search: undefined,
  complexity: [],
  customers: [],
};

export default function TaskBankPage(props: Props) {
  const { tasks, availableFilters, filters: appliedFilters } = props;

  const {
    filters,
    setFilters,
    handleFiltersApply,
    handleFiltersReset,
    handleSearch,
  } = useFilters<TaskBankFilters>(
    defaultTaskBankFilters,
    appliedFilters,
  );

  return (
    <>
      <Head>
        <title>Банк задач</title>
      </Head>
      <AdminLayout>
        <div className="flex items-center justify-between">
          <Heading level={1}>Банк задач</Heading>
          <Button size="sm" variant="outline" asChild>
            <Link href="/admin/tasks/create">
              <Plus />
              Создать
            </Link>
          </Button>
        </div>
        <TaskBankFiltersContext.Provider value={{ filters, setFilters }}>
          <TaskBankTable
            tasks={tasks}
            customers={availableFilters.customers}
            handleSearch={handleSearch}
            handleFiltersApply={handleFiltersApply}
            handleFiltersReset={handleFiltersReset}
          />
        </TaskBankFiltersContext.Provider>
      </AdminLayout>
    </>
  );
}
