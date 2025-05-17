import { Vacancy } from "@/entities/Vacancy";
import { toast } from "@/shared/hooks/useToast";
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
import { Button } from "@/shared/ui/Button";
import { Label } from "@/shared/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/RadioGroup";
import { Text } from "@/shared/ui/Text";
import { Link, router } from "@inertiajs/react";
import { PropsWithChildren, useState } from "react";

// TODO: разобраться, почему не отправляется или не сохраняется вакансия

function sendJoinProjectRequest(projectId: number, vacancyId?: string) {
  router.post(
    `/projects/${projectId}/createInvite`,
    { vacancyId },
    {
      onSuccess: () => {
        toast({
          title: "Заявка успешно отправлена",
          description: `Ваша заявка успешно отправлена и будет рассмотрена руководителем команды.`,
        });
      },
      onError: () => {
        toast({
          title: "Не удалось отправить заявку",
          description: `Произошла ошибка в ходе отправки заявки. Повторите еще раз или попробуйте позже.`,
          variant: "destructive",
        });
      },
    }
  );
}

function JoinProjectVacanciesModal({
  projectId,
  vacancies,
  children,
}: PropsWithChildren<{ projectId: number; vacancies: Vacancy[] }>) {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>();

  const handleApply = () => {
    sendJoinProjectRequest(projectId, selectedVacancyId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-h-[80vh] flex flex-col">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Подать заявку на вступление в проект?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Выберите одну из доступных вакансий, чтобы подать заявку на
            вступление в проект. Она будет рассмотрена руководилем проекта.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <RadioGroup
            onValueChange={setSelectedVacancyId}
            value={selectedVacancyId || ""}
            className="gap-4"
          >
            {vacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="flex items-center space-x-2 p-2 rounded-lg border hover:bg-secondary"
              >
                <RadioGroupItem
                  value={vacancy.id.toString()}
                  id={`vacancy-${vacancy.id}`}
                />
                <Label
                  htmlFor={`vacancy-${vacancy.id}`}
                  className="cursor-pointer flex-1 p-1"
                >
                  {vacancy.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction
            disabled={!selectedVacancyId || !vacancies.length}
            onClick={handleApply}
          >
            Подать заявку
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function JoinProjectConfirmationModal({
  projectId,
  children,
}: PropsWithChildren<{ projectId: number }>) {
  const handleApply = () => {
    sendJoinProjectRequest(projectId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Подать заявку на вступление в проект?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ваша заявка будет рассмотрена руководилем проекта.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={handleApply}>
            Подать заявку
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function JoinProjectModal({
  projectId,
  vacancies,
  children,
}: PropsWithChildren<{ projectId: number; vacancies: Vacancy[] }>) {
  if (vacancies.length > 0) {
    return (
      <JoinProjectVacanciesModal projectId={projectId} vacancies={vacancies}>
        {children}
      </JoinProjectVacanciesModal>
    );
  }
  return (
    <JoinProjectConfirmationModal projectId={projectId}>
      {children}
    </JoinProjectConfirmationModal>
  );
}
