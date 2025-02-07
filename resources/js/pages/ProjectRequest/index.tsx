import { Text } from "@/shared/ui/Text";
import { Heading } from "@/shared/ui/Heading";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";

export default function ProjectRequest() {
  return (
    <>
      <Head>
        <title>Заявка на проект</title>
      </Head>
      <UserLayout>
        <Heading level={1}>
          Страница заявки на проект
        </Heading>
        <div className="mt-4">
          <Text>Контент страницы заявки на проект</Text>
        </div>
      </UserLayout>
    </>
  );
}
