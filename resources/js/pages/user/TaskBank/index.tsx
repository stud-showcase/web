import { Heading } from "@/shared/ui/Heading";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { Text } from "@/shared/ui/Text";
import { Container } from "@/shared/ui/Container";

export default function TaskBank() {
  return (
    <>
      <Head>
        <title>Банк задач</title>
      </Head>
      <UserLayout>
        <Container className="mt-8">
          <Heading level={1}>Банк задач</Heading>
          <div className="mt-4">
            <Text>Контент страницы банка задач</Text>
          </div>
        </Container>
      </UserLayout>
    </>
  );
}
