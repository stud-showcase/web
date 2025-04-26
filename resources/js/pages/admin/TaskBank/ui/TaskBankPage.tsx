import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { TaskBankTable } from "./TaskBankTable";

export default function TaskBankPage() {
  return (
    <>
      <Head>
        <title>Банк задач</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Банк задач</Heading>
        <TaskBankTable />
      </AdminLayout>
    </>
  );
}
