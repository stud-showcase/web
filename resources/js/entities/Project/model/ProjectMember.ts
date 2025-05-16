import { User } from "@/entities/User";

export type ProjectMember = User & {
  position: string | null;
  isCreator: boolean;
};
