import { Checkbox } from "@/shared/ui/Checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/shared/ui/DataTableColumnHeader";
import { User, UserRole } from "@/entities/User";

const roleTranslations: Record<UserRole, string> = {
  admin: "Администратор",
  mentor: "Наставник",
  student: "Студент",
};

export const columns: ColumnDef<User>[] = [
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
      <DataTableColumnHeader column={column} title="ФИО" />
    ),
    cell: ({ row }) => {
      console.log(row);
      const { firstName, secondName, lastName } = row.original;

      const fullName = `${secondName} ${firstName} ${lastName ?? ""}`.trim();

      return <div>{fullName}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Электронная почта" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Группа" />
    ),
    cell: ({ row }) => <div>{(row.getValue("group") as string) || "-"}</div>,
  },
  {
    accessorKey: "roles",
    filterFn: (row, columnId, filterValue: UserRole) => {
      const roles = row.getValue(columnId) as UserRole[];
      return filterValue ? roles.includes(filterValue) : true;
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Роли" />
    ),
    cell: ({ row }) => {
      const roles = row.getValue("roles") as UserRole[];

      return (
        <div>
          {roles.length > 0 ? (
            roles.map((role, index) => (
              <span key={index} className="role">
                {roleTranslations[role]}
                {index < roles.length - 1 && ", "}
              </span>
            ))
          ) : (
            <span>-</span>
          )}
        </div>
      );
    },
  },
];
