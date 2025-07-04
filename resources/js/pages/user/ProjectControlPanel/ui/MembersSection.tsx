import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/AlertDialog";
import { Input } from "@/shared/ui/Input";
import { PropsWithChildren } from "react";
import { Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table";
import { ConfirmationDialog } from "@/shared/ui/ConfirmationDialog";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Label } from "@/shared/ui/Label";
import { ProjectMember } from "@/entities/Project";
import { getFullName, User, isAdmin } from "@/entities/User";
import { Badge } from "@/shared/ui/Badge";
import { Text } from "@/shared/ui/Text";
import { router, useForm } from "@inertiajs/react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { useAuth } from "@/shared/hooks/useAuth";

function EditMemberDialog({
  projectId,
  memberId,
  position,
  isCreator,
  mentorId,
  children,
}: PropsWithChildren<{
  projectId: number;
  memberId: string;
  position: string | null;
  isCreator: boolean;
  mentorId: string | null;
}>) {
  const { user } = useAuth();
  const canAssignCreator = user?.id === mentorId || isAdmin(user);
  const { data, setData, put, transform } = useForm({
    position,
    ...(canAssignCreator ? { isCreator } : {}),
  });

  transform((data) => {
    if (canAssignCreator) {
      return {
        position: data.position,
        isCreator: data.isCreator ? 1 : 0,
      };
    }
    return {
      position: data.position,
    };
  });

  const handleSubmit = () => {
    put(`/projects/${projectId}/member/${memberId}`, {
      preserveScroll: true,
      onSuccess: () =>
        showSuccessToast("Вы успешно отредактировали участника проекта"),
      onError: (errors) => showErrorToast(errors.position),
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Изменение позиции и роли</AlertDialogTitle>
          <AlertDialogDescription>
            Введите новую позицию для участника или измените роль.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <Input
            placeholder="Введите новую позицию..."
            value={data.position ?? ""}
            onChange={(e) => setData("position", e.target.value)}
          />
        </div>
        {canAssignCreator && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="team-leader"
              checked={data.isCreator}
              onCheckedChange={(value) => setData("isCreator", value === true)}
            />
            <Label htmlFor="team-leader">Руководитель команды</Label>
          </div>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={!data.position}>
            Сохранить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function MemberRow({
  projectId,
  member,
  isMentor = false,
  mentorId,
}: {
  projectId: number;
  member: ProjectMember;
  isMentor?: boolean;
  mentorId: string | null;
}) {
  const memberRole = isMentor
    ? "Наставник проекта"
    : member.isCreator
    ? "Руководитель проекта"
    : "Участник проекта";

  const handleDelete = (memberId: string) => {
    router.delete(`/projects/${projectId}/member/${memberId}`, {
      preserveScroll: true,
      onSuccess: () => showSuccessToast("Вы успешно удалили участника проекта"),
      onError: () =>
        showErrorToast("Произошла ошибка в ходе удаления участника проекта"),
    });
  };

  return (
    <TableRow key={member.id}>
      <TableCell>
        {getFullName(member.firstName, member.secondName, member.lastName)}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">{memberRole}</Badge>
      </TableCell>
      <TableCell>
        {member.position && <Badge variant="outline">{member.position}</Badge>}
      </TableCell>
      <TableCell>
        {!isMentor && (
          <div className="flex gap-2">
            <EditMemberDialog
              projectId={projectId}
              memberId={member.id}
              position={member.position}
              isCreator={member.isCreator}
              mentorId={mentorId}
            >
              <Button size="icon" variant="outline">
                <Edit />
              </Button>
            </EditMemberDialog>
            <ConfirmationDialog
              title="Подтверждение удаления участника команды"
              description="Вы уверены, что хотите исключить участника проектной команды? Это действие нельзя отменить."
              onAction={() => handleDelete(member.id)}
            >
              <Button size="icon" variant="outline">
                <Trash2 />
              </Button>
            </ConfirmationDialog>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}

export function MembersSection({
  id,
  mentor,
  members,
}: {
  id: number;
  mentor: User | null;
  members: ProjectMember[];
}) {
  const mentorId = mentor?.id || null;
  const hasSomeone = mentor || members.length > 0;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Проектная команда</CardTitle>
          <CardDescription>
            Управление участниками проектной команды
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hasSomeone ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Имя</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Позиция</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mentor && (
                  <MemberRow
                    projectId={id}
                    member={mentor as ProjectMember}
                    isMentor
                    mentorId={mentorId}
                    key={mentor.id}
                  />
                )}
                {members.map((member) => (
                  <MemberRow
                    projectId={id}
                    member={member}
                    mentorId={mentorId}
                    key={member.id}
                  />
                ))}
              </TableBody>
            </Table>
          ) : (
            <Text variant="muted">Пока нет участников</Text>
          )}
        </CardContent>
      </Card>
    </>
  );
}
