import { Heading } from "@/shared/ui/Heading";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { Text } from "@/shared/ui/Text";

export default function Main() {
  return (
    <>
      <Head>
        <title>Главная</title>
      </Head>
      <UserLayout>
        <Heading level={1}>
          Главная страница
        </Heading>
        <Heading level={2}>
          Главная страница
        </Heading>
        <Heading level={3}>
          Главная страница
        </Heading>
        <Heading level={4}>
          Главная страница
        </Heading>
        <div className="mt-4">
          <Text variant="muted">Контент главной страницы</Text>
          <Text variant="small">Контент главной страницы</Text>
          <Text variant="default">Контент главной страницы</Text>
          <Text variant="large">Контент главной страницы</Text>
          <Text variant="lead">Контент главной страницы</Text>
        </div>
      </UserLayout>
    </>
  );
}
