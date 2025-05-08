import { UserRole } from "./UserRole";

export type User = {
  id: string;
  firstName: string;
  secondName: string;
  lastName: string | null;
  email: string;
  roles: UserRole[];
};
