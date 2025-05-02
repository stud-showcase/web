import { ProjectStatus } from "./ProjectStatus";

export type Project = {
  id: number;
  name: string;
  annotation?: string;
  members: { id: number; name: string; role?: string }[];
  mentor?: string;
  files?: { name: string; url: string }[];
  status: ProjectStatus;
  isHiring: boolean;
  invites?: { name: string; role?: string }[];
};
