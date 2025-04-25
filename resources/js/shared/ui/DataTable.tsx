import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table";
import { DataTablePagination } from "@/shared/ui/DataTablePagination";
import { DataTableToolbar, FilterConfig, SearchConfig } from "./DataTableToolbar";
import { Button } from "@/shared/ui/Button";
import { Edit } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  labels?: { [key: string]: string };
  onEdit?: (row: TData) => void;
  onDelete?: (selectedRows: TData[]) => void;
  searchConfig?: SearchConfig;
  filterConfig?: FilterConfig[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  labels,
  onEdit,
  onDelete,
  searchConfig,
  filterConfig,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columnsWithActions = React.useMemo(() => {
    if (!onEdit) return columns;
    return [
      ...columns,
      {
        id: "actions",
        cell: ({ row }) => (
          <Button
            variant="ghost"
            className="text-primary"
            onClick={() => onEdit(row.original)}
          >
            <Edit />
            Изменить
          </Button>
        ),
      },
    ];
  }, [columns, onEdit]);

  const table = useReactTable({
    data,
    columns: columnsWithActions,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: (row, columnId, filterValue) => {
      if (!searchConfig || !filterValue) return true;
      return searchConfig.columnIds.some((id) => {
        const value = row.getValue(id);
        return value
          ? String(value).toLowerCase().includes(String(filterValue).toLowerCase())
          : false;
      });
    },
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchConfig={searchConfig}
        filterConfig={filterConfig}
        onDelete={onDelete}
        labels={labels}
      />
      <div className="rounded-md border overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan} className="max-w-[200px] truncate">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="max-w-[200px] truncate">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
