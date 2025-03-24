import { UserLayout } from "@/layouts/UserLayout";
import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";

export default function Vacancies() {
  return <UserLayout>
    <Container className="pt-8">
      <Heading level={1}>Вакансии</Heading>
    </Container>
  </UserLayout>
}
