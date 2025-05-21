import { ServerFile } from "@/shared/types/ServerFile";

export type Application = {
  id: number;
  title: string;
  projectName: string | null;
  description: string;
  customer: string;
  customerEmail: string;
  customerPhone: string | null;
  withProject: boolean;
  files: ServerFile[];
}
