export type TaskForm = {
  title: string;
  description: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  maxMembers: string;
  deadline: string;
  complexityId: string;
  maxProjects: string;
  files: File[];
  tags: string[];
};
