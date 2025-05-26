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
import { Text } from "@/shared/ui/Text";
import { router, useForm } from "@inertiajs/react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { Heading } from "@/shared/ui/Heading";
import { TaskTag } from "@/entities/Task";

function CreateTagDialog({ children }: PropsWithChildren) {
  const { data, setData, post, reset } = useForm({
    name: "",
  });

  const handleSubmit = () => {
    post(`/admin/tags`, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        showSuccessToast("Вы успешно создали тэг");
      },
      onError: (errors) => {
        reset();
        showErrorToast(errors.name);
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Создание тэга</AlertDialogTitle>
          <AlertDialogDescription>
            Введите данные для нового тэга.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Введите название тэга..."
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={!data.name}>
            Создать
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EditeTagDialog({
  tag,
  children,
}: PropsWithChildren<{ tag: TaskTag }>) {
  const { data, setData, put } = useForm({
    name: tag.name,
  });

  const handleSubmit = () => {
    put(`/admin/tags/${tag.id}`, {
      preserveScroll: true,
      onSuccess: () => showSuccessToast("Вы успешно отредактировали тэг"),
      onError: (errors) => showErrorToast(errors.name),
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Редактирование тэга</AlertDialogTitle>
          <AlertDialogDescription>Измените данные тэга.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Введите название тэга..."
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} disabled={!data.name}>
            Сохранить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function TaskBankTags({ tags }: { tags: TaskTag[] }) {
  const hasTags = tags.length > 0;

  const handleDelete = (tagId: number) => {
    router.delete(`/admin/tags/${tagId}`, {
      onSuccess: () => showSuccessToast("Вы успешно удалили тэг"),
      onError: () => showErrorToast("Произошла ошибка в ходе удаления тэга"),
    });
  };

  return (
    <div className="space-y-4 border p-4 rounded-md shadow-sm bg-background">
      <Heading level={5}>Тэги</Heading>
      <CreateTagDialog>
        <Button size="sm" variant="outline">
          <Plus />
          Добавить тэг
        </Button>
      </CreateTagDialog>
      {hasTags ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Действие</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell>{tag.id}</TableCell>
                <TableCell>{tag.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <EditeTagDialog tag={tag}>
                      <Button size="icon" variant="outline">
                        <Edit />
                      </Button>
                    </EditeTagDialog>
                    <ConfirmationDialog
                      title="Подтверждение удаления тэга"
                      description="Вы уверены, что хотите удалить тэг? Это действие нельзя отменить."
                      onAction={() => handleDelete(tag.id)}
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
          Пока нет тэгов
        </Text>
      )}
    </div>
  );
}
