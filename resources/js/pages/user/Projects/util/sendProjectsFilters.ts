import { router } from "@inertiajs/react";
import { ProjectsFilters } from "../model/ProjectsFilters";

export const sendProjectsFilters = (filters: ProjectsFilters) => {
  router.get("/projects", filters);
};
