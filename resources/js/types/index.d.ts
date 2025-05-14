import { User } from "@/entities/User";

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User | null;
  };
};
