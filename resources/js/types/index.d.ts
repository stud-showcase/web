export interface User {
  firstName: string;
  lastName: string;
  middleName: string;
  role: "guest" | "student" | "team leader" | "mentor" | "admin";
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    isLoggedIn: boolean;
    user: User;
  };
};
