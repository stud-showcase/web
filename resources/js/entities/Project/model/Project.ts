import { User } from "@/entities/User";
import { ProjectStatus } from "./ProjectStatus";
import { ProjectMember } from "./ProjectMember";
import { ProjectInvite } from "./ProjectInvite";
import { ServerFile } from "@/shared/types/ServerFile";

export type Project = {
  id: number;
  name: string;
  annotation: string | null;
  members: ProjectMember[];
  mentor: User | null;
  files: ServerFile[];
  status: ProjectStatus;
  isHiring: boolean;
  invites: ProjectInvite[];
};
