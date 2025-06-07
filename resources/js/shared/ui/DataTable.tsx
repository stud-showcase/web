import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Filter } from "lucide-react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { ServerPaginatedData } from "../types/ServerPaginatedData";
import { ReactNode } from "react";
import { router, Link } from "@inertiajs/react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "./Popover";
import { Text } from "./Text";

type PaginationProps<TData> = {
  paginatedData: ServerPaginatedData<TData>;
};

function DataTablePagination<TData>({ paginatedData }: PaginationProps<TData>) {
  const { currentPage, total, lastPage, links } = paginatedData;

  const handleFirstPage = () => {
    router.get(links[1]);
  };

  const handleLastPage = () => {
    router.get(links[lastPage]);
  };

  const handlePrevPage = () => {
    router.get(links[currentPage - 1]);
  };

  const handleNextPage = () => {
    router.get(links[currentPage + 1]);
  };

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">{total} строк</div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[120px] items-center justify-center text-sm font-medium">
          Страница {currentPage} из {lastPage}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={currentPage === 1}
            onClick={handleFirstPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === lastPage}
            onClick={handleNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            disabled={currentPage === lastPage}
            onClick={handleLastPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DataTableProps<TData> {
  data: ServerPaginatedData<TData>;
  columns: ColumnDef<TData>[];
  rowRoute: string;
  search: string;
  onSearch: (value: string) => void;
  onFiltersApply?: () => void;
  onFiltersReset?: () => void;
  filtersSlot?: ReactNode;
}

export interface ColumnDef<TData> {
  title: string;
  cell: (data: TData) => React.ReactNode;
}

export function DataTable<TData extends { id: number | string }>({
  data,
  columns,
  rowRoute,
  search,
  onSearch,
  onFiltersApply,
  onFiltersReset,
  filtersSlot,
}: DataTableProps<TData>) {
  return (
    <div className="rounded-md border overflow-x-auto bg-background shadow-sm">
      <div className="py-3 px-4 border-b flex items-center justify-between">
        <Input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Поиск..."
          className="min-w-[150px] lg:min-w-[280px] max-w-fit"
        />
        {filtersSlot && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-96">
              <Text variant="large" className="font-semibold">
                Фильтры
              </Text>
              <div className="space-y-4 mt-4">{filtersSlot}</div>
              <div className="flex gap-2 mt-4">
                <PopoverClose asChild>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={onFiltersReset}
                  >
                    Сбросить
                  </Button>
                </PopoverClose>
                <PopoverClose asChild>
                  <Button className="flex-1" onClick={onFiltersApply}>
                    Сохранить
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.title}
                className="font-semibold max-w-[200px] truncate"
              >
                {column.title}
              </TableHead>
            ))}
            <TableHead className="font-semibold max-w-[200px] truncate">
              Действие
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.length ? (
            data.data.map((item, index) => (
              <TableRow key={item.id || index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.title}
                    className="max-w-[200px] truncate"
                  >
                    {column.cell(item)}
                  </TableCell>
                ))}
                <TableCell className="max-w-[200px] truncate text-primary">
                  <Link href={`${rowRoute}/${item.id}`}>Перейти</Link>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Нет результатов.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="px-4 py-5 border-t">
        <DataTablePagination paginatedData={data} />
      </div>
    </div>
  );
}
