import { createFiltersContext } from "@/shared/context/FiltersContext";
import { ProjectsFilters } from "../model/ProjectsFilters";

export const ProjectsFiltersContext = createFiltersContext<ProjectsFilters>();
