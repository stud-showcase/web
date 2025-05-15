import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { getAvatartName, getFullName, User } from "@/entities/User";
import { ProjectMember } from "@/entities/Project";

export function MemberCard({
  member,
  isMentor = false,
}: {
  member: ProjectMember;
  isMentor?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback className="bg-muted">
              {getAvatartName(member.firstName, member.lastName)}
            </AvatarFallback>
          </Avatar>
          {getFullName(member.firstName, member.secondName, member.lastName)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row gap-2">
          <Badge variant="secondary">
            {isMentor
              ? "Наставник проекта"
              : member.isCreator
              ? "Руководитель проекта"
              : "Участник проекта"}
          </Badge>
          {member.position && (
            <Badge variant="outline">{member.position}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
