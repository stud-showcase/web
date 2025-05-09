import { User } from "@/entities/User";

export type ProjectMember = User & {
  position: string;
  isCreator: boolean;
};
