export type ServerPaginatedData<TData> = {
  data: TData[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  links: Record<number, string>;
};