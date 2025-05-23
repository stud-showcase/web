import { createFiltersContext } from "@/shared/context/FiltersContext";
import { VacanciesFilters } from "../model/VacanciesFilters";

export const VacanciesFiltersContext = createFiltersContext<VacanciesFilters>();
