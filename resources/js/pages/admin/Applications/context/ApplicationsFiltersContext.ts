import { createContext, Dispatch, SetStateAction } from "react";
import { ApplicationsFilters } from "../model/ApplicationsFilters";
import { defaultApplicationsFilters } from "../consts/defaultApplicationsFilters";

type FiltersContext = {
  filters: ApplicationsFilters;
  setFilters: Dispatch<SetStateAction<ApplicationsFilters>>;
};

export const ApplicationsFiltersContext = createContext<FiltersContext>({
  filters: defaultApplicationsFilters,
  setFilters: () => {},
});
