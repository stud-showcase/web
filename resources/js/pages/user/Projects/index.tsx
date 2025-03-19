import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { SearchBar } from "./ui/SearchBar";
import { FilterPanel } from "./ui/FilterPanel";
import { ProjectList } from "./ui/ProjectList";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <UserLayout>
        <Container className="pt-8 pb-12">
          <div className="flex lg:flex-row flex-col justify-between lg:items-center gap-4">
            <Heading level={1}>Проекты</Heading>
            <SearchBar />
          </div>

          <div className="grid mt-6 grid-cols-1 lg:grid-cols-4 gap-6">
            <FilterPanel />
            <ProjectList />
          </div>
        </Container>
      </UserLayout>
    </>
  );
}
