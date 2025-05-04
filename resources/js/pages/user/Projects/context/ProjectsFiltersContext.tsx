import { createContext, Dispatch, SetStateAction } from "react";
import { Filters } from "../model/Filters";
import { defaultFilters } from "../consts/defaultFilters";

type FiltersContext = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

export const ProjectsFiltersContext = createContext<FiltersContext>({
  filters: defaultFilters,
  setFilters: () => {},
});
