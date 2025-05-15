import { CalendarIcon, UsersIcon, Briefcase } from "lucide-react";
import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";
import { getMemberLabel } from "@/entities/Task";

export function InfoSection({
  deadline,
  maxMembers,
  customer,
}: {
  deadline: string;
  maxMembers: number;
  customer: string;
}) {
  return (
    <section className="mt-10">
      <Heading level={3}>Информация о задаче</Heading>
      <div className="mt-4 flex flex-wrap gap-6">
        <InfoCard icon={<CalendarIcon />} label="Дедлайн" value={deadline} />
        <InfoCard
          icon={<UsersIcon />}
          label="Команда"
          value={`Максимально ${maxMembers} ${getMemberLabel(maxMembers)}`}
        />
        <InfoCard icon={<Briefcase />} label="Заказчик" value={customer} />
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-white border p-4 rounded-lg flex-1 min-w-[200px] shadow-sm">
      {icon}
      <div>
        <Text variant="muted">{label}</Text>
        <Text>{value}</Text>
      </div>
    </div>
  );
}
