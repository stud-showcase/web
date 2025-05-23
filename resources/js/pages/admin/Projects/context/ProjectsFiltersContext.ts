import { createContext, Dispatch, SetStateAction } from "react";
import { ProjectsFilters } from "../model/ProjectsFilters";
import { defaultProjectFilters } from "../consts/defaultProjectFilters";

type FiltersContext = {
  filters: ProjectsFilters;
  setFilters: Dispatch<SetStateAction<ProjectsFilters>>;
};

export const ProjectsFiltersContext = createContext<FiltersContext>({
  filters: defaultProjectFilters,
  setFilters: () => {},
});
