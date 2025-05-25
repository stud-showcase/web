import { AdminLayout } from "@/layouts/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { ExtendedProject } from "../model/ExtendedProject";
import { ProjectEditForm } from "./ProjectEditForm";
import { Head, Link } from "@inertiajs/react";
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

export default function ProjectPage({ project }: { project: ExtendedProject }) {
  return (
    <>
      <Head>
        <title>Проект</title>
      </Head>
      <AdminLayout>
        <div className="max-w-4xl space-y-4">
          <div className="flex items-center justify-between gap-2">
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
            <Button variant="destructive" size="sm">
              <Trash2 />
              Удалить
            </Button>
          </div>

          <Tabs defaultValue="main">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="main">Основная информация</TabsTrigger>
              <TabsTrigger value="files">Файлы</TabsTrigger>
              <TabsTrigger value="members">Участники</TabsTrigger>
              <TabsTrigger value="vacancies">Вакансии</TabsTrigger>
              <TabsTrigger value="invites">Заявки</TabsTrigger>
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
            </div>
          </Tabs>
        </div>
      </AdminLayout>
    </>
  );
}
