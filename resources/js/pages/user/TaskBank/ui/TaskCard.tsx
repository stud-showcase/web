// import { EntityCard } from "@/shared/ui/EntityCard";
// import { Badge } from "@/shared/ui/Badge";
// import { Button } from "@/shared/ui/Button";
// import { Text } from "@/shared/ui/Text";
// import { Link } from "@inertiajs/react";
// import { ArrowRight, Briefcase, Calendar, ClipboardCheck, UserIcon, Users } from "lucide-react";
// import { Task } from "@/entities/Task/model/Task";
// import { ComplexityBadge } from "../../../../entities/Task/ui/ComplexityBadge";
// import { TaskTag } from "../../../../entities/Task/ui/TaskTag";

// function Badges({ task }: { task: Task }) {
//   return (
//     <>
//       <Badge variant="outline" className="flex items-center gap-1">
//         <Users className="w-3 h-3" />
//         {task.maxMembers} {task.maxMembers === 1 ? "участник" : "участника"}
//       </Badge>
//       <Badge variant="secondary" className="flex items-center gap-1">
//         <Calendar className="w-3 h-3" />
//         {task.deadline.toLocaleDateString()}
//       </Badge>
//       <ComplexityBadge complexity={task.complexity} />
//     </>
//   );
// }

// function Content({ task }: { task: Task }) {
//   return (
//     <>
//       <div className="flex gap-2 items-center mt-4">
//         <Briefcase className="h-3 w-3 text-muted-foreground" />
//         <Text variant="muted">Заказчик: {task.customer.name}</Text>
//       </div>
//       <Text className="mt-3 line-clamp-3">{task.description}</Text>
//     </>
//   );
// }

// function Tags({ task }: { task: Task }) {
//   return task.tags.map((tag) => <TaskTag value={tag} />);
// }

// function Footer({ task }: { task: Task }) {
//   return (
//     <>
//       <Button variant="outline" size="sm" className="md:flex-initial flex-1">
//         <ClipboardCheck />
//         Взять задачу
//       </Button>
//       <Button asChild size="sm">
//         <Link href={`/tasks/${task.id}`} className="md:flex-initial flex-1">
//           Подробнее
//           <ArrowRight className="w-3 h-3" />
//         </Link>
//       </Button>
//     </>
//   );
// }

// export function TaskCard({ task }: { task: Task }) {
//   return (
//     <EntityCard
//       title={task.title}
//       badges={<Badges task={task} />}
//       content={<Content task={task} />}
//       tags={<Tags task={task} />}
//       footer={<Footer task={task} />}
//     />
//   );
// }

import { EntityCard } from "@/shared/ui/EntityCard";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  ClipboardCheck,
  Users,
} from "lucide-react";
import { Task } from "@/entities/Task/model/Task";
import { ComplexityBadge } from "@/entities/Task/ui/ComplexityBadge";
import { TaskTag } from "@/entities/Task/ui/TaskTag";
import { Badge } from "@/shared/ui/Badge";

function Badges({ task }: { task: Task }) {
  return (
    <>
      <Badge variant="outline" className="flex items-center gap-1">
        <Users className="w-3 h-3" />
        {task.maxMembers} {task.maxMembers === 1 ? "участник" : "участника"}
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1">
        <Calendar className="w-3 h-3" />
        {task.deadline.toLocaleDateString()}
      </Badge>
      <ComplexityBadge complexity={task.complexity} />
    </>
  );
}

function Content({ task }: { task: Task }) {
  return (
    <>
      {task.description && (
        <Text variant="small" className="line-clamp-2">
          {task.description}
        </Text>
      )}
    </>
  );
}

function Tags({ task }: { task: Task }) {
  return task.tags.map((tag) => <TaskTag value={tag} />);
}

function Footer({ task }: { task: Task }) {
  return (
    <>
      <Button variant="outline" size="sm" className="flex-1">
        <ClipboardCheck />
        Взять задачу
      </Button>
      <Button asChild size="sm" className="flex-1">
        <Link href={`/tasks/${task.id}`}>
          Подробнее
          <ArrowRight />
        </Link>
      </Button>
    </>
  );
}

export function TaskCard({ task }: { task: Task }) {
  return (
    <EntityCard
      title={task.title}
      subtitle={task.customer.name}
      badges={<Badges task={task} />}
      content={<Content task={task} />}
      tags={<Tags task={task} />}
      footer={<Footer task={task} />}
    />
  );
}
