import { Text } from "@/shared/ui/Text";
import { Heading } from "@/shared/ui/Heading";
import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";

export default function TaskBank() {
  return (
    <>
      <Head>
        <title>Банк задач</title>
      </Head>
      <UserLayout>
        <Heading level={1}>
          Банк задач
        </Heading>
        <div className="mt-4">
          <Text>Контент страницы банка задач</Text>
        </div>
      </UserLayout>
    </>
  );
}
