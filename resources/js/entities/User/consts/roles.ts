import { UserRole } from "../model/UserRole";

export const roleTranslations: Record<UserRole, string> = {
  admin: "Администратор",
  mentor: "Наставник",
  student: "Студент",
};
