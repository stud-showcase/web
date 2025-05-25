import { Button } from "@/shared/ui/Button";
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
import { PropsWithChildren } from "react";
import { Download, Plus, Trash2 } from "lucide-react";
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
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { ServerFile } from "@/shared/types/ServerFile";
import { Heading } from "@/shared/ui/Heading";

function FileUploadDialog({ id, children }: PropsWithChildren<{ id: number }>) {
  const { data, setData, post, reset } = useForm<{ files: File[] }>({
    files: [],
  });

  const handleSubmit = () => {
    post(`/admin/projects/${id}/files`, {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        showSuccessToast("Файлы успешно загружены");
      },
      onError: (errors) => {
        reset();
        showErrorToast(errors.files);
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Загрузка файла</AlertDialogTitle>
          <AlertDialogDescription>
            Выберите файл для загрузки к проекту.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <FileUpload
            id="files"
            files={data.files}
            onFilesChange={(files) => setData("files", files)}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            disabled={data.files.length === 0}
          >
            Загрузить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ProjectFiles({ id, files }: { id: number; files: ServerFile[] }) {
  const hasFiles = files.length > 0;

  const handleDelete = (fileId: number) => {
    router.delete(`/admin/projects/${id}/files/${fileId}`, {
      preserveScroll: true,
      onSuccess: () => showSuccessToast("Файл был успешно удален"),
      onError: () => showErrorToast("Произошла ошибка в ходе удаления файла"),
    });
  };

  return (
    <div className="space-y-4 border p-4 rounded-md shadow-sm">
      <Heading level={5}>Файлы проекта</Heading>
      <FileUploadDialog id={id}>
        <Button size="sm" variant="outline">
          <Plus />
          Добавить файл
        </Button>
      </FileUploadDialog>

      {hasFiles ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Имя файла</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.path}>
                <TableCell>{file.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="icon" variant="outline" asChild>
                      <a href={`/download/${encodeURIComponent(file.path)}`}>
                        <Download />
                      </a>
                    </Button>
                    <ConfirmationDialog
                      title="Подтверждение удаления файла"
                      description={`Вы уверены, что хотите удалить файл "${file.name}"? Это действие нельзя отменить.`}
                      onAction={() => handleDelete(file.id)}
                    >
                      <Button variant="outline" size="icon">
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
          Пока нет файлов
        </Text>
      )}
    </div>
  );
}
