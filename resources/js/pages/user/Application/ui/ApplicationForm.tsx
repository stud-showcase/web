import React, { useState } from "react";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Label } from "@/shared/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/RadioGroup";
import { Text } from "@/shared/ui/Text";
import { useAuth } from "@/shared/hooks/useAuth";
import { useForm } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { useToast } from "@/shared/hooks/useToast";
import { Heading } from "@/shared/ui/Heading";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { cn } from "@/shared/lib/utils";
import { Upload } from "lucide-react";

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

  const { toast } = useToast();

  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setData("files", Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      setData("files", Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post("/application", {
      onSuccess: () => {
        reset();
        toast({
          title: "Заявка успешно отправлена",
          description: `Ваша заявка успешно отправлена и будет рассмотрена администратором.`,
        });
      },
      onError: () => {
        reset();
        toast({
          title: "Не удалось отправить заявку",
          description: `Произошла ошибка в ходе отправки заявки. Повторите еще раз или попробуйте позже`,
          variant: "destructive",
        });
      },
    });
  };

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearErrors();
    reset();
  };

  return (
    <form id="leave-request-form" onSubmit={handleSubmit} onReset={handleReset}>
      <Heading level={3}>Общая информация</Heading>
      <div className="mt-3 border rounded-lg p-4 shadow-sm space-y-6">
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
            <Label htmlFor="projectName">Название проекта *</Label>
            <Input
              id="projectName"
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
          <div
            className={cn(
              "border-2 border-input border-dashed rounded-lg p-8 text-center transition-colors",
              {
                "border-primary bg-muted/20": isDragging,
              }
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              id="files"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="space-y-2">
              <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
              <Text variant="muted">
                {data.files.length > 0
                  ? `${data.files.length} файл(ов) выбрано`
                  : "Перетащите файлы сюда или"}
              </Text>
              <Button variant="outline" asChild className="mt-2">
                <label htmlFor="files" className="cursor-pointer">
                  Выбрать файлы
                </label>
              </Button>
            </div>
          </div>
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
      <div className="mt-3 border rounded-lg p-4 shadow-sm space-y-6">
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

      <div className="flex gap-2 mt-5">
        <Button variant={"outline"} type="reset">
          Сбросить
        </Button>
        <Button type="submit">Оставить заявку</Button>
      </div>
    </form>
  );
}
