import { Heading } from "@/shared/ui/Heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/Breadcrumb";
import { Button } from "@/shared/ui/Button";
import { ClipboardCheck } from "lucide-react";
import {
  TaskTagBadge,
  TaskComplexityBadge,
  TaskTag,
  TaskComplexity,
} from "@/entities/Task";
import { CreateProjectModal } from "./CreateProjectModal";
import { Link } from "@inertiajs/react";
import { useAuth } from "@/shared/hooks/useAuth";

export function HeaderSection({
  id,
  title,
  canTake,
  tags,
  complexity,
}: {
  id: number;
  title: string;
  canTake: boolean;
  tags: TaskTag[];
  complexity: TaskComplexity;
}) {
  const { user } = useAuth();

  return (
    <header className="border-b pb-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/tasks">Банк задач</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 flex flex-col sm:flex-row justify-between sm:items-center items-start gap-6">
        <Heading level={1}>{title}</Heading>
        {user && canTake && (
          <CreateProjectModal taskId={id}>
            <div className="flex flex-row w-full sm:w-auto gap-3">
              <Button className="flex-1 sm:flex-none" size="sm">
                <ClipboardCheck />
                Взять задачу
              </Button>
            </div>
          </CreateProjectModal>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          <TaskComplexityBadge complexity={complexity} />
          {tags.map((tag) => (
            <TaskTagBadge tag={tag} key={tag.id} />
          ))}
        </div>
      )}
    </header>
  );
}
