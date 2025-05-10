import React, { useState } from "react";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Label } from "@/shared/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/RadioGroup";
import { Text } from "@/shared/ui/Text";
import { useAuth } from "@/shared/hooks/useAuth";
import { useForm } from "@inertiajs/react";

type ApplicationForm = {
  title: string;
  projectName: string | undefined;
  description: string;
  customer: string;
  customerEmail: string;
  customerPhone: string | undefined;
  withProject: string | undefined;
};

export function SendApplicationForm() {
  const { user } = useAuth();

  const { data, setData, post, processing, transform, errors } =
    useForm<ApplicationForm>({
      title: "",
      projectName: undefined,
      description: "",
      customer: "",
      customerEmail: "",
      customerPhone: undefined,
      withProject: undefined,
    });

  transform((data) => ({
    ...data,
    withProject: data.withProject === "project",
  }));

  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
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
    post("/taskRequest");
  };

  return (
    <div className="border rounded-lg py-4 px-6">
      <form
        id="leave-request-form"
        className="space-y-6"
        onSubmit={handleSubmit}
      >
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
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="description">Описание проекта *</Label>
          <Textarea
            id="description"
            placeholder="Опишите проект..."
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            required
          />
        </div>

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
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="files">Прикрепить файлы</Label>
          <div
            className={cn(
              "border-2 border-input border-dashed rounded-lg p-4 text-center transition-colors",
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
                {files.length > 0
                  ? `${files.length} файл(ов) выбрано`
                  : "Перетащите файлы сюда или"}
              </Text>
              <Button variant="outline" asChild className="mt-2">
                <label htmlFor="files" className="cursor-pointer">
                  Выбрать файлы
                </label>
              </Button>
            </div>
          </div>
        </div> */}

        {user && (
          <div className="space-y-2">
            <Label>Тип заявки *</Label>
            <RadioGroup
              className="flex space-x-4"
              value={data.withProject}
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
      </form>
    </div>
  );
}
