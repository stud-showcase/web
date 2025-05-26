import { AdminLayout } from "@/layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { TaskBankTags } from "./TaskBankTags";
import { TaskTag } from "@/entities/Task";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/Breadcrumb";

export default function TaskBankSettingsPage({ tags }: { tags: TaskTag[] }) {
  return (
    <>
      <Head>
        <title>Настройки банка задач</title>
      </Head>
      <AdminLayout
        headerSlot={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/tasks">Банк задач</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Настройки</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <div className="max-w-5xl">
          <TaskBankTags tags={tags} />
        </div>
      </AdminLayout>
    </>
  );
}
