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
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { showToast } from "../util/showToast";

export function DescriptionSection({
  id,
  description,
}: {
  id: number;
  description: string | null;
}) {
  const { put, errors, data, setData } = useForm({
    annotation: description,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/projects/${id}`, {
      onSuccess: () => showToast("Вы успешно изменили описание проекта"),
      onError: () =>
        showToast("Произошла ошибка в ходе обновления описания проекта"),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Описание проекта</CardTitle>
        <CardDescription>
          Описание является публичной аннотацией к вашему проекту
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} id="projectDescription">
          <Textarea
            value={data.annotation ?? ""}
            onChange={(e) => setData("annotation", e.target.value)}
            placeholder="Введите описание проекта..."
          />
          {errors.annotation && (
            <ValidationErrorText text={errors.annotation} />
          )}
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button size="sm" form="projectDescription">
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
}
