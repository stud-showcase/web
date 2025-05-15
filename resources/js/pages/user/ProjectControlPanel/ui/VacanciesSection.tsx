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

function CreateVacancyDialog({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание вакансии</DialogTitle>
          <DialogDescription>
            Введите данные для новой вакансии.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input placeholder="Название вакансии" />
          <Textarea placeholder="Описание вакансии" />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button>Создать</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditVacancyDialog({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование вакансии</DialogTitle>
          <DialogDescription>Измените данные вакансии.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input placeholder="Название вакансии" />
          <Textarea placeholder="Описание вакансии" />
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Отмена</Button>
          </DialogClose>
          <Button>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function VacanciesSection({ vacancies }: { vacancies: Vacancy[] }) {
  const hasVacancies = vacancies.length > 0;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Вакансии</CardTitle>
          <CardDescription>Создание и управление вакансиями</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateVacancyDialog>
            <Button size="sm">
              <Plus />
              Добавить вакансию
            </Button>
          </CreateVacancyDialog>
          {hasVacancies ? (
            <Table className="mt-4">
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
                        <EditVacancyDialog>
                          <Button size="icon" variant="outline">
                            <Edit />
                          </Button>
                        </EditVacancyDialog>
                        <ConfirmationDialog
                          title="Подтверждение удаления вакансии"
                          description="Вы уверены, что хотите удалить вакансию? Это действие нельзя отменить."
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
            <Text variant="muted" className="mt-4">Пока нет вакансий</Text>
          )}
        </CardContent>
      </Card>
    </>
  );
}
