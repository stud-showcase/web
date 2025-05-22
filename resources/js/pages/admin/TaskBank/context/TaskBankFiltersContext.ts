import { createContext, Dispatch, SetStateAction } from "react";
import { TaskBankFilters } from "../model/TaskBankFilters";
import { defaultTaskBankFilters } from "../consts/defaultTaskBankFilters";

type FiltersContext = {
  filters: TaskBankFilters;
  setFilters: Dispatch<SetStateAction<TaskBankFilters>>;
};

export const TaskBankFiltersContext = createContext<FiltersContext>({
  filters: defaultTaskBankFilters,
  setFilters: () => {},
});
