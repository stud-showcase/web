export type User = {
  id: number;
  firstName: string;
  secondName: string;
  lastName?: string;
  email: string;
  group?: string;
  role: "guest" | "student" | "team leader" | "mentor" | "admin";
};
