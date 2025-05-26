import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";

export default function TaskBankSettingsPage() {
  return (
    <>
      <Head>
        <title>Настройки банка задач</title>
      </Head>
      <AdminLayout
        headerSlot={<Heading level={2}>Настройки банка задач</Heading>}
      >
        TODO
      </AdminLayout>
    </>
  );
}
