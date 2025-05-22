import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head, Link } from "@inertiajs/react";
import { TaskBankTable } from "./TaskBankTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Task } from "@/entities/Task";
import { Button } from "@/shared/ui/Button";
import { Plus } from "lucide-react";
import { TaskBankFilters } from "../model/TaskBankFilters";
import { useState } from "react";
import { defaultTaskBankFilters } from "../consts/defaultTaskBankFilters";
import { TaskBankFiltersContext } from "../context/TaskBankFiltersContext";

type Props = {
  tasks: ServerPaginatedData<Task>;
  filters: TaskBankFilters;
  availableFilters: { customers: string[] };
};

export default function TaskBankPage(props: Props) {
  const { tasks, availableFilters, filters: appliedFilters } = props;

  const [filters, setFilters] = useState<TaskBankFilters>({
    ...defaultTaskBankFilters,
    ...appliedFilters,
  });

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
          <TaskBankTable tasks={tasks} customers={availableFilters.customers} />
        </TaskBankFiltersContext.Provider>
      </AdminLayout>
    </>
  );
}
