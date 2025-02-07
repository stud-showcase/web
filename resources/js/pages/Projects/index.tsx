import { Text } from "@/shared/ui/Text";
import { Heading } from "@/shared/ui/Heading";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <UserLayout>
        <Heading level={1}>
          Страница с проектами
        </Heading>
        <div className="mt-4">
          <Text>Контент страницы с проектами</Text>
        </div>
      </UserLayout>
    </>
  );
}
