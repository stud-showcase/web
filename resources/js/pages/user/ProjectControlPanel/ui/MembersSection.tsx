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

function EditMemberDialog({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Изменение позиции</DialogTitle>
          <DialogDescription>
            Введите новую позицию для участника.
          </DialogDescription>
        </DialogHeader>
        <Input placeholder="Новая позиция" />
        <div className="flex items-center gap-2">
          <Checkbox id="team_leader" defaultChecked />
          <Label htmlFor="team_leader">Дать права руководителя команды.</Label>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function MemberRow({
  member,
  isMentor = false,
}: {
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
            <EditMemberDialog>
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
  mentor,
  members,
}: {
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
                  <MemberRow member={mentor as ProjectMember} isMentor />
                )}
                {members.map((member) => (
                  <MemberRow member={member} />
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
