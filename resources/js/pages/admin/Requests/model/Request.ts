export type Request = {
  id: number;
  title: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: "task_bank" | "project";
};
