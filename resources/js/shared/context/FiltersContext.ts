import { createContext, Dispatch, SetStateAction } from "react";
import { ServerBaseFilters } from "../types/ServerBaseFilters";


export type FiltersContext<TFilters> = {
  filters: ServerBaseFilters & TFilters;
  setFilters: Dispatch<SetStateAction<TFilters>>;
};

export const createFiltersContext = <TFilters>() =>
  createContext<FiltersContext<TFilters>>({
    filters: {} as ServerBaseFilters & TFilters,
    setFilters: () => {},
  });
