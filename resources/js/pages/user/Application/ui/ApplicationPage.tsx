import { UserLayout } from "@/layouts/UserLayout";
import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { ApplicationForm } from "./ApplicationForm";

export default function ApplicationPage() {
  return (
    <>
      <Head>
        <title>Заявка</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <Heading level={1}>Заявка</Heading>
          <div className="mt-6">
            <ApplicationForm />
          </div>
        </Container>
      </UserLayout>
    </>
  );
}
