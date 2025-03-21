export type TaskComplexity = "easy" | "medium" | "hard";

export interface Task {
    id: number;
    title: string;
    description: string;
    customer: { name: string; email?: string; phone?: string };
    max_members: number;
    deadline: Date;
    complexity: TaskComplexity;
    tags: string[];
    files?: { name: string; url: string }[];
}
