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
import { getFullName } from "@/entities/User";
import { Badge } from "@/shared/ui/Badge";

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

// TODO: убедиться, что members не пустой
export function MembersSection({ members }: { members: ProjectMember[] }) {
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
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    {getFullName(
                      member.firstName,
                      member.secondName,
                      member.lastName
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {member.isCreator
                        ? "Руководитель проекта"
                        : "Участник проекта"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {member.position ? (
                      <Badge variant="outline">{member.position}</Badge>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
