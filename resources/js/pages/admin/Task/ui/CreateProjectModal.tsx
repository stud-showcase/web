import { FormEvent } from "react";
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
import { Plus } from "lucide-react";

export function CreateProjectModal({ taskId }: { taskId: number }) {
  const { data, setData, post, errors, clearErrors } = useForm({
    taskId,
    projectName: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/admin/projects", {
      onSuccess: () => showSuccessToast("Вы успешно создали проект"),
      onError: () => showErrorToast("Произошла ошибка в ходе создания проекта"),
    });
  };

  return (
    <Dialog onOpenChange={(open) => !open && clearErrors()}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Plus />
          Создать проект
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создание проекта</DialogTitle>
          <DialogDescription>
            Для создание проекта, укажите его название. Его можно будет изменить.
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
