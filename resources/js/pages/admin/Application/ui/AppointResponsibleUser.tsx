import { Check, UserCog } from "lucide-react";

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
import { getFullName, User } from "@/entities/User";
import { router } from "@inertiajs/react";
import { useState } from "react";

export function AppointResponsibleUser({
  id,
  users,
  responsibleUser,
}: {
  id: number;
  users: User[];
  responsibleUser: User | null;
}) {
  const usersOptions = users.map((user) => ({
    value: user.id,
    label: getFullName(user.firstName, user.secondName, user.lastName),
  }));

  const [value, setValue] = useState(responsibleUser?.id || "");

  const appointResponsibleUser = () => {
    router.put(
      `/admin/applications/${id}/responsible`,
      { responsibleUserId: value },
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () =>
          showSuccessToast("Вы успешно назначили ответсвенного для заявки"),
        onError: () =>
          showErrorToast("Произошла ошибка в ходе назначения ответсвенного"),
      }
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserCog />
          Назначить
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Назначение отвественного</AlertDialogTitle>
          <AlertDialogDescription>
            Выберите отвественного для заявки из списка пользователей
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
              setValue("");
            }}
          >
            Отменить
          </AlertDialogCancel>
          <AlertDialogAction disabled={!value} onClick={appointResponsibleUser}>
            Назначить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
