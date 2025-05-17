import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { ProjectStatus, STATUSES } from "@/entities/Project";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";

export function StatusSection({
  id,
  status,
}: {
  id: number;
  status: ProjectStatus;
}) {
  const { put, data, setData } = useForm({
    statusId: status.id.toString(),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/projects/${id}`, {
      preserveScroll: true,
      onSuccess: () => showSuccessToast("Вы успешно изменили статус проекта"),
      onError: () =>
        showErrorToast("Произошла ошибка в ходе обновления статуса проекта"),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Статус проекта</CardTitle>
        <CardDescription>
          Показывает на каком этапе разработки находится ваш проект
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="project-status">
          <Select
            value={data.statusId}
            onValueChange={(value) => setData("statusId", value)}
          >
            <SelectTrigger className="w-[270px]">
              <SelectValue placeholder="Выберите статус проекта" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Статусы</SelectLabel>
                {STATUSES.map((status) => (
                  <SelectItem value={status.id.toString()} key={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button size="sm" form="project-status" type="submit">
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
}
