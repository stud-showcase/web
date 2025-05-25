import { Button } from "@/shared/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table";
import { ConfirmationDialog } from "@/shared/ui/ConfirmationDialog";
import { ProjectInvite } from "@/entities/Project";
import { getFullName } from "@/entities/User";
import { Check, X } from "lucide-react";
import { Text } from "@/shared/ui/Text";
import { router } from "@inertiajs/react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { Heading } from "@/shared/ui/Heading";

export function ProjectInvites({
  id,
  invites,
}: {
  id: number;
  invites: ProjectInvite[];
}) {
  const hasInvites = invites.length > 0;

  const acceptInvite = (inviteId: string) => {
    router.post(
      `/admin/projects/${id}/acceptInvite`,
      { inviteId },
      {
        preserveScroll: true,
        onSuccess: () => showSuccessToast("Вы успешно приняли заявку"),
        onError: () =>
          showErrorToast("Произошла ошибка в ходе принятия заявки"),
      }
    );
  };

  const rejectInvite = (inviteId: string) => {
    router.post(
      `/admin/projects/${id}/rejectInvite`,
      { inviteId },
      {
        preserveScroll: true,
        onSuccess: () => showSuccessToast("Вы успешно отклонили заявку"),
        onError: () =>
          showErrorToast("Произошла ошибка в ходе отклонения заявки"),
      }
    );
  };

  return (
    <div className="space-y-4 border p-4 rounded-md shadow-sm bg-background">
      <Heading level={5}>Заявки на вступление</Heading>
      {hasInvites ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Пользователь</TableHead>
              <TableHead>Вакансия</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invites.map((invite) => (
              <TableRow key={invite.id}>
                <TableCell>
                  {getFullName(
                    invite.firstName,
                    invite.secondName,
                    invite.lastName
                  )}
                </TableCell>
                <TableCell>{invite.vacancyName}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ConfirmationDialog
                      title="Подтверждения принятия заявки"
                      description="Вы уверены, что хотите принять нового участника в проектную команду?"
                      actionText="Принять"
                      onAction={() => acceptInvite(invite.id)}
                    >
                      <Button size="icon" variant="outline">
                        <Check />
                      </Button>
                    </ConfirmationDialog>
                    <ConfirmationDialog
                      title="Подтверждение отклонения заявки"
                      description="Вы уверены, что хотите отклонить заявку?"
                      actionText="Отклонить"
                      onAction={() => rejectInvite(invite.id)}
                    >
                      <Button size="icon" variant="outline">
                        <X />
                      </Button>
                    </ConfirmationDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Text variant="muted">Пока нет заявок</Text>
      )}
    </div>
  );
}
