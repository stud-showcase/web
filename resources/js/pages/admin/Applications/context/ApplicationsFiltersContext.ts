import { createFiltersContext } from "@/shared/context/FiltersContext";
import { ApplicationsFilters } from "../model/ApplicationsFilters";

export const ApplicationsFiltersContext =
  createFiltersContext<ApplicationsFilters>();
