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
import { Head, Link, router } from "@inertiajs/react";
import { Trash2 } from "lucide-react";
import { TaskEditForm } from "./TaskEditForm";
import { TasksFiles } from "./TaskFiles";
import { ExtendedTask } from "../model/ExtendedTask";
import { TaskProjects } from "./TaskProjects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { SettingsCard } from "@/shared/ui/SettingsCard";
import { ConfirmationDialog } from "@/shared/ui/ConfirmationDialog";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";

export default function TaskPage({
  task,
  tags,
}: {
  task: ExtendedTask;
  tags: TaskTag[];
}) {
  const deleteTask = () => {
    router.delete(`/admin/tasks/${task.id}`, {
      onSuccess: () => showSuccessToast("Задача успешно удалена"),
      onError: () => showErrorToast("Произошла ошибка в ходе удаления задачи"),
    });
  };

  return (
    <>
      <Head>
        <title>Задача</title>
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
                <BreadcrumbPage>Задача №{task.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <div className="max-w-5xl space-y-4">
          <Tabs defaultValue="main">
            <TabsList>
              <TabsTrigger value="main">Главное</TabsTrigger>
              <TabsTrigger value="files">Файлы</TabsTrigger>
              <TabsTrigger value="projects">Проекты</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>
            <div className="mt-3">
              <TabsContent value="main">
                <TaskEditForm task={task} tags={tags} />
              </TabsContent>
              <TabsContent value="files">
                <TasksFiles id={task.id} files={task.files} />
              </TabsContent>
              <TabsContent value="projects">
                <TaskProjects id={task.id} projects={task.projects} />
              </TabsContent>
              <TabsContent value="settings">
                <div className="space-y-4">
                  <SettingsCard
                    heading="Удаление задачи"
                    text="В случае удаления задачи вы больше не сможете вернуть ее. Пожалуйста, будьте внимательными."
                    buttonsSlot={
                      <ConfirmationDialog
                        title="Удаление задачи"
                        description="Вы уверены что хотите удалить задачу? Это действие нельзя отменить."
                        onAction={deleteTask}
                      >
                        <Button variant="destructive" size="sm">
                          <Trash2 />
                          Удалить
                        </Button>
                      </ConfirmationDialog>
                    }
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}
