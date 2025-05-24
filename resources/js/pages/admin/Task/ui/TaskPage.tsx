import { Task } from "@/entities/Task";
import { AdminLayout } from "@/layouts/AdminLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/Breadcrumb";
import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";
import { Head, Link } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { TaskEditForm } from "./TaskEditForm";

export default function TaskPage({ task }: { task: Task }) {
  return (
    <>
      <Head>
        <title>Заявка</title>
      </Head>
      <AdminLayout>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/applications">Заявки</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Задача №{task.id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center justify-between gap-2 ">
          <Heading level={1}>Задача №{task.id}</Heading>
          <div className="flex gap-2">
            <Button variant="destructive">
              <Trash2 />
              Удалить
            </Button>
          </div>
        </div>
        <TaskEditForm task={task} />
      </AdminLayout>
    </>
  );
}
