export type Application = {
  id: number;
  title: string;
  description?: string;
  customer: string;
  customerEmail: string;
  customerPhone?: string;
  type: "project" | "task";
};
