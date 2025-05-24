import { AdminLayout } from "@/layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/Breadcrumb";
import { TaskTag } from "@/entities/Task";
import { TaskCreateForm, TaskForm } from "@/features/TaskCreateForm";
import { FormEvent } from "react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { Heading } from "@/shared/ui/Heading";

// TODO: убрать
const tagsOptions = [
  { label: "Тэг1", value: "tag1" },
  { label: "Тэг2", value: "tag2" },
  { label: "Тэг3", value: "tag3" },
];

export default function TaskCreatePage({ tags }: { tags: TaskTag[] }) {
  // const tagsOptions = tags.map((tag) => ({
  //   label: tag.name,
  //   value: tag.id.toString(),
  // }));

  const { data, setData, post, errors, reset, clearErrors } = useForm<TaskForm>(
    {
      title: "",
      description: "",
      customer: "",
      customerEmail: "",
      customerPhone: "",
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
        <Heading level={1}>Создание задачи</Heading>
        <TaskCreateForm
          data={data}
          setData={setData}
          errors={errors}
          handleReset={handleReset}
          handleSubmit={handleSubmit}
          tags={tagsOptions}
        />
      </AdminLayout>
    </>
  );
}
