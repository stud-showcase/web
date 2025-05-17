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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { StatusSection } from "./StatusSection";

export default function ProjectControlPanel({
  project,
}: {
  project: ExtendedProject;
}) {
  console.log(project);

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

          <Tabs defaultValue="project" className="mt-8">
            <TabsList>
              <TabsTrigger value="project">Проект</TabsTrigger>
              <TabsTrigger value="vacancies">Вакансии</TabsTrigger>
              <TabsTrigger value="applications">Заявки</TabsTrigger>
            </TabsList>

            <TabsContent value="project">
              <div className="mt-4 flex flex-col gap-6">
                <NameSection id={project.id} name={project.name} />
                <DescriptionSection
                  id={project.id}
                  description={project.annotation}
                />
                <StatusSection id={project.id} status={project.status} />
                <FilesSection id={project.id} files={project.files} />
                <MembersSection
                  id={project.id}
                  mentor={project.mentor}
                  members={project.members}
                />
              </div>
            </TabsContent>
            <TabsContent value="vacancies">
              <div className="mt-4 flex flex-col gap-6">
                <VacanciesSection id={project.id} vacancies={project.vacancies} />
              </div>
            </TabsContent>
            <TabsContent value="applications">
              <div className="mt-4 flex flex-col gap-6">
                <HiringSection id={project.id} isHiring={project.isHiring} />
                <InvitesSection id={project.id} invites={project.invites} />
              </div>
            </TabsContent>
          </Tabs>
        </Container>
      </UserLayout>
    </>
  );
}
