import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";

export default function Profile() {
  return (
    <div className="p-4">
      <Heading level={1}>Страница профиля</Heading>
      <div className="mt-4">
        <Text>Информация о профиле пользователя</Text>
      </div>
    </div>
  );
}
