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

export default function ProjectPage({ p }: { project: ExtendedProject }) {
  const project = {};

  project.id = 134;
  project.name = "asdasd";
  project.annotation = "asdasdas";
  project.status = { id: 1, name: "В ожидании" };
  project.isHiring = false;

  // console.log(props);
  return (
    <>
      <Head>
        <title>Проект</title>
      </Head>
      <AdminLayout>
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
        <div className="flex items-center justify-between gap-2">
          <Heading level={1}>Проект №{project.id}</Heading>
          <Button variant="destructive">
            <Trash2 />
            Удалить
          </Button>
        </div>
        <ProjectEditForm project={project} />
      </AdminLayout>
    </>
  );
}
