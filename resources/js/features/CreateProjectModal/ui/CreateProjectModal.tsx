import {
  FormEvent,
  PropsWithChildren,
} from "react";
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
import { Label } from "@/shared/ui/Label";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { useForm } from "@inertiajs/react";
import { Task } from "@/entities/Task";

export function CreateProjectModal({
  task,
  children,
}: PropsWithChildren<{ task: Task }>) {
  const { data, setData, post, errors, clearErrors } = useForm({
    taskId: task.id,
    projectName: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/projects");
  };

  return (
    <Dialog onOpenChange={(open) => !open && clearErrors()}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать проект</DialogTitle>
          <DialogDescription>
            Придумайте название проекта. Его можно будет изменить позже
          </DialogDescription>
        </DialogHeader>
        <form id="project-creation-form" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="title">Название проекта *</Label>
            <Input
              id="projectName"
              placeholder="Введите название"
              type="text"
              required
              value={data.projectName}
              onChange={(e) => setData("projectName", e.target.value)}
            />
            {errors.projectName && (
              <div className="mt-2 text-destructive text-xs">{errors.projectName}</div>
            )}
          </div>
        </form>
        <DialogFooter>
          <div className="flex flex-col gap-2 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Отменить</Button>
            </DialogClose>
            <Button type="submit" form="project-creation-form">
              Отправить
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
