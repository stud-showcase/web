import { CardListWrapper } from "@/features/CardListWrapper";
import { SearchBar } from "@/features/SearchBar";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { mockTasks } from "./mock";
import { TaskCard } from "./ui/TaskCard";
import { TasksFilterPanel } from "./ui/TaskFilterPanel";

function TaskList() {
  return (
    <CardListWrapper>
      {mockTasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </CardListWrapper>
  );
}

export default function TaskBank() {
  return (
    <>
      <Head>
        <title>Банк задач</title>
      </Head>
      <UserLayout>
        <FiltersItemsLayout
          heading="Банк задач"
          filterPanel={<TasksFilterPanel />}
          searchBar={<SearchBar />}
          items={<TaskList />}
        />
      </UserLayout>
    </>
  );
}
