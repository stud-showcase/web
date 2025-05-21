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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import { Filter } from "lucide-react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { ServerPaginatedData } from "../types/ServerPaginatedData";
import { ReactNode } from "react";
import { router } from "@inertiajs/react";

type PaginationProps<TData> = {
  paginatedData: ServerPaginatedData<TData>;
};

function DataTablePagination<TData>({ paginatedData }: PaginationProps<TData>) {
  const { currentPage, perPage, total, lastPage, links } = paginatedData;
  console.log(paginatedData);

  const handleFirstPage = () => {
    router.get(links[1]);
  };

  // TODO почему приходят не все links?
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
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Строк на странице</p>
          <Select value={`${perPage}`}>
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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

interface DataTableProps<TData extends { id: string | number }> {
  data: ServerPaginatedData<TData>;
  columns: ColumnDef<TData>[];
  filtersSlot?: ReactNode;
}

interface ColumnDef<TData> {
  title: string;
  cell: (data: TData) => React.ReactNode;
}

// TODO:
// 1. Сделать поиск
// 2. Сделать фильтры
// 3. Сделать переключение perPage
// 4. Сделать переход на страницу конкретной строки таблицы
export function DataTable<TData extends { id: string | number }>({
  data,
  columns,
  filtersSlot,
}: DataTableProps<TData>) {
  return (
    <div className="rounded-md border overflow-x-auto shadow-sm">
      <div className="py-3 px-4 border-b flex items-center justify-between">
        <Input
          placeholder="Поиск..."
          className="min-w-[150px] lg:min-w-[280px] max-w-fit"
        />
        {filtersSlot && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter />
                Фильтры
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px] p-4">
              <div className="flex items-center justify-between mb-2">
                <DropdownMenuLabel className="p-0 font-semibold text-lg">
                  Фильтры
                </DropdownMenuLabel>
                <DropdownMenuItem className="p-0 focus:bg-transparent cursor-pointer">
                  <Button variant="outline" size="sm">
                    Сбросить
                  </Button>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <div className="space-y-4 mt-4">{filtersSlot}</div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <Table>
        <TableHeader className="bg-muted/60">
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.title}
                className="font-semibold max-w-[200px] truncate"
              >
                {column.title}
              </TableHead>
            ))}
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
