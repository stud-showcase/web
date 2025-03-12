import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";

export default function Users() {
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
