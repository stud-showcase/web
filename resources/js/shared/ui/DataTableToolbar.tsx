import { Table } from "@tanstack/react-table";
import { Filter, Trash2, X } from "lucide-react";

import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { DataTableViewOptions } from "@/shared/ui/DataTableViewOptions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import React from "react";

export interface SearchConfig {
  columnIds: string[];
  placeholder?: string;
}

export interface FilterConfig {
  label: string;
  columnId: string;
  filters: {
    label: string;
    value: string;
  }[];
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchConfig?: SearchConfig;
  filterConfig?: FilterConfig[];
  onDelete?: (selectedRows: TData[]) => void;
  labels?: { [key: string]: string };
}

export function DataTableToolbar<TData>({
  table,
  searchConfig,
  filterConfig,
  onDelete,
  labels,
}: DataTableToolbarProps<TData>) {
  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const [searchValue, setSearchValue] = React.useState("");

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    table.setGlobalFilter(value);
  };

  const resetFilters = () => {
    table.resetColumnFilters();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {onDelete && selectedRows.length > 0 && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => onDelete(selectedRows)}
          >
            <Trash2 />
          </Button>
        )}
        {searchConfig && (
          <Input
            placeholder={searchConfig.placeholder || "Поиск..."}
            value={searchValue}
            onChange={(event) => handleSearchChange(event.target.value)}
            className="min-w-[150px] lg:min-w-[280px] max-w-fit"
          />
        )}
      </div>
      <div className="flex gap-2">
        {filterConfig && filterConfig.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px] p-4">
              <div className="flex items-center justify-between mb-2">
                <DropdownMenuLabel className="p-0 font-semibold text-lg">
                  Фильтры
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={resetFilters}
                  className="p-0 focus:bg-transparent cursor-pointer"
                >
                  <Button variant="outline" size="sm">
                    Сбросить
                  </Button>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <div className="space-y-4 mt-4">
                {filterConfig.map((group, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      {group.label}
                    </h3>
                    <Select
                      value={
                        (table
                          .getColumn(group.columnId)
                          ?.getFilterValue() as string) || "all"
                      }
                      onValueChange={(value) => {
                        table
                          .getColumn(group.columnId)
                          ?.setFilterValue(value === "all" ? undefined : value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        {group.filters.map((filter) => (
                          <SelectItem key={filter.value} value={filter.value}>
                            {filter.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <DataTableViewOptions table={table} labels={labels} />
      </div>
    </div>
  );
}
