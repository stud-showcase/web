import { UserRole } from "./UserRole";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  group?: string;
  roles: UserRole[];
};
