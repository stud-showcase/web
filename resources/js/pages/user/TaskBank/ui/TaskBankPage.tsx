import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { TasksBankPageFilterPanel } from "./TaskBankPageFilterPanel";
import { TaskBankPageContent } from "./TaskBankPageContent";
import { Task } from "@/entities/Task";
import { task } from "@/shared/mocks";

export default function TaskBankPage({}: { tasks: Task[] }) {
  const tasks = Array(10).fill(task);

  return (
    <>
      <Head>
        <title>Банк задач</title>
      </Head>
      <UserLayout>
        <FiltersItemsLayout
          heading="Банк задач"
          filterPanel={<TasksBankPageFilterPanel />}
          content={<TaskBankPageContent tasks={tasks} />}
        />
      </UserLayout>
    </>
  );
}
