import { router } from "@inertiajs/react";
import { ProjectsFilters } from "../model/ProjectsFilters";
import { tabToUrl } from "../consts/tabToUrl";
import { getCurrentTab } from "./getCurrentTab";

export const sendProjectsFilters = (filters: ProjectsFilters, currentTab?: "my" | "all") => {
  let url = tabToUrl[currentTab ?? getCurrentTab()];
  router.get(url, filters);
};
