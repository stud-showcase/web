import { UserLayout } from "@/layouts/UserLayout";
import { Heading } from "@/shared/ui/Heading";
import { Container } from "@/shared/ui/Container";
import { Head, Link } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/Breadcrumb";
import { ComplexityBadge } from "@/features/ComplexityBadge";
import { mockProject } from "../Projects/mocks";
import { StatusBadge } from "@/features/StatusBadge";
import { HiringBadge } from "@/features/HiringBadge";
import { Tag } from "@/features/Tag";

export default function TaskPage() {
  return (
    <>
      <Head>
        <title>{mockProject.name}</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <main>
            <header className="border-b pb-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/projects">Проекты</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={`/tasks/${mockProject.task.id}`}>
                        {mockProject.task.title}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{mockProject.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="mt-6 flex flex-col sm:flex-row justify-between sm:items-center items-start gap-6">
                <Heading level={1}>{mockProject.name}</Heading>
                <ComplexityBadge complexity={mockProject.task.complexity} />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <StatusBadge status={mockProject.status} />
                {mockProject.isHiring && <HiringBadge />}
                {mockProject.task.tags.map((tag) => (
                  <Tag value={tag} />
                ))}
              </div>
            </header>
          </main>
        </Container>
      </UserLayout>
    </>
  );
}
