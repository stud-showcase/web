import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { TaskBankTags } from "./TaskBankTags";
import { TaskTag } from "@/entities/Task";

export default function TaskBankSettingsPage({ tags }: { tags: TaskTag[] }) {
  return (
    <>
      <Head>
        <title>Настройки банка задач</title>
      </Head>
      <AdminLayout
        headerSlot={<Heading level={2}>Настройки банка задач</Heading>}
      >
        <div className="max-w-5xl">
        <TaskBankTags tags={tags} />

        </div>
      </AdminLayout>
    </>
  );
}
