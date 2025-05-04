import { router } from "@inertiajs/react";
import { Filters } from "../model/Filters";

export const sendFilters = (filters: Filters) => {
  router.get("/projects", filters, {
    preserveState: true,
    replace: true,
  });
};
