import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { ProjectsPageFilterPanel } from "./ProjectsPageFilterPanel";
import { ProjectsPageContent } from "./ProjectsPageContent";
import { ExtendedProject } from "../model/ExtendedProject";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Heading } from "@/shared/ui/Heading";
import { Container } from "@/shared/ui/Container";
import { TaskTag } from "@/entities/Task";

type Props = {
  projects: ServerPaginatedData<ExtendedProject>;
  userProjects: ServerPaginatedData<ExtendedProject>;
  availableFilters: { tags: TaskTag[] };
};

export default function ProjectsPage(props: Props) {
  const { projects, userProjects, availableFilters } = props;

  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <Heading level={1}>Проекты</Heading>
          <div className="grid mt-6 grid-cols-1 lg:grid-cols-4 gap-6">
            <ProjectsPageFilterPanel tags={availableFilters.tags} />
            <div className="lg:col-span-3">
              <ProjectsPageContent
                projects={projects}
                userProjects={userProjects}
              />
            </div>
          </div>
        </Container>
      </UserLayout>
    </>
  );
}
