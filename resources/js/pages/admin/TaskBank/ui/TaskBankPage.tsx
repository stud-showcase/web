import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head, Link } from "@inertiajs/react";
import { TaskBankTable } from "./TaskBankTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Task } from "@/entities/Task";
import { Button } from "@/shared/ui/Button";
import { Plus } from "lucide-react";

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
        <div className="flex items-center justify-between">
          <Heading level={1}>Банк задач</Heading>
          <Button size="sm" variant="outline" asChild>
            <Link href="/admin/tasks/create">
              <Plus />
              Создать
            </Link>
          </Button>
        </div>
        <TaskBankTable tasks={tasks} />
      </AdminLayout>
    </>
  );
}
