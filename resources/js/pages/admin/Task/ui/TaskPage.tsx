import { TaskTag } from "@/entities/Task";
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
import { TasksFiles } from "./TaskFiles";
import { ExtendedTask } from "../model/ExtendedTask";
import { TaskProjects } from "./TaskProject";

export default function TaskPage({ task, tags }: { task: ExtendedTask, tags: TaskTag[] }) {
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
                <Link href="/admin/tasks">Банк задач</Link>
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
        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 items-start">
          <TaskEditForm task={task} tags={tags} />
          <TasksFiles id={task.id} files={task.files} />
        </div>
        <div className="mt-4">
          <TaskProjects projects={task.projects} />
        </div>
      </AdminLayout>
    </>
  );
}
