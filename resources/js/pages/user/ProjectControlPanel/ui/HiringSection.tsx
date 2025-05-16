import { Switch } from "@/shared/ui/Switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { showToast } from "../util/showToast";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";

export function HiringSection({
  id,
  isHiring,
}: {
  id: number;
  isHiring: boolean;
}) {
  const { put, errors, data, setData, transform } = useForm({
    isClose: isHiring,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/projects/${id}`, {
      onSuccess: () =>
        showToast(
          `Вы успешно ${data.isClose ? "открыли" : "закрыли"} набор в проект`
        ),
      onError: () =>
        showToast("Произошла ошибка при изменении статуса набора в проект"),
    });
  };

  transform((data) => ({
    isClose: data.isClose ? 1 : 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Набор в проектную команду</CardTitle>
        <CardDescription>
          {data.isClose
            ? "Новые участники могут подавать заявки"
            : "Набор закрыт — заявки не принимаются"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} id="projectHiring">
        <CardContent>
          <div className="flex items-center gap-3">
            <Switch
              checked={data.isClose}
              onCheckedChange={(checked) => setData("isClose", checked)}
            />
            <Text variant="muted">
              {data.isClose ? "Набор открыт" : "Набор закрыт"}
            </Text>
          </div>
          {errors.isClose && <ValidationErrorText text={errors.isClose} />}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button size="sm" form="projectHiring">
            Сохранить
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
