import { UserLayout } from "@/layouts/UserLayout";
import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";

export default function ProjectPage({ id }: { id: number }) {
  console.log(id);
  return (
    <UserLayout>
      <Container className="mt-8">
        <Heading level={1}>Страница проекта {id}</Heading>
      </Container>
    </UserLayout>
  );
}
