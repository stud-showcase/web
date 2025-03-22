import { Link } from "@inertiajs/react";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Project } from "../types";
import { ArrowRight, Users, Clock, Settings, CheckCircle } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/shared/state";
import { CardWrapper } from "@/features/CardWrapper";
import { ComplexityBadge } from "@/features/ComplexityBadge";

function Badges({ project }: { project: Project }) {
  const statusIcon = (status: Project["status"]) => {
    switch (status) {
      case "under_review":
        return <Clock className="w-4 h-4 mr-2" />;
      case "in_progress":
        return <Settings className="w-4 h-4 mr-2" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <>
      {project.isHiring && (
        <Badge variant="outline" className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          Набор открыт
        </Badge>
      )}
      <Badge variant="secondary" className="flex items-center">
        {statusIcon(project.status)}
        {project.status === "under_review"
          ? "В рассмотрении"
          : project.status === "in_progress"
          ? "В разработке"
          : "Завершён"}
      </Badge>
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
  const { isLoggedIn } = useContext(AuthContext);

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
