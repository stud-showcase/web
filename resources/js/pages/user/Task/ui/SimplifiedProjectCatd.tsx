import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Text } from "@/shared/ui/Text";
import { Heading } from "@/shared/ui/Heading";
import { Project } from "@/shared/types/Project";
import { HiringBadge } from "@/features/HiringBadge";
import { StatusBadge } from "@/features/StatusBadge";

export function SimplifiedProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <Heading level={4}>{project.title}</Heading>
          <div className="flex gap-2">
            {project.isHiring && <HiringBadge />}
            <StatusBadge status={project.status} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <Text className="line-clamp-2">{project.description}</Text>
      </CardContent>
    </Card>
  );
}
