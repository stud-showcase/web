import { Heading } from "@/shared/ui/Heading";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { Text } from "@/shared/ui/Text";
import { Container } from "@/shared/ui/Container";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Проекты</title>
      </Head>
      <UserLayout>
        <Container className="mt-8">
          <Heading level={1}>Страница с проектами</Heading>
          <div className="mt-4">
            <Text>Контент страницы с проектами</Text>
          </div>
        </Container>
      </UserLayout>
    </>
  );
}
