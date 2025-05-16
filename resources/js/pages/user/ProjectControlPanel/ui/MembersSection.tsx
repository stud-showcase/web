import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog";
import { Input } from "@/shared/ui/Input";
import { FormEvent, PropsWithChildren } from "react";
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
import { useForm } from "@inertiajs/react";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { showErrorToast, showSuccessToast } from "../util/showToast";

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
  const { data, setData, errors, put, transform } = useForm({
    position,
    isCreator,
  });

  transform((data) => ({
    isCreator: data.isCreator ? 1 : 0,
  }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/projects/${projectId}/member/${memberId}`, {
      onSuccess: () =>
        showSuccessToast("Вы успешно отредактировали участника проекта"),
      onError: () =>
        showErrorToast(
          "Произошла ошибка в ходе редактирования участника проекта"
        ),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменение позиции и роли</DialogTitle>
          <DialogDescription>
            Введите новую позицию для участника или измените роль.
          </DialogDescription>
        </DialogHeader>
        <form id="project-member" onSubmit={handleSubmit}>
          <Input
            placeholder="Введите новую позицию..."
            value={data.position ?? ""}
            onChange={(e) => setData("position", e.target.value)}
          />
          {errors.position && <ValidationErrorText text={errors.position} />}
          <div className="mt-4 flex items-center gap-2">
            <Checkbox
              id="team-leader"
              checked={data.isCreator}
              onCheckedChange={(value) => setData("isCreator", value === true)}
            />
            <Label htmlFor="team-leader">Руководитель команды</Label>
          </div>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button form="project-member">Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
        </CardContent>
      </Card>
    </>
  );
}
