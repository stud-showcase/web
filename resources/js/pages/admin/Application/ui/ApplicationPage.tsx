import { FormEvent } from "react";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { Application } from "@/entities/Application";
import { AdminLayout } from "@/layouts/AdminLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/Breadcrumb";
import { TaskCreateForm, TaskForm } from "@/features/TaskCreateForm";
import { TaskTag } from "@/entities/Task";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { SettingsCard } from "@/shared/ui/SettingsCard";
import { Button } from "@/shared/ui/Button";
import { Trash2 } from "lucide-react";
import { isAdmin, User } from "@/entities/User";
import { useAuth } from "@/shared/hooks/useAuth";
import { AppointResponsibleUser } from "./AppointResponsibleUser";
import { ConfirmationDialog } from "@/shared/ui/ConfirmationDialog";

export default function ApplicationPage({
  tags,
  taskRequest: application,
  users,
}: {
  tags: TaskTag[];
  taskRequest: Application;
  users: User[];
}) {
  const { user } = useAuth();

  const { data, setData, post, errors, reset, clearErrors } = useForm<TaskForm>(
    {
      title: application.title,
      description: application.description,
      customer: application.customer,
      customerEmail: application.customerEmail,
      customerPhone: application.customerPhone || "",
      maxMembers: "10",
      deadline: "",
      complexityId: "",
      maxProjects: "",
      files: [],
      tags: [],
    }
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(`/admin/applications/${application.id}`, {
      onSuccess: () =>
        showSuccessToast("Задача успешно добавлена в банк задач"),
      onError: () => showErrorToast("Произошла ошибка в ходе создания задачи"),
    });
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset();
    clearErrors();
  };

  const deleteApplication = () => {
    router.delete(`/admin/applications/${application.id}`, {
      onSuccess: () => showSuccessToast("Заявка успешно удалена"),
      onError: () => showErrorToast("Произошла ошибка в ходе удаления заявки"),
    });
  };

  return (
    <>
      <Head>
        <title>Заявка</title>
      </Head>
      <AdminLayout
        headerSlot={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/applications">Заявки</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Заявка №{application.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
      >
        <div className="max-w-5xl space-y-4">
          <Tabs defaultValue="main">
            <TabsList>
              <TabsTrigger value="main">Главное</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>
            <div className="mt-3">
              <TabsContent value="main">
                <TaskCreateForm
                  data={data}
                  setData={setData}
                  errors={errors}
                  handleReset={handleReset}
                  handleSubmit={handleSubmit}
                  tags={tags}
                  files={application.files}
                />
              </TabsContent>
              <TabsContent value="settings">
                <div className="space-y-4">
                  {isAdmin(user) && (
                    <SettingsCard
                      heading="Назначение ответственного для заявки"
                      text="Вы можете назначить ответсвенного для заявки, чтобы он продолжил работу с ней."
                      buttonsSlot={
                        <AppointResponsibleUser
                          id={application.id}
                          users={users}
                          responsibleUser={application.responsibleUser}
                        />
                      }
                    />
                  )}

                  <SettingsCard
                    heading="Удаление заявки"
                    text="В случае удаления заявки вы больше не сможете вернуть ее. Пожалуйста, будьте внимательными."
                    buttonsSlot={
                      <ConfirmationDialog
                        title="Удаление заявки"
                        description="Вы уверены что хотите удалить заявку? Это действие нельзя отменить."
                        onAction={deleteApplication}
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
