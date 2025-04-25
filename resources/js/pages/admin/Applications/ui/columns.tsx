import { Checkbox } from "@/shared/ui/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/shared/ui/Badge";
import { DataTableColumnHeader } from "@/shared/ui/DataTableColumnHeader";
import { Application } from "../model/Application";

export const columns: ColumnDef<Application>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="mt-1"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Выбрать все"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
      className="mt-1"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Выбрать строку"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Заказчик" />
    ),
    cell: ({ row }) => <div>{row.getValue("customerName")}</div>,
  },
  {
    accessorKey: "customerEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Электронная почта" />
    ),
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("customerEmail")}</div>
    ),
  },
  {
    accessorKey: "customerPhone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Телефон" />
    ),
    cell: ({ row }) => <div>{row.getValue("customerPhone")}</div>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Тип заявки" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant="secondary">
          {type === "task_bank" ? "Банк задач" : "Проект"}
        </Badge>
      );
    },
  },
];
