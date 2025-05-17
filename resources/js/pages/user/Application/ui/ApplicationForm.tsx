import { FormEvent } from "react";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Label } from "@/shared/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/RadioGroup";
import { Text } from "@/shared/ui/Text";
import { useAuth } from "@/shared/hooks/useAuth";
import { useForm } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { FileUpload } from "@/shared/ui/FileUpload";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";

type ApplicationForm = {
  title: string;
  projectName: string;
  description: string;
  customer: string;
  customerEmail: string;
  customerPhone: string;
  withProject: string;
  files: File[];
};

export function ApplicationForm() {
  const { user } = useAuth();

  const { data, setData, post, transform, errors, reset, clearErrors } =
    useForm<ApplicationForm>({
      title: "",
      projectName: "",
      description: "",
      customer: "",
      customerEmail: "",
      customerPhone: "",
      withProject: "",
      files: [],
    });

  transform((data) => ({
    ...data,
    withProject: data.withProject === "project",
  }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/application", {
      onSuccess: () => {
        reset();
        showSuccessToast(
          `Ваша заявка успешно отправлена и будет рассмотрена администратором.`
        );
      },
      onError: () => {
        reset();
        showErrorToast(
          `Произошла ошибка в ходе отправки заявки. Повторите еще раз или попробуйте позже`
        );
      },
    });
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    reset();
  };

  return (
    <form
      id="leave-request-form"
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="border rounded-lg p-4 shadow-sm"
    >
      <Heading level={3}>Общая информация</Heading>
      <div className="mt-3 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Название задачи *</Label>
          <Input
            id="title"
            placeholder="Введите название задачи..."
            type="text"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
            required
          />
          {errors.title && <ValidationErrorText text={errors.title} />}
        </div>
        {data.withProject === "project" && (
          <div className="space-y-2">
            <Label htmlFor="project-name">Название проекта *</Label>
            <Input
              id="project-name"
              placeholder="Введите название проекта..."
              type="text"
              value={data.projectName}
              onChange={(e) => setData("projectName", e.target.value)}
              required
            />
            {errors.projectName && (
              <ValidationErrorText text={errors.projectName} />
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="description">Описание задачи *</Label>
          <Textarea
            id="description"
            placeholder="Опишите задачу..."
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            required
          />
          {errors.description && (
            <ValidationErrorText text={errors.description} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="files">Прикрепить файлы</Label>
          <FileUpload
            name="files"
            files={data.files}
            onFilesChange={(files) => setData("files", files)}
          />
          {errors.files && <ValidationErrorText text={errors.files} />}
        </div>

        {user && (
          <div className="space-y-2">
            <Label>Тип заявки *</Label>
            <RadioGroup
              className="flex space-x-4"
              value={data.withProject}
              name="withProject"
              required
              onValueChange={(value) => setData("withProject", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="task" id="task" />
                <Label htmlFor="task" className="cursor-pointer">
                  Добавить задачу в банк
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="project" id="project" />
                <Label htmlFor="project" className="cursor-pointer">
                  Создать проект
                </Label>
              </div>
            </RadioGroup>
            <Text variant="muted">
              {data.withProject === "project"
                ? "Создайте проект с собственной темой для реализации"
                : "Предложите задачу для студентов в банк задач"}
            </Text>
          </div>
        )}
      </div>
      <Heading level={3} className="mt-8">
        Контактная информация
      </Heading>
      <div className="mt-3 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="customer">Заказчик *</Label>
          <Input
            id="customer"
            placeholder="Введите имя или организацию..."
            type="text"
            value={data.customer}
            onChange={(e) => setData("customer", e.target.value)}
            required
          />
          {errors.customer && <ValidationErrorText text={errors.customer} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="Введите email..."
            value={data.customerEmail}
            onChange={(e) => setData("customerEmail", e.target.value)}
            required
          />
          {errors.customerEmail && (
            <ValidationErrorText text={errors.customerEmail} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Введите телефон..."
            value={data.customerPhone}
            onChange={(e) => setData("customerPhone", e.target.value)}
          />
          {errors.customerPhone && (
            <ValidationErrorText text={errors.customerPhone} />
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <Button variant={"outline"} type="reset">
          Сбросить
        </Button>
        <Button type="submit">Оставить заявку</Button>
      </div>
    </form>
  );
}
