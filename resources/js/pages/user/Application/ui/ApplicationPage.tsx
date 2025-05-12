import { UserLayout } from "@/layouts/UserLayout";
import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { ApplicationForm } from "./ApplicationForm";
import { Text } from "@/shared/ui/Text";

export default function ApplicationPage() {
  return (
    <>
      <Head>
        <title>Заявка</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <Heading level={1}>Подача заявки</Heading>
          <Text variant="muted" className="mt-6">
            Вы можете оставить заявку на добавления новой проектной темы в банк
            задач. Ваша заявка будет рассмотрена администраторами, после чего
            может быть принята и включена в банк задач для выполнения
            студенческими проектными командами. Для авторизованных в системе
            пользователей также доступна заявка на создание проекта с
            собственной темой, если таковой не нашлось в банке задач.
          </Text>
          <div className="mt-8">
            <ApplicationForm />
          </div>
        </Container>
      </UserLayout>
    </>
  );
}
