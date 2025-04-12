export type ProjectStatus = "under_review" | "in_progress" | "completed";

export type Project = {
  id: number;
  name: string;
  abstract?: string;
  members: { id: number; name: string, role?: string }[];
  mentor?: string;
  files?: { name: string; url: string }[];
  status: ProjectStatus;
  isHiring: boolean;
};
