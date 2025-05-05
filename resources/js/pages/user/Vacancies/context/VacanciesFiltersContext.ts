import { createContext, Dispatch, SetStateAction } from "react";
import { VacanciesFilters } from "../model/VacanciesFilters";
import { defaultVacanciesFilters } from "../consts/defaultVacanciesFilters";

type FiltersContext = {
  filters: VacanciesFilters;
  setFilters: Dispatch<SetStateAction<VacanciesFilters>>;
};

export const VacanciesFiltersContext = createContext<FiltersContext>({
  filters: defaultVacanciesFilters,
  setFilters: () => {},
});
