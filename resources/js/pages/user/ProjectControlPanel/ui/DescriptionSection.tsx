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
import { showErrorToast, showSuccessToast } from "../util/showToast";

export function DescriptionSection({
  id,
  description,
}: {
  id: number;
  description: string | null;
}) {
  const { put, errors, data, setData, transform } = useForm({
    description,
  });

  transform((data) => ({
    annotation: data.description,
  }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/projects/${id}`, {
      onSuccess: () => showSuccessToast("Вы успешно изменили описание проекта"),
      onError: () =>
        showErrorToast("Произошла ошибка в ходе обновления описания проекта"),
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
        <form onSubmit={handleSubmit} id="project-description">
          <Textarea
            value={data.description ?? ""}
            onChange={(e) => setData("description", e.target.value)}
            placeholder="Введите описание проекта..."
            required
          />
          {errors.description && (
            <ValidationErrorText text={errors.description} />
          )}
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
