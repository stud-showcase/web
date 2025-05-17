import { Button } from "@/shared/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Textarea } from "@/shared/ui/Textarea";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";

export function DescriptionSection({
  id,
  description,
}: {
  id: number;
  description: string | null;
}) {
  const { put, data, setData } = useForm({
    annotation: description,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/projects/${id}`, {
      preserveScroll: true,
      onSuccess: () => showSuccessToast("Вы успешно изменили описание проекта"),
      onError: (errors) => showErrorToast(errors.annotation),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Описание проекта</CardTitle>
        <CardDescription>Публичная аннотация к вашему проекту</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="project-description">
          <Textarea
            value={data.annotation ?? ""}
            onChange={(e) => setData("annotation", e.target.value)}
            placeholder="Введите описание проекта..."
            required
          />
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button size="sm" form="project-description">
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
}
