import { useForm } from "@inertiajs/react";
import { ExtendedProject } from "../model/ExtendedProject";
import { FormEvent } from "react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { Heading } from "@/shared/ui/Heading";
import { Label } from "@/shared/ui/Label";
import { Input } from "@/shared/ui/Input";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { Textarea } from "@/shared/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { STATUSES } from "@/entities/Project";
import { Button } from "@/shared/ui/Button";

type ProjectForm = {
  name: string;
  annotation: string;
  statusId: string;
  isHiring: string;
};

export function ProjectEditForm({ project }: { project: ExtendedProject }) {
  const { data, setData, errors, put, clearErrors, reset } =
    useForm<ProjectForm>({
      name: project.name,
      annotation: project.annotation || "",
      statusId: project.status.id.toString(),
      isHiring: project.isHiring ? "1" : "0",
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/admin/projects/${project.id}`, {
      onSuccess: () => showSuccessToast("Проект успешно отредактирован"),
      onError: () =>
        showErrorToast("Произошла ошибка в ходе редактирования проекта"),
    });
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset();
    clearErrors();
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4">
      <div className="space-y-4 border p-4 rounded-md shadow-sm bg-background">
        <Heading level={5}>Общая информация</Heading>
        <div className="space-y-2">
          <Label htmlFor="title">Название проекта *</Label>
          <Input
            id="title"
            placeholder="Введите название проекта..."
            type="text"
            value={data.name}
            onChange={(e) => setData("name", e.target.value)}
            required
          />
          {errors.name && <ValidationErrorText text={errors.name} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Описание проекта</Label>
          <Textarea
            id="description"
            placeholder="Опишите проект..."
            value={data.annotation}
            onChange={(e) => setData("annotation", e.target.value)}
          />
          {errors.annotation && (
            <ValidationErrorText text={errors.annotation} /> 
          )}
        </div>
      </div>

      <div className="space-y-4 border p-4 rounded-md shadow-sm bg-background">
        <Heading level={5}>Дополнительная информация</Heading>
        <div className="space-y-2">
          <Label htmlFor="status">Статус *</Label>
          <Select
            value={data.statusId}
            onValueChange={(value) => setData("statusId", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите статус проекта..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Статус</SelectLabel>
                {STATUSES.map((status) => (
                  <SelectItem value={status.id.toString()} key={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.statusId && <ValidationErrorText text={errors.statusId} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Набор в команду*</Label>
          <Select
            value={data.isHiring}
            onValueChange={(value) => setData("isHiring", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите статус набора в команду..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Набор</SelectLabel>
                <SelectItem value="1">Открыт</SelectItem>
                <SelectItem value="0">Закрыт</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.statusId && <ValidationErrorText text={errors.statusId} />}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" type="reset">
          Сбросить
        </Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}
