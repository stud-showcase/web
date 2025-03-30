import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { VacanciesPageFilterPanel } from "./ui/VacanciesPageFilterPanel";
import { VacanciesPageContent } from "./ui/VacanciesPageContent";

export default function VacanciesPage() {
  return (
    <>
      <Head>
        <title>Вакансии</title>
      </Head>
      <UserLayout>
        <FiltersItemsLayout
          heading="Вакансии"
          content={<VacanciesPageContent />}
          filterPanel={<VacanciesPageFilterPanel />}
        />
      </UserLayout>
    </>
  );
}
