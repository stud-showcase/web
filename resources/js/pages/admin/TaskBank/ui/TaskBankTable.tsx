import { Task, TaskComplexityBadge, TaskDeadlineBadge, TaskMembersBadge } from "@/entities/Task";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { DataTable } from "@/shared/ui/DataTable";

const columns = [
  { title: "ID", cell: (task: Task) => task.id },
  { title: "Название", cell: (task: Task) => task.title },
  { title: "Заказчик", cell: (task: Task) => task.customer },
  { title: "Email", cell: (task: Task) => task.customerEmail },
  { title: "Телефон", cell: (task: Task) => task.customerPhone || "-" },
  { title: "Участники", cell: (task: Task) => <TaskMembersBadge maxMembers={task.maxMembers} /> },
  { title: "Сроки", cell: (task: Task) => <TaskDeadlineBadge deadline={task.deadline} /> },
  { title: "Сложность", cell: (task: Task) => <TaskComplexityBadge complexity={task.complexity} /> },
];

export function TaskBankTable({ tasks }: { tasks: ServerPaginatedData<Task> }) {
  return <DataTable data={tasks} columns={columns} />;
}
