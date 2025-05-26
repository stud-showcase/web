import { roleTranslations, User } from "@/entities/User";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { MultiSelect } from "@/shared/ui/MultiSelect";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";

type UserEdit = {
  firstName: string;
  secondName: string;
  lastName: string;
  email: string;
  roles: string[];
};

export function UserEditForm({ user }: { user: User }) {
  const rolesOptions = Object.entries(roleTranslations).map(
    ([value, label]) => ({
      label,
      value,
    })
  );

  const { data, setData, errors, reset, clearErrors, put } = useForm<UserEdit>({
    firstName: user.firstName,
    secondName: user.secondName,
    lastName: user.lastName || "",
    email: user.email,
    roles: user.roles,
  });

  const handleReset = () => {
    reset();
    clearErrors();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/admin/users/${user.id}`, {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () => {
        showSuccessToast("Вы успешно отредактировали пользователя");
      },
      onError: () =>
        showErrorToast("Произошла ошибка в ходе редактирования пользователя"),
    });
  };

  return (
    <form className="space-y-4" onReset={handleReset} onSubmit={handleSubmit}>
      <div className="space-y-4 border p-4 rounded-md shadow-sm bg-background">
        <Heading level={5}>Основаная информация</Heading>
        <div className="space-y-2">
          <Label htmlFor="firstName">Имя *</Label>
          <Input
            id="firstName"
            placeholder="Введите имя..."
            type="text"
            value={data.firstName}
            onChange={(e) => setData("firstName", e.target.value)}
            required
          />
          {errors.firstName && <ValidationErrorText text={errors.firstName} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondName">Фамилия *</Label>
          <Input
            id="secondName"
            placeholder="Введите фамилию..."
            type="text"
            value={data.secondName}
            onChange={(e) => setData("secondName", e.target.value)}
            required
          />
          {errors.secondName && (
            <ValidationErrorText text={errors.secondName} />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Отчество</Label>
          <Input
            id="lastName"
            placeholder="Введите отчество..."
            type="text"
            value={data.lastName}
            onChange={(e) => setData("lastName", e.target.value)}
          />
          {errors.lastName && <ValidationErrorText text={errors.lastName} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Отчество</Label>
          <Input
            id="email"
            placeholder="Введите email..."
            type="text"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
          />
          {errors.email && <ValidationErrorText text={errors.email} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="roles">Роли</Label>
          <MultiSelect
            id="roles"
            placeholder="Выберите роли..."
            options={rolesOptions}
            defaultValue={data.roles}
            onValueChange={(value) => setData("roles", value)}
            maxCount={3}
          />
          {errors.email && <ValidationErrorText text={errors.email} />}
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
