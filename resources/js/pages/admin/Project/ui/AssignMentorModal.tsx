import { Check, UserCog, UserMinus } from "lucide-react";
import { cn, showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/ui/Command";
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
import { getFullName, isAdmin, User } from "@/entities/User";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { useAuth } from "@/shared/hooks/useAuth";

type Props = {
  id: number;
  users: User[];
  mentor: User | null;
};

function removeMentor(projectId: number) {
  router.delete(`/admin/projects/${projectId}/mentor`, {
    preserveScroll: true,
    preserveState: true,
    onSuccess: () => showSuccessToast("Наставник успешно снят с проекта"),
    onError: () => showErrorToast("Произошла ошибка в ходе снятия наставника"),
  });
}

function assignMentor(projectId: number, mentorId: string) {
  router.post(
    `/admin/projects/${projectId}/mentor`,
    { mentorId },
    {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () =>
        showSuccessToast("Вы успешно назначили наставника для проекта"),
      onError: () =>
        showErrorToast(
          "Произошла ошибка в ходе назначения наставника для проекта"
        ),
    }
  );
}

function AdminAssignMentorModal({ id, users, mentor }: Props) {
  const usersOptions = users.map((user) => ({
    value: user.id,
    label: getFullName(user.firstName, user.secondName, user.lastName),
  }));

  const [value, setValue] = useState(mentor?.id || "");

  return (
    <div className="flex gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm">
            <UserCog />
            Назначить
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Назначение наставника</AlertDialogTitle>
            <AlertDialogDescription>
              Выберите наставника проекта из списка пользователей. У проекта
              может быть только один наставник
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Command className="border rounded-lg">
            <CommandInput placeholder="Найти пользователя..." />
            <CommandList>
              <CommandEmpty>Не было найдено пользователей.</CommandEmpty>
              <CommandGroup>
                {usersOptions.map((user) => (
                  <CommandItem
                    key={user.value}
                    value={user.label}
                    onSelect={() => {
                      setValue(user.value === value ? "" : user.value);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === user.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {user.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setValue(mentor?.id || "");
              }}
            >
              Отменить
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!value}
              onClick={() => assignMentor(id, value)}
            >
              Назначить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {mentor && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <UserMinus />
              Снять
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Снятие наставника</AlertDialogTitle>
              <AlertDialogDescription>
                Вы действительно хотите снять с пользователя "
                {getFullName(
                  mentor.firstName,
                  mentor.secondName,
                  mentor.lastName
                )}
                " роль наставника данного проекта?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отменить</AlertDialogCancel>
              <AlertDialogAction onClick={() => removeMentor(id)}>
                Снять
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

function DefaultAssignMentorModal({ id, mentor }: Omit<Props, "users">) {
  const { user } = useAuth();
  const isCurrentUserMentor = mentor?.id === user?.id;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={isCurrentUserMentor ? "destructive" : "outline"}
          size="sm"
        >
          <UserCog />
          {isCurrentUserMentor ? "Снять" : "Назначить"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isCurrentUserMentor
              ? "Снятие наставника"
              : "Назначение наставника"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isCurrentUserMentor
              ? "Вы действительно хотите снять себя с роли наставника проекта?"
              : "Вы действительно хотите назначить себя наставником проекта?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction
            onClick={
              isCurrentUserMentor
                ? () => removeMentor(id)
                : () => assignMentor(id, user!.id)
            }
          >
            {isCurrentUserMentor ? "Снять" : "Назначить"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function AssignMentorModal({ id, users, mentor }: Props) {
  const { user } = useAuth();

  if (isAdmin(user)) {
    return <AdminAssignMentorModal id={id} users={users} mentor={mentor} />;
  }

  return <DefaultAssignMentorModal id={id} mentor={mentor} />;
}
