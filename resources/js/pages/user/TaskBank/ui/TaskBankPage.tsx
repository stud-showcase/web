import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { TasksBankPageFilterPanel } from "./TaskBankPageFilterPanel";
import { TaskBankPageContent } from "./TaskBankPageContent";
import { Task, TaskTag } from "@/entities/Task";
import { TaskBankFilters } from "../model/TaskBankFilters";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { TaskBankFiltersContext } from "../context/TaskBankFiltersContext";
import { useState } from "react";
import { defaultTaskBankFilters } from "../consts/defaultTaskBankFilters";

type Props = {
  tasks: ServerPaginatedData<Task>;
  filters: TaskBankFilters;
  availableFilters: {
    customers: string[];
    tags: TaskTag[];
  };
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
      <UserLayout>
        <TaskBankFiltersContext.Provider value={{ filters, setFilters }}>
          <FiltersItemsLayout
            heading="Банк задач"
            filtersSlot={
              <TasksBankPageFilterPanel
                tags={availableFilters.tags}
                customers={availableFilters.customers}
              />
            }
            contentSlot={<TaskBankPageContent tasks={tasks} />}
          />
        </TaskBankFiltersContext.Provider>
      </UserLayout>
    </>
  );
}
