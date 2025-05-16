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

function FileUploadDialog({ children }: PropsWithChildren) {
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
        <Input type="file" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button>Загрузить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function FilesSection({
  files,
}: {
  files: { name: string; url: string }[];
}) {
  const hasFiles = files.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Файлы проекта</CardTitle>
        <CardDescription>
          Публично доступные файлы, относящиеся к вашему проекту
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FileUploadDialog>
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
                      description="Вы уверены, что хотите удалить этот файл? Это действие нельзя отменить."
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
