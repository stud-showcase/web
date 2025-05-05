import { router } from "@inertiajs/react";
import { TaskBankFilters } from "../model/TaskBankFilters";

export const sendTaskBankFilters = (filters: TaskBankFilters) => {
  router.get("/tasks", filters);
}
