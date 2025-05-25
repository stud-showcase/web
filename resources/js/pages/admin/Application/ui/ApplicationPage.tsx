import { FormEvent } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
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
import { Button } from "@/shared/ui/Button";
import { Trash2, UserCog } from "lucide-react";
import { TaskTag } from "@/entities/Task";

export default function ApplicationPage({
  tags,
  taskRequest: application,
}: {
  tags: TaskTag[];
  taskRequest: Application;
}) {
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

  return (
    <>
      <Head>
        <title>Заявка</title>
      </Head>
      <AdminLayout>
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center gap-2 justify-between">
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
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <UserCog />
                Назначить
              </Button>
              <Button variant="destructive" size="sm">
                <Trash2 />
                Удалить
              </Button>
            </div>
          </div>
          <TaskCreateForm
            data={data}
            setData={setData}
            errors={errors}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            tags={tags}
            files={application.files}
          />
        </div>
      </AdminLayout>
    </>
  );
}
