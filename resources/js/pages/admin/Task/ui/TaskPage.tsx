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
import { Head, Link } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { TaskEditForm } from "./TaskEditForm";
import { TasksFiles } from "./TaskFiles";
import { ExtendedTask } from "../model/ExtendedTask";
import { TaskProjects } from "./TaskProject";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";

export default function TaskPage({
  task,
  tags,
}: {
  task: ExtendedTask;
  tags: TaskTag[];
}) {
  return (
    <>
      <Head>
        <title>Задача</title>
      </Head>
      <AdminLayout>
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center justify-between gap-2 ">
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
            <div className="flex gap-2">
              <Button variant="destructive" size="sm">
                <Trash2 />
                Удалить
              </Button>
            </div>
          </div>
          <Tabs defaultValue="main">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="main">Основная информация</TabsTrigger>
              <TabsTrigger value="files">Файлы задачи</TabsTrigger>
              <TabsTrigger value="projects">Проекты по задаче</TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <TabsContent value="main">
                <TaskEditForm task={task} tags={tags} />
              </TabsContent>
              <TabsContent value="files">
                <TasksFiles id={task.id} files={task.files} />
              </TabsContent>
              <TabsContent value="projects">
                <TaskProjects projects={task.projects} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}
