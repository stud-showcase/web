import { router } from "@inertiajs/react";
import { VacanciesFilters } from "../model/VacanciesFilters";

export const sendVacanciesFilters = (filters: VacanciesFilters) => {
  router.get("/vacancies", filters);
};
