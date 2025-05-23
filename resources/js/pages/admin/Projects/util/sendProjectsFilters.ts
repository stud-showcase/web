import { router } from "@inertiajs/react";
import { ProjectsFilters } from "../model/ProjectsFilters";

export const sendProjectsFilters = (filters: ProjectsFilters) => {
  router.get("/admin/projects", filters, {
    preserveScroll: true,
    preserveState: true,
  });
};
