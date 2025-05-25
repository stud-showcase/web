import { FormEvent } from "react";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Label } from "@/shared/ui/Label";
import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import {
  COMPLEXITIES,
  getFlatTags,
  getOptionsTags,
  Task,
  TaskForm,
} from "@/entities/Task";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import { MultiSelect } from "@/shared/ui/MultiSelect";
import { useForm } from "@inertiajs/react";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { TasksFiles } from "./TaskFiles";

type TaskEditForm = Omit<TaskForm, "files">;

export function TaskEditForm({ task }: { task: Task }) {
  const tagsFlat = getFlatTags(task.tags);
  const tagsOptions = getOptionsTags(task.tags); // TODO: принимать норм тэги

  const { data, setData, put, errors, reset, clearErrors } =
    useForm<TaskEditForm>({
      title: task.title,
      description: task.description,
      customer: task.customer,
      customerEmail: task.customerEmail || "",
      customerPhone: task.customerPhone || "",
      maxMembers: task.maxMembers.toString(),
      deadline: task.deadline,
      complexityId: task.complexity.id.toString(),
      maxProjects: task.maxProjects?.toString() || "",
      tags: tagsFlat,
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/admin/tasks/${task.id}`, {
      preserveScroll: true,
      onSuccess: () => showSuccessToast("Задача успешно отредактирована"),
      onError: () =>
        showErrorToast("Произошла ошибка в ходе редактирования задачи"),
    });
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset();
    clearErrors();
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <div className="grid grid-cols-2 gap-4 items-start">
        <div className="space-y-4">
          <div className="space-y-4 border p-4 rounded-md shadow-sm">
            <Heading level={5}>Общая информация</Heading>
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
          </div>

          <div className="space-y-4 border p-4 rounded-md shadow-sm">
            <Heading level={5}>Дополнительная информация</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="complexity">Сложность *</Label>
                <Select
                  value={data.complexityId}
                  onValueChange={(value) => setData("complexityId", value)}
                  required
                >
                  <SelectTrigger>
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
                  options={tagsOptions}
                  onValueChange={(value) => setData("tags", value)}
                  defaultValue={data.tags}
                  placeholder="Выберите тэги..."
                  maxCount={3}
                  id="tags"
                />
                {errors.tags && <ValidationErrorText text={errors.tags} />}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxMembers">
                  Ограничение по числу участников *
                </Label>
                <Input
                  id="maxMembers"
                  placeholder="Введите максимальное количество участников..."
                  type="number"
                  value={data.maxMembers}
                  onChange={(e) => setData("maxMembers", e.target.value)}
                  required
                />
                {errors.maxMembers && (
                  <ValidationErrorText text={errors.maxMembers} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxProjects">
                  Ограничение по числу проектов
                </Label>
                <Input
                  type="number"
                  id="maxProjects"
                  placeholder="Введите максимальное число проектов..."
                  value={data.maxProjects}
                  onChange={(e) => setData("maxProjects", e.target.value)}
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
                />
                {errors.deadline && (
                  <ValidationErrorText text={errors.deadline} />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 border p-4 rounded-md shadow-sm">
            <Heading level={5}>Контактная информация</Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Заказчик *</Label>
                <Input
                  id="customer"
                  placeholder="Укажите заказчика..."
                  type="text"
                  value={data.customer}
                  onChange={(e) => setData("customer", e.target.value)}
                  required
                />
                {errors.customer && (
                  <ValidationErrorText text={errors.customer} />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  id="customerEmail"
                  placeholder="Введите email..."
                  type="email"
                  value={data.customerEmail ?? ""}
                  onChange={(e) => setData("customerEmail", e.target.value)}
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
                />
                {errors.customerPhone && (
                  <ValidationErrorText text={errors.customerPhone} />
                )}
              </div>
            </div>
          </div>
        </div>

        <TasksFiles id={task.id} files={task.files} />
      </div>
      <div className="flex gap-2 mt-6">
        <Button variant="outline" type="reset">
          Сбросить
        </Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}
