import { FormEvent, PropsWithChildren } from "react";
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
import { Button } from "@/shared/ui/Button";
import { useForm } from "@inertiajs/react";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";

export function CreateProjectModal({
  taskId,
  children,
}: PropsWithChildren<{ taskId: number }>) {
  const { data, setData, post, errors, clearErrors } = useForm({
    taskId,
    projectName: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/projects", {
      onSuccess: () => showSuccessToast("Вы успешно создали проект"),
      onError: () => showErrorToast("Произошла ошибка в ходе создания проекта"),
    });
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
            <Input
              placeholder="Введите название проекта..."
              type="text"
              required
              value={data.projectName}
              onChange={(e) => setData("projectName", e.target.value)}
            />
            {errors.projectName && (
              <ValidationErrorText text={errors.projectName} />
            )}
          </div>
        </form>
        <DialogFooter>
          <div className="flex flex-col gap-2 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Отменить</Button>
            </DialogClose>
            <Button
              type="submit"
              form="project-creation-form"
              disabled={!data.projectName}
            >
              Создать проект
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
