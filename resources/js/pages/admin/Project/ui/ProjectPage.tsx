import { AdminLayout } from "@/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { ExtendedProject } from "../model/ExtendedProject";
import { ProjectEditForm } from "./ProjectEditForm";
import { Head, Link, router } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/Breadcrumb";
import { Button } from "@/shared/ui/Button";
import { Trash2 } from "lucide-react";
import { ProjectFiles } from "./ProjectFiles";
import { ProjectMembers } from "./ProjectMembers";
import { ProjectVacancies } from "./ProjectVacancies";
import { ProjectInvites } from "./ProjectInvites";
import { SettingsCard } from "@/shared/ui/SettingsCard";
import { ConfirmationDialog } from "@/shared/ui/ConfirmationDialog";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { AssignMentorModal } from "./AssignMentorModal";
import { User } from "@/entities/User";

export default function ProjectPage({
  project,
  users,
}: {
  project: ExtendedProject;
  users: User[];
}) {
  const deleteProject = () => {
    router.delete(`/admin/projects/${project.id}`, {
      onSuccess: () => showSuccessToast("Проект успешно удален"),
      onError: () => showErrorToast("Произошла ошибка в ходе удаления проекта"),
    });
  };

  return (
    <>
      <Head>
        <title>Проект</title>
      </Head>
      <AdminLayout
        headerSlot={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/projects">Проекты</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Проект №{project.id}</BreadcrumbPage>
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
              <TabsTrigger value="members">Участники</TabsTrigger>
              <TabsTrigger value="vacancies">Вакансии</TabsTrigger>
              <TabsTrigger value="invites">Заявки</TabsTrigger>
              <TabsTrigger value="settings">Настройки</TabsTrigger>
            </TabsList>
            <div className="mt-3">
              <TabsContent value="main">
                <ProjectEditForm project={project} />
              </TabsContent>
              <TabsContent value="files">
                <ProjectFiles id={project.id} files={project.files} />
              </TabsContent>
              <TabsContent value="members">
                <ProjectMembers
                  id={project.id}
                  members={project.members}
                  mentor={project.mentor}
                />
              </TabsContent>
              <TabsContent value="vacancies">
                <ProjectVacancies
                  id={project.id}
                  vacancies={project.vacancies}
                />
              </TabsContent>
              <TabsContent value="invites">
                <ProjectInvites id={project.id} invites={project.invites} />
              </TabsContent>
              <TabsContent value="settings">
                <div className="space-y-4">
                  <SettingsCard
                    heading="Назначение наставника проекта"
                    text="Вы можете назначить наставника для проекта, чтобы он стал его руководителем."
                    buttonsSlot={
                      <AssignMentorModal
                        id={project.id}
                        users={users}
                        mentor={project.mentor}
                      />
                    }
                  />
                  <SettingsCard
                    heading="Удаление проекта"
                    text="В случае удаления проекта вы больше не сможете вернуть его. Пожалуйста, будьте внимательными."
                    buttonsSlot={
                      <ConfirmationDialog
                        title="Удаление проекта"
                        description="Вы уверены что хотите удалить проект? Это действие нельзя отменить."
                        onAction={deleteProject}
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
