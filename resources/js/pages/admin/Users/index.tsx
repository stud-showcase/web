import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";

export default function UsersPage() {
  return (
    <>
      <Head>
        <title>Пользователи</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Пользователи</Heading>
      </AdminLayout>
    </>
  );
}
