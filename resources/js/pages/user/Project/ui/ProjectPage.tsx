import { Head } from "@inertiajs/react";
import { UserLayout } from "@/layouts/UserLayout";
import { Container } from "@/shared/ui/Container";
import { HeaderSection } from "./HeaderSection";
import { AnnotationSection } from "./AnnotationSection";
import { FilesSection } from "./FilesSection";
import { MembersSection } from "./MembersSection";
import { VacanciesSection } from "./VacanciesSection";
import { ExtendedProject } from "../model/ExtendedProject";

export default function ProjectPage({ project }: { project: ExtendedProject }) {
  return (
    <>
      <Head>
        <title>{project.name}</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <HeaderSection project={project} />
          <AnnotationSection annotation={project.annotation} />
          <FilesSection files={project.files} />
          <MembersSection mentor={project.mentor} members={project.members} />
          <VacanciesSection vacancies={project.vacancies} />
        </Container>
      </UserLayout>
    </>
  );
}
