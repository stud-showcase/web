import { Heading } from "@/shared/ui/Heading";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { Text } from "@/shared/ui/Text";

export default function Vacancies() {
  return (
    <>
      <Head>
        <title>Вакансии</title>
      </Head>
      <UserLayout>
        <Heading level={1}>
          Вакансии
        </Heading>
        <div className="mt-4">
          <Text>Контент страницы с вакансиями</Text>
        </div>
      </UserLayout>
    </>
  );
}
