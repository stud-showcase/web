import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";

export default function Dashboard() {
  return (
    <div className="p-4">
      <Heading level={1}>Админ-панель</Heading>
      <div className="mt-4">
        <Text>Главный экран админ панели</Text>
      </div>
    </div>
  );
}
