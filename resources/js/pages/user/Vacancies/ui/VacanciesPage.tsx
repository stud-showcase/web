import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { VacanciesPageFilterPanel } from "./VacanciesPageFilterPanel";
import { VacanciesPageContent } from "./VacanciesPageContent";
import { project, task, vacancy } from "@/shared/mocks";
import { ExtendedVacancy } from "../model/ExtendedVacancy";

export default function VacanciesPage({}: { vacancies: ExtendedVacancy[] }) {
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
