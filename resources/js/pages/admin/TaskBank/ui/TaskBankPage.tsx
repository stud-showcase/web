import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { TaskBankTable } from "./TaskBankTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Task } from "@/entities/Task";

type Props = {
  tasks: ServerPaginatedData<Task>;
  filters: any;
  availableFilters: any;
};

export default function TaskBankPage(props: Props) {
  const { tasks, availableFilters, filters: appliedFilters } = props;
  console.log(tasks);

  return (
    <>
      <Head>
        <title>Банк задач</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Банк задач</Heading>
        <TaskBankTable tasks={tasks} />
      </AdminLayout>
    </>
  );
}
