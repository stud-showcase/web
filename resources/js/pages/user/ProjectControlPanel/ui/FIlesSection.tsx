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
import { FormEvent, PropsWithChildren } from "react";
import { Plus, Trash2 } from "lucide-react";
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
import { FileUpload } from "@/shared/ui/FileUpload";
import { router, useForm } from "@inertiajs/react";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { showErrorToast, showSuccessToast } from "../util/showToast";
import { ServerFile } from "@/shared/types/ServerFile";

function FileUploadDialog({ id, children }: PropsWithChildren<{ id: number }>) {
  const { data, setData, errors, post, reset } = useForm<{ files: File[] }>({
    files: [],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(`/projects/${id}/files`, {
      onSuccess: () => {
        reset();
        showSuccessToast("Файлы успешно загружены");
      },
      onError: () => {
        reset();
        showErrorToast("Произошла ошибка в ходе загрузки файлов");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Загрузка файла</DialogTitle>
          <DialogDescription>
            Выберите файл для загрузки в проект.
          </DialogDescription>
        </DialogHeader>
        <form id="project-files" onSubmit={handleSubmit}>
          <FileUpload
            files={data.files}
            onFilesChange={(files) => setData("files", files)}
          />
          {errors.files && <ValidationErrorText text={errors.files} />}
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button form="project-files" disabled={data.files.length === 0}>
            Загрузить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function FilesSection({
  id,
  files,
}: {
  id: number;
  files: ServerFile[];
}) {
  const hasFiles = files.length > 0;

  const handleDelete = (fileId: number) => {
    router.delete(`/projects/${id}/files/${fileId}`, {
      onSuccess: () => showSuccessToast("Файл был успешно удален"),
      onError: () => showErrorToast("Произошла ошибка в ходе удаления файла"),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Файлы проекта</CardTitle>
        <CardDescription>
          Публично доступные файлы, относящиеся к вашему проекту
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FileUploadDialog id={id}>
          <Button size="sm">
            <Plus />
            Добавить файл
          </Button>
        </FileUploadDialog>

        {hasFiles ? (
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Имя файла</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.url}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>
                    <ConfirmationDialog
                      title="Подтверждение удаления файла"
                      description={`Вы уверены, что хотите удалить файл "${file.name}"? Это действие нельзя отменить.`}
                      onAction={() => handleDelete(file.id)}
                    >
                      <Button variant="outline" size="icon">
                        <Trash2 />
                      </Button>
                    </ConfirmationDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Text variant="muted" className="mt-4">
            Пока нет файлов
          </Text>
        )}
      </CardContent>
    </Card>
  );
}
