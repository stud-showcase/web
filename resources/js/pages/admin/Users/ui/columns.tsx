import { getFullName, roleTranslations, User, UserRole } from "@/entities/User";
import { Badge } from "@/shared/ui/Badge";

export const columns = [
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
