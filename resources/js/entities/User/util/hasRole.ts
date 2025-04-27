import { UserRole } from "../model/UserRole";
import { User } from "../model/User";

export function hasRole(user: User | undefined, role: UserRole) {
  if (!user) return false;
  return user.roles.includes(role);
}
