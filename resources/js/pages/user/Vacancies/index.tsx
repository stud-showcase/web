import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { VacanciesPageFilterPanel } from "./ui/VacanciesPageFilterPanel";
import { VacanciesPageContent } from "./ui/VacanciesPageContent";
import { FullVacancy } from "./types/FullVacancy";
import { project, task, vacancy } from "@/shared/mocks";

export default function VacanciesPage({}: { vacancies: FullVacancy[] }) {
  const vacancies = Array(20).fill({ vacancy, project, task });

  return (
    <>
      <Head>
        <title>Вакансии</title>
      </Head>
      <UserLayout>
        <FiltersItemsLayout
          heading="Вакансии"
          content={<VacanciesPageContent vacancies={vacancies} />}
          filterPanel={<VacanciesPageFilterPanel />}
        />
      </UserLayout>
    </>
  );
}
