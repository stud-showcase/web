import { EntityCard } from "@/shared/ui/EntityCard";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { TaskTag, TaskTagBadge } from "@/entities/Task";
import { Text } from "@/shared/ui/Text";
import { project } from "@/shared/mocks";

// function Tags({ taskTags }: { taskTags: TaskTag[] }) {
//   return taskTags.map((tag) => <TaskTagBadge tag={tag} key={tag.id} />);
// }

function Content({ description }: { description: string }) {
  return (
    <Text variant="small" className="line-clamp-1">
      {description}
    </Text>
  );
}

export function VacancyCard({ vacancy }: { vacancy: ExtendedVacancy }) {
  return (
    <EntityCard
      title={vacancy.name}
      subtitle={vacancy.project.name}
      content={<Content description={vacancy.description} />}
      // TODO: ?
      // tags={
      //   vacancy.task.tags.length > 0 && <Tags taskTags={vacancy.task.tags} />
      // }
      href={`/projects/${project.id}`}
    />
  );
}
