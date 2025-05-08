import { User } from "@/entities/User";
import { ProjectStatus } from "./ProjectStatus";

type ProjectMember = User & {
  position: string;
  isCreator: boolean;
}

export type Project = {
  id: number;
  name: string;
  annotation?: string;
  members: ProjectMember[];
  mentor?: User;
  files?: { name: string; url: string }[];
  status: ProjectStatus;
  isHiring: boolean;
  invites?: { name: string; role?: string }[];
};
