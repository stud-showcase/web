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
import { getFullName, User } from "@/entities/User";
import { Badge } from "@/shared/ui/Badge";
import { Text } from "@/shared/ui/Text";
import { router, useForm } from "@inertiajs/react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { Heading } from "@/shared/ui/Heading";

function EditMemberDialog({
  projectId,
  memberId,
  position,
  isCreator,
  children,
}: PropsWithChildren<{
  projectId: number;
  memberId: string;
  position: string | null;
  isCreator: boolean;
}>) {
  const { data, setData, put, transform } = useForm({
    position,
    isCreator,
  });

  transform((data) => ({
    ...data,
    isCreator: data.isCreator ? 1 : 0,
  }));

  const handleSubmit = () => {
    put(`/admin/projects/${projectId}/member/${memberId}`, {
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
        <div className="flex items-center gap-2">
          <Checkbox
            id="team-leader"
            checked={data.isCreator}
            onCheckedChange={(value) => setData("isCreator", value === true)}
          />
          <Label htmlFor="team-leader">Руководитель команды</Label>
        </div>
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
}: {
  projectId: number;
  member: ProjectMember;
  isMentor?: boolean;
}) {
  const memberRole = isMentor
    ? "Наставник проекта"
    : member.isCreator
    ? "Руководитель проекта"
    : "Участник проекта";

  const handleDelete = (memberId: string) => {
    router.delete(`/admin/projects/${projectId}/member/${memberId}`, {
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

export function ProjectMembers({
  id,
  mentor,
  members,
}: {
  id: number;
  mentor: User | null;
  members: ProjectMember[];
}) {
  const hasSomeone = mentor || members.length > 0;

  return (
    <>
      <div className="space-y-4 border p-4 rounded-md shadow-sm bg-background">
        <Heading level={5}>Проектная команда</Heading>
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
                  key={mentor.id}
                />
              )}
              {members.map((member) => (
                <MemberRow projectId={id} member={member} key={member.id} />
              ))}
            </TableBody>
          </Table>
        ) : (
          <Text variant="muted">Пока нет участников</Text>
        )}
      </div>
    </>
  );
}
