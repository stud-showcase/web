import { DataTable } from "@/shared/ui/DataTable";
import { getFullName, User, UserRole } from "@/entities/User";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { Badge } from "@/shared/ui/Badge";

const roleTranslations: Record<UserRole, string> = {
  admin: "Администратор",
  mentor: "Наставник",
  student: "Студент",
};

const columns = [
  { title: "ID", cell: (user: User) => user.id },
  {
    title: "ФИО",
    cell: (user: User) => {
      return getFullName(user.firstName, user.secondName, user.lastName);
    },
  },
  {
    title: "Email",
    cell: (user: User) => {
      return user.email;
    },
  },
  {
    title: "Роли",
    cell: (user: User) => {
      const roles = user.roles;

      return (
        <div>
          {roles.length > 0 ? (
            <div className="flex gap-1">
              {roles.map((role, index) => (
                <Badge key={index} variant="secondary">
                  {roleTranslations[role]}
                </Badge>
              ))}
            </div>
          ) : (
            <span>-</span>
          )}
        </div>
      );
    },
  },
];

export function UsersTable({ users }: { users: ServerPaginatedData<User> }) {
  return <DataTable data={users} columns={columns} />;
}
