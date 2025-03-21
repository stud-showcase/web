import { SearchBar } from "@/features/SearchBar";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { mockTasks } from "./mock";
import { TaskCard } from "./ui/TaskCard";
import { TasksFilterPanel } from "./ui/TaskFilterPanel";

function TaskBankContent() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <SearchBar />
      {mockTasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </div>
  );
}

export default function TaskBankPage() {
  return (
    <>
      <Head>
        <title>Банк задач</title>
      </Head>
      <UserLayout>
        <FiltersItemsLayout
          heading="Банк задач"
          filterPanel={<TasksFilterPanel />}
          content={<TaskBankContent />}
        />
      </UserLayout>
    </>
  );
}
