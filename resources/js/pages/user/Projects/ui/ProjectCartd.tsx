import { Link } from "@inertiajs/react";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Project } from "@/shared/types/Project";
import { ArrowRight, Users } from "lucide-react";
import { CardWrapper } from "@/features/CardWrapper";
import { ComplexityBadge } from "@/features/ComplexityBadge";
import { StatusBadge } from "@/features/StatusBadge";
import { HiringBadge } from "@/features/HiringBadge";
import { useAuth } from "@/shared/hooks/useAuth";

function Badges({ project }: { project: Project }) {
  return (
    <>
      {project.isHiring && <HiringBadge />}
      <StatusBadge status={project.status} />
      <ComplexityBadge complexity={project.complexity} />
    </>
  );
}

function Content({ project }: { project: Project }) {
  return (
    <>
      <Text variant="muted" className="flex gap-1 mt-4">
        <span className="font-medium">Заказчик:</span>
        {project.customer}
      </Text>
      <Text className="mt-4 line-clamp-3">{project.description}</Text>
    </>
  );
}

function Tags({ project }: { project: Project }) {
  return project.tags.map((tag) => (
    <Badge key={tag} variant="outline" className="">
      {tag}
    </Badge>
  ));
}

function Footer({ project }: { project: Project }) {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {project.isHiring && isLoggedIn && (
        <Button variant="outline" size="sm" className="md:flex-initial flex-1">
          Вступить в команду
        </Button>
      )}
      <Button asChild size="sm">
        <Link
          href={`/projects/${project.id}`}
          className="flex items-center justify-center gap-1 md:flex-initial flex-1"
        >
          Подробнее
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <CardWrapper
      title={project.title}
      badges={<Badges project={project} />}
      content={<Content project={project} />}
      tags={<Tags project={project} />}
      footer={<Footer project={project} />}
    />
  );
}
