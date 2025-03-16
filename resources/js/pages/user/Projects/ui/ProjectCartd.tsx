import { Link } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Project } from "../types";
import { ArrowRight, Users, Clock, Settings, CheckCircle } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/shared/state";

export function ProjectCard({ project }: { project: Project }) {
  const { isLoggedIn } = useContext(AuthContext);

  const complexityVariant = (complexity: Project["complexity"]) => {
    switch (complexity) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "destructive";
      default:
        return "outline";
    }
  };

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
    <Card>
      <CardHeader className="border-b border-border p-3">
        <div className="flex md:items-center md:justify-between md:flex-row gap-4 flex-col">
          <CardTitle>{project.title}</CardTitle>
          <div className="flex flex-wrap gap-2">
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
            <Badge variant={complexityVariant(project.complexity)}>
              {project.complexity === "easy"
                ? "Легкий"
                : project.complexity === "medium"
                ? "Средний"
                : "Сложный"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Text variant="muted" className="flex gap-1 mt-4">
          <span className="font-medium">Заказчик:</span>
          {project.customer}
        </Text>
        <Text className="mt-4 line-clamp-3">{project.description}</Text>

        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t p-3 bg-muted/20">
        <div className="flex gap-2 justify-end w-full">
          {project.isHiring && isLoggedIn && (
            <Button
              variant="outline"
              size="sm"
              className="md:flex-initial flex-1"
            >
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
        </div>
      </CardFooter>
    </Card>
  );
}
