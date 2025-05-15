import { Heading } from "@/shared/ui/Heading";
import { VacancyCard } from "./VacancyCard";
import { Vacancy } from "@/entities/Vacancy";

export function VacanciesSection({ vacancies }: { vacancies: Vacancy[] }) {
  if (vacancies.length === 0) return;

  return (
    <section className="mt-10">
      <Heading level={3}>Вакансии</Heading>
      <div className="mt-4 space-y-4">
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
    </section>
  );
}
