import { Text } from "@/shared/ui/Text";
import { Heading } from "@/shared/ui/Heading";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";

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
        <div className="mt-4">
          <Text>Контент главной страницы</Text>
        </div>
      </UserLayout>
    </>
  );
}
