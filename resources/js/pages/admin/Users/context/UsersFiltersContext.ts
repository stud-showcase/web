import { createFiltersContext } from "@/shared/context/FiltersContext";
import { UsersFilters } from "../model/UsersFilters";

export const UsersFiltersContext = createFiltersContext<UsersFilters>();
