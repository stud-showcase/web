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
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";

export function NameSection({ id, name }: { id: number; name: string }) {
  const { put, data, setData } = useForm({
    name,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/projects/${id}`, {
      preserveScroll: true,
      onSuccess: () => showSuccessToast("Вы успешно изменили название проекта"),
      onError: (errors) => showErrorToast(errors.name),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Название проекта</CardTitle>
        <CardDescription>Публичное имя вашего проекта</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="project-name">
          <Input
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            placeholder="Введите название проекта..."
            required
          />
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
