import { Button } from "@/shared/ui/Button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/AlertDialog";
import { Input } from "@/shared/ui/Input";
import { PropsWithChildren } from "react";
import { Edit, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table";
import { ConfirmationDialog } from "@/shared/ui/ConfirmationDialog";
import { Textarea } from "@/shared/ui/Textarea";
import { Vacancy } from "@/entities/Vacancy";
import { Text } from "@/shared/ui/Text";
import { router, useForm } from "@inertiajs/react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { Heading } from "@/shared/ui/Heading";

function formatErrors(errors: Record<string, string | undefined>): string {
  return Object.values(errors)
    .filter((error): error is string => error !== undefined && error !== "")
    .join(". ");
}

function CreateVacancyDialog({
  projectId,
  children,
}: PropsWithChildren<{ projectId: number }>) {
  const { data, setData, post, reset } = useForm({
    name: "",
    description: "",
  });

  const handleSubmit = () => {
    post(`/admin/projects/${projectId}/vacancy`, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        showSuccessToast("Вы успешно создали вакансию");
      },
      onError: (errors) => {
        reset();
        showErrorToast(formatErrors(errors));
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Создание вакансии</AlertDialogTitle>
          <AlertDialogDescription>
            Введите данные для новой вакансии.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Введите название вакансии..."
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
          <Textarea
            placeholder="Введите описание вакансии..."
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={!data.name || !data.description}
          >
            Создать
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EditVacancyDialog({
  projectId,
  vacancy,
  children,
}: PropsWithChildren<{ projectId: number; vacancy: Vacancy }>) {
  const { data, setData, put } = useForm({
    name: vacancy.name,
    description: vacancy.description,
  });

  const handleSubmit = () => {
    put(`/admin/projects/${projectId}/vacancy/${vacancy.id}`, {
      preserveScroll: true,
      onSuccess: () => showSuccessToast("Вы успешно отредактировали вакансию"),
      onError: (errors) => showErrorToast(formatErrors(errors)),
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Редактирование вакансии</AlertDialogTitle>
          <AlertDialogDescription>
            Измените данные вакансии.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Введите название вакансии..."
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
          <Textarea
            placeholder="Введите описание вакансии..."
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={!data.name || !data.description}
          >
            Сохранить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ProjectVacancies({
  id,
  vacancies,
}: {
  id: number;
  vacancies: Vacancy[];
}) {
  const hasVacancies = vacancies.length > 0;

  const handleDelete = (vacancyId: number) => {
    router.delete(`/admin/projects/${id}/vacancy/${vacancyId}`, {
      onSuccess: () => showSuccessToast("Вы успешно удалили вакансию"),
      onError: () =>
        showErrorToast("Произошла ошибка в ходе удаления вакансии"),
    });
  };

  return (
    <div className="space-y-4 border p-4 rounded-md shadow-sm bg-background">
      <Heading level={5}>Вакансии</Heading>
      <CreateVacancyDialog projectId={id}>
        <Button size="sm" variant="outline">
          <Plus />
          Добавить вакансию
        </Button>
      </CreateVacancyDialog>
      {hasVacancies ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vacancies.map((vacancy) => (
              <TableRow key={vacancy.id}>
                <TableCell>{vacancy.name}</TableCell>
                <TableCell>{vacancy.description}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <EditVacancyDialog projectId={id} vacancy={vacancy}>
                      <Button size="icon" variant="outline">
                        <Edit />
                      </Button>
                    </EditVacancyDialog>
                    <ConfirmationDialog
                      title="Подтверждение удаления вакансии"
                      description="Вы уверены, что хотите удалить вакансию? Это действие нельзя отменить."
                      onAction={() => handleDelete(vacancy.id)}
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
      ) : (
        <Text variant="muted" className="mt-4">
          Пока нет вакансий
        </Text>
      )}
    </div>
  );
}
