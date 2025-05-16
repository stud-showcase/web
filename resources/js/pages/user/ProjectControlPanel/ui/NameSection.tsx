import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { showToast } from "../util/showToast";

export function NameSection({ id, name }: { id: number; name: string }) {
  const { put, errors, data, setData } = useForm({
    name,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/projects/${id}`, {
      onSuccess: () => showToast("Вы успешно изменили название проекта"),
      onError: () =>
        showToast("Произошла ошибка в ходе обновления названия проекта"),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Название проекта</CardTitle>
        <CardDescription>
          Является публичным именем вашего проекта
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="project-name">
          <Input
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            placeholder="Введите название проекта..."
          />
          {errors.name && <ValidationErrorText text={errors.name} />}
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button size="sm" form="project-name" type="submit">
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
}
