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
import { ExtendedProject } from "../model/ExtendedProject";
import { NameSection } from "./NameSection";
import { DescriptionSection } from "./DescriptionSection";
import { HiringSection } from "./HiringSection";
import { FilesSection } from "./FIlesSection";
import { MembersSection } from "./MembersSection";
import { VacanciesSection } from "./VacanciesSection";
import { InvitesSection } from "./InvitesSection";

export default function ProjectControlPanel({
  project,
}: {
  project: ExtendedProject;
}) {
  console.log(project)

  return (
    <>
      <Head>
        <title>Панель управления</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <header>
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
          </header>

          <div className="mt-8 flex flex-col gap-6">
            <NameSection id={project.id} name={project.name} />
            <DescriptionSection id={project.id} description={project.annotation} />
            <HiringSection id={project.id} isHiring={project.isHiring} />
            <FilesSection files={project.files} />
            <MembersSection mentor={project.mentor} members={project.members} />
            <VacanciesSection vacancies={project.vacancies} />
            <InvitesSection invites={project.invites} />
          </div>
        </Container>
      </UserLayout>
    </>
  );
}
