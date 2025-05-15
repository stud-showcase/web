import { User } from "@/entities/User";
import { ProjectStatus } from "./ProjectStatus";
import { ProjectMember } from "./ProjectMember";
import { ProjectInvite } from "./ProjectInvite";

export type Project = {
  id: number;
  name: string;
  annotation: string | null;
  members: ProjectMember[];
  mentor: User | null;
  files: { name: string; url: string }[];
  status: ProjectStatus;
  isHiring: boolean;
  invites: ProjectInvite[];
};
