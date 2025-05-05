import { Checkbox } from "@/shared/ui/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/ui/DataTableColumnHeader";
import { TaskComplexityBadge, Task, TaskComplexity } from "@/entities/Task";
import { TaskDeadlineBadge } from "@/entities/Task";
import { TaskMembersBadge } from "@/entities/Task";

export const columns: ColumnDef<Task>[] = [
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
    accessorKey: "customer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Заказчик" />
    ),
    cell: ({ row }) => <div>{row.getValue("customer")}</div>,
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
    cell: ({ row }) => {
      const phone = row.getValue("customerPhone");
      return <div>{(phone as string) || "-"}</div>;
    },
  },
  {
    accessorKey: "maxMembers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Макс. участников" />
    ),
    cell: ({ row }) => {
      const maxMembers = row.getValue("maxMembers") as number;
      return <TaskMembersBadge maxMembers={maxMembers} />;
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дедлайн" />
    ),
    cell: ({ row }) => {
      const deadline = row.getValue("deadline") as Date;
      return <TaskDeadlineBadge deadline={deadline} />;
    },
  },
  {
    accessorKey: "complexity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Сложность" />
    ),
    cell: ({ row }) => {
      const compexity = row.getValue("complexity") as TaskComplexity;
      return <TaskComplexityBadge complexity={compexity} />;
    },
  },
];
