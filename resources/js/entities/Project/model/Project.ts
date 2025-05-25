import { User } from "@/entities/User";
import { ProjectStatus } from "./ProjectStatus";
import { ProjectMember } from "./ProjectMember";
import { ProjectInvite } from "./ProjectInvite";
import { ServerFile } from "@/shared/types/ServerFile";

export type Project = {
  id: number;
  name: string;
  annotation: string | null;
  isHiring: boolean;
  status: ProjectStatus;
  mentor: User | null;
  files: ServerFile[];
  members: ProjectMember[];
  invites: ProjectInvite[];
};
