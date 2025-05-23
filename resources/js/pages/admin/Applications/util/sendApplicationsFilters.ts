import { router } from "@inertiajs/react";
import { tabToUrl } from "../consts/tabToUrl";
import { getCurrentTab } from "./getCurrentTab";
import { ApplicationsFilters } from "../model/ApplicationsFilters";

export const sendApplicationsFilters = (
  filters: ApplicationsFilters,
  currentTab?: "my" | "all"
) => {
  let url = tabToUrl[currentTab ?? getCurrentTab()];
  router.get(url, filters, { preserveScroll: true, preserveState: true });
};
