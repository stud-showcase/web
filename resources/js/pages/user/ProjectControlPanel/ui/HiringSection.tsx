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
    isHiring,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/projects/${id}`, {
      onSuccess: () =>
        showToast(
          `Вы успешно ${data.isHiring ? "открыли" : "закрыли"} набор в проект`
        ),
      onError: () =>
        showToast("Произошла ошибка при изменении статуса набора в проект"),
    });
  };

  transform((data) => ({
    isClose: !data.isHiring ? 1 : 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Набор в проектную команду</CardTitle>
        <CardDescription>
          {data.isHiring
            ? "Новые участники могут подавать заявки"
            : "Набор закрыт — заявки не принимаются"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} id="project-hiring">
        <CardContent>
          <div className="flex items-center gap-3">
            <Switch
              checked={data.isHiring}
              onCheckedChange={(checked) => setData("isHiring", checked)}
            />
            <Text variant="muted">
              {data.isHiring ? "Набор открыт" : "Набор закрыт"}
            </Text>
          </div>
          {errors.isHiring && <ValidationErrorText text={errors.isHiring} />}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button size="sm" form="project-hiring">
            Сохранить
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
