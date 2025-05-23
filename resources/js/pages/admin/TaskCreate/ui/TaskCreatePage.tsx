import { AdminLayout } from "@/layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import { TaskCreateForm } from "./TaskCreateForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/Breadcrumb";
import { TaskTag } from "@/entities/Task";

export default function TaskPage({tags}: {tags: TaskTag[]}) {
  return (
    <>
      <Head>
        <title>Создание задачи</title>
      </Head>
      <AdminLayout>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/tasks">Банк задач</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Создание задачи</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <TaskCreateForm tags={tags} />
      </AdminLayout>
    </>
  );
}
