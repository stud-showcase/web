import { Head } from "@inertiajs/react";
import { Container } from "@/shared/ui/Container";
import { UserLayout } from "@/layouts/UserLayout";
import { HeaderSection } from "./HeaderSection";
import { DescriptionSection } from "./DescriptionSection";
import { InfoSection } from "./InfoSection";
import { ProjectsSection } from "./ProjectsSection";
import { ExtendedTask } from "../model/ExtendedTask";

export default function TaskPage({ task }: { task: ExtendedTask }) {
  return (
    <>
      <Head>
        <title>{task.title}</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <main>
            <HeaderSection
              id={task.id}
              title={task.title}
              canTake={task.canTake}
              tags={task.tags}
              complexity={task.complexity}
            />

            <DescriptionSection
              description={task.description}
              files={task.files}
            />

            <InfoSection
              deadline={task.deadline}
              maxMembers={task.maxMembers}
              customer={task.customer}
            />

            <ProjectsSection projects={task.projects} />
          </main>
        </Container>
      </UserLayout>
    </>
  );
}
