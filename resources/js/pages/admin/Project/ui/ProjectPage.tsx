import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
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
          <ProjectEditForm project={project} />
        </div>
      </AdminLayout>
    </>
  );
}
