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

// TODO: убрать
const tagsOptions = [
  { label: "Тэг1", value: "tag1" },
  { label: "Тэг2", value: "tag2" },
  { label: "Тэг3", value: "tag3" },
];

export default function ApplicationPage({
  taskRequest: application,
}: {
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
    post("/admin/tasks/create", {
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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/applications">Заявки</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Обработка заявки</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <TaskCreateForm
          data={data}
          setData={setData}
          errors={errors}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          tags={tagsOptions}
          files={application.files}
        />
      </AdminLayout>
    </>
  );
}
