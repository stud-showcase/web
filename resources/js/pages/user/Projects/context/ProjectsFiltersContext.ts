import { createContext, Dispatch, SetStateAction } from "react";
import { ProjectsFilters } from "../model/ProjectsFilters";
import { defaultProjectsFilters } from "../consts/defaultProjectsFilters";

type FiltersContext = {
  filters: ProjectsFilters;
  setFilters: Dispatch<SetStateAction<ProjectsFilters>>;
};

export const ProjectsFiltersContext = createContext<FiltersContext>({
  filters: defaultProjectsFilters,
  setFilters: () => {},
});
