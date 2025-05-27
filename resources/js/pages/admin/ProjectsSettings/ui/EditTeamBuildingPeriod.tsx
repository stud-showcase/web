import { Heading } from "@/shared/ui/Heading";
import { useForm } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/Label";
import { FormEvent } from "react";
import { Settings } from "../model/Settings";
import { ValidationErrorText } from "@/shared/ui/ValidationErrorText";
import { showErrorToast, showSuccessToast } from "@/shared/lib/utils";

type EditTeamBuildingPeriodForm = {
  startDate: string;
  endDate: string;
};

const formatDateForInput = (dateString: string): string => {
  if (!dateString) return "";
  return dateString.split(" ")[0];
};

export function EditTeamBuildingPeriod({ settings }: { settings: Settings }) {
  const { data, setData, put, reset, clearErrors, errors } =
    useForm<EditTeamBuildingPeriodForm>({
      startDate: formatDateForInput(settings?.startDate || ""),
      endDate: formatDateForInput(settings?.endDate || ""),
    });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    put("/admin/projects/settings", {
      preserveScroll: true,
      preserveState: true,
      onSuccess: () =>
        showSuccessToast("Вы успешно обновили периоды командообразования"),
      onError: () =>
        showErrorToast(
          "Произошла ошибка в ходе изменения периодов командообразования"
        ),
    });
  };

  const handleReset = () => {
    reset();
    clearErrors();
  };

  return (
    <form onSubmit={handleSubmit} onReset={handleReset} className="space-y-4">
      <div className="border rounded-lg space-y-4 shadow-sm p-4">
        <Heading level={5}>Период командообразования</Heading>
        <div className="space-y-2">
          <Label htmlFor="startDate">Дата начала *</Label>
          <Input
            type="date"
            id="startDate"
            value={data.startDate}
            required
            onChange={(e) => setData("startDate", e.target.value)}
          />
          {errors.startDate && <ValidationErrorText text={errors.startDate} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="endDate">Дата окончания *</Label>
          <Input
            type="date"
            id="endDate"
            value={data.endDate}
            required
            onChange={(e) => setData("endDate", e.target.value)}
          />
          {errors.endDate && <ValidationErrorText text={errors.endDate} />}
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" type="reset">
          Сбросить
        </Button>
        <Button>Сохранить</Button>
      </div>
    </form>
  );
}
