import { UserRole } from "../model/UserRole";
import { User } from "../model/User";

function hasRole(user: User | null, role: UserRole) {
  if (!user) return false;
  return user.roles.includes(role);
}

export function isStudent(user: User | null) {
  return hasRole(user, "student");
}

export function isMentor(user: User | null) {
  return hasRole(user, "mentor");
}

export function isAdmin(user: User | null) {
  return hasRole(user, "admin");
}
