import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { TasksBankPageFilterPanel } from "./ui/TaskBankPageFilterPanel";
import { TaskBankPageContent } from "./ui/TaskBankPageContent";

export default function TaskBankPage() {
  return (
    <>
      <Head>
        <title>Банк задач</title>
      </Head>
      <UserLayout>
        <FiltersItemsLayout
          heading="Банк задач"
          filterPanel={<TasksBankPageFilterPanel />}
          content={<TaskBankPageContent />}
        />
      </UserLayout>
    </>
  );
}
