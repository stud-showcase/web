import { router } from "@inertiajs/react";
import { ProjectsFilters } from "../model/ProjectsFilters";

export const sendProjectsFilters = (filters: ProjectsFilters) => {
  const url = filters.myProjects ? "/myProjects" : "/projects";
  router.get(url, filters);
};
