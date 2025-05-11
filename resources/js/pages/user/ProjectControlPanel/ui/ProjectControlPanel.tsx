import { UserLayout } from "@/layouts/UserLayout";
import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/Breadcrumb";
import { Head, Link } from "@inertiajs/react";
import { Project } from "@/entities/Project";

export default function ProjectControlPanel({ project }: { project: Project }) {
  console.log(project);

  return (
    <>
      <Head>
        <title>Панель управления</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/projects">Проекты</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/projects/${project.id}`}>{project.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Панель управления</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Heading level={1} className="mt-6">
            Панель управления
          </Heading>
        </Container>
      </UserLayout>
    </>
  );
}
