import { FormEvent } from "react";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Label } from "@/shared/ui/Label";
import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { COMPLEXITIES, TaskForm, TaskTag } from "@/entities/Task";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { FileUpload } from "@/shared/ui/FileUpload";
import { MultiSelect } from "@/shared/ui/MultiSelect";
import { ServerFile } from "@/shared/types/ServerFile";
import { ServerFiles } from "./ServerFiles";

type Props = {
  data: TaskForm;
  setData: (key: keyof TaskForm, value: any) => void;
  errors: Partial<Record<keyof TaskForm, string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleReset: (e: FormEvent<HTMLFormElement>) => void;
  tags: { label: string; value: string }[];
  files?: ServerFile[];
};

export function TaskCreateForm({
  data,
  setData,
  errors,
  handleSubmit,
  handleReset,
  tags,
  files,
}: Props) {
  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      className="border rounded-lg p-3 shadow-sm max-w-4xl space-y-6"
    >
      <div className="space-y-4">
        <Heading level={3}>Общая информация</Heading>
        <div className="space-y-2">
          <Label htmlFor="title">Название задачи *</Label>
          <Input
            id="title"
            placeholder="Введите название задачи..."
            type="text"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
            required
            className="w-full"
          />
          {errors.title && <ValidationErrorText text={errors.title} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Описание задачи *</Label>
          <Textarea
            id="description"
            placeholder="Опишите задачу..."
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            required
            className="w-full min-h-[100px]"
          />
          {errors.description && (
            <ValidationErrorText text={errors.description} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="files">Файлы к описанию</Label>
          <FileUpload
            id="files"
            files={data.files}
            onFilesChange={(files) => setData("files", files)}
          />
          {errors.files && <ValidationErrorText text={errors.files} />}
          {files && <ServerFiles serverFiles={files} />}
        </div>
      </div>

      <div className="space-y-4">
        <Heading level={3}>Контактная информация</Heading>
        <div className="space-y-2">
          <Label htmlFor="customer">Заказчик *</Label>
          <Input
            id="customer"
            placeholder="Укажите заказчика..."
            type="text"
            value={data.customer}
            onChange={(e) => setData("customer", e.target.value)}
            required
            className="w-full"
          />
          {errors.customer && <ValidationErrorText text={errors.customer} />}
        </div>

        {/* TODO: nullable */}
        <div className="space-y-2">
          <Label htmlFor="customerEmail">Email</Label>
          <Input
            id="customerEmail"
            placeholder="Введите email..."
            type="email"
            value={data.customerEmail ?? ""}
            onChange={(e) => setData("customerEmail", e.target.value)}
            className="w-full"
          />
          {errors.customerEmail && (
            <ValidationErrorText text={errors.customerEmail} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerPhone">Телефон</Label>
          <Input
            id="customerPhone"
            placeholder="Введите телефон..."
            type="tel"
            value={data.customerPhone ?? ""}
            onChange={(e) => setData("customerPhone", e.target.value)}
            className="w-full"
          />
          {errors.customerPhone && (
            <ValidationErrorText text={errors.customerPhone} />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Heading level={3}>Дополнительная информация</Heading>
        <div className="space-y-2">
          <Label htmlFor="complexity">Сложность *</Label>
          <Select
            value={data.complexityId}
            onValueChange={(value) => setData("complexityId", value)}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите сложность проекта..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Сложность</SelectLabel>
                {COMPLEXITIES.map((complexity) => (
                  <SelectItem
                    value={complexity.id.toString()}
                    key={complexity.id}
                  >
                    {complexity.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.complexityId && (
            <ValidationErrorText text={errors.complexityId} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Тэги</Label>
          <MultiSelect
            options={tags}
            onValueChange={(value) => setData("tags", value)}
            defaultValue={data.tags}
            placeholder="Выберите тэги..."
            maxCount={3}
            id="tags"
          />
          {errors.tags && <ValidationErrorText text={errors.tags} />}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxMembers">Ограничение по числу участников *</Label>
        <Input
          id="maxMembers"
          placeholder="Введите максимальное количество участников..."
          type="number"
          value={data.maxMembers}
          onChange={(e) => setData("maxMembers", e.target.value)}
          required
          className="w-full"
        />
        {errors.maxMembers && <ValidationErrorText text={errors.maxMembers} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="maxProjects">Ограничение по числу проектов</Label>
        <Input
          type="number"
          id="maxProjects"
          placeholder="Введите максимальное число проектов..."
          value={data.maxProjects}
          onChange={(e) => setData("maxProjects", e.target.value)}
          className="w-full"
        />
        {errors.maxProjects && (
          <ValidationErrorText text={errors.maxProjects} />
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deadline">Крайний срок *</Label>
        <Input
          type="date"
          id="deadline"
          value={data.deadline}
          onChange={(e) => setData("deadline", e.target.value)}
          required
          className="w-full"
        />
        {errors.deadline && <ValidationErrorText text={errors.deadline} />}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" type="reset">
          Сбросить
        </Button>
        <Button type="submit">Создать задачу</Button>
      </div>
    </form>
  );
}
