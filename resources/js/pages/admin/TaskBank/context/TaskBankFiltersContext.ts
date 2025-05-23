import { createFiltersContext } from "@/shared/context/FiltersContext";
import { TaskBankFilters } from "../model/TaskBankFilters";

export const TaskBankFiltersContext = createFiltersContext<TaskBankFilters>();
