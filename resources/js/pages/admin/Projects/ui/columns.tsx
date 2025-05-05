import { Checkbox } from "@/shared/ui/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/ui/DataTableColumnHeader";
import {
  ProjectHiringBadge,
  Project,
  ProjectStatus,
  ProjectStatusBadge,
} from "@/entities/Project";

export const columns: ColumnDef<Project>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "mentor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Наставник" />
    ),
    cell: ({ row }) => <div>{row.getValue("mentor") as string || "-"}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Статус" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as ProjectStatus;
      return <ProjectStatusBadge status={status} />;
    },
  },
  {
    accessorKey: "isHiring",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Набор в команду" />
    ),
    cell: ({ row }) => {
      const isHiring = row.getValue("isHiring") as boolean;
      return <ProjectHiringBadge isHiring={isHiring} />;
    },
  },
];
