import { useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Label } from "@/shared/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/RadioGroup";
import { Text } from "@/shared/ui/Text";
import { Upload } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useAuth } from "@/shared/hooks/useAuth";

import "./send-application-form.css";

export function SendApplicationForm() {
  const { user } = useAuth();

  const [requestType, setRequestType] = useState<"task" | "project">("task");
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

  return (
    <div className="border rounded-lg py-4 px-6">
      <form id="leave-request-form" className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Название проекта *</Label>
          <Input
            id="title"
            placeholder="Введите название"
            type="text"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Описание проекта *</Label>
          <Textarea id="description" placeholder="Опишите проект" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="customer">Заказчик *</Label>
          <Input
            id="customer"
            placeholder="Введите имя или организацию"
            type="text"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" placeholder="Введите email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Телефон</Label>
          <Input id="phone" type="tel" placeholder="Введите телефон" />
        </div>

        <div className="space-y-2">
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
        </div>

        {user && (
          <div className="space-y-2">
            <Label>Тип заявки *</Label>
            <RadioGroup
              value={requestType}
              onValueChange={(value: "task" | "project") =>
                setRequestType(value)
              }
              className="flex space-x-4"
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
              {requestType === "task"
                ? "Предложите задачу для студентов в банк задач"
                : "Создайте проект с собственной темой для реализации"}
            </Text>
          </div>
        )}
      </form>
    </div>
  );
}
