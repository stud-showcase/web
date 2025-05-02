import { Head, Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import {
  Check,
  FileIcon,
  Link as LinkIcon,
  User,
  UserPlus,
  X,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/Breadcrumb";
import { Text } from "@/shared/ui/Text";
import { Heading } from "@/shared/ui/Heading";
import { ComplexityBadge, Task, TaskTag } from "@/entities/Task";
import { HiringBadge, Project, ProjectStatusBadge } from "@/entities/Project";
import { useAuth } from "@/shared/hooks/useAuth";
import { Vacancy } from "@/entities/Vacancy";
import { project, task, vacancy } from "@/shared/mocks";
import { UserLayout } from "@/layouts/UserLayout";
import { Container } from "@/shared/ui/Container";

type Props = {
  project: Project;
  task: Task;
  vacancies?: Vacancy[];
};

export default function ProjectPage({}: Props) {
  const { user } = useAuth();
  const vacancies = Array(4).fill(vacancy);

  return (
    <>
      <Head>
        <title>{project.name}</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <header className="border-b pb-8  bg-background">
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
                    <Link href={`/tasks/${task.id}`}>{task.title}</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbPage>{project.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Heading level={1}>{project.name}</Heading>
                <div className="flex flex-row w-full sm:w-auto gap-3">
                  {task && (
                    <Button
                      variant="outline"
                      asChild
                      className="flex-1 sm:flex-none"
                    >
                      <Link href={`/tasks/1}`}>
                        <LinkIcon /> К задаче
                      </Link>
                    </Button>
                  )}
                  {user && project.isHiring && (
                    <Button className="flex-1 sm:flex-none">
                      <UserPlus />
                      Вступить
                    </Button>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <ComplexityBadge complexity="medium" />
                <ProjectStatusBadge status="in_progress" />
                <HiringBadge isHiring={true} />
                {task?.tags.map((tag) => (
                  <TaskTag value={tag} />
                ))}
              </div>
            </div>
          </header>

          {project?.abstract && (
            <section className="mt-8">
              <div className="flex gap-2 items-center">
                <Heading level={3}>Описание</Heading>
              </div>
              <Text className="mt-4" variant="muted">
                {project.abstract}
              </Text>
            </section>
          )}

          {project?.files && (
            <section className="mt-10">
              <Heading level={3}>Дополнительные материалы</Heading>
              <div className="mt-4 flex flex-wrap gap-3">
                {project.files.map((file) => (
                  <Button key={file.name} variant="outline" size="sm" asChild>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <FileIcon className="h-4 w-4" />
                      {file.name}
                    </a>
                  </Button>
                ))}
              </div>
            </section>
          )}

          <section className="mt-10">
            <Heading level={3}>Проектная команда</Heading>
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 border p-4 rounded-lg">
                <Avatar>
                  <AvatarFallback className="bg-muted">Н</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Text>{project.mentor}</Text>
                  <Text variant="muted">Наставник проекта</Text>
                </div>
              </div>
              {project.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 border p-4 rounded-lg"
                >
                  <Avatar>
                    <AvatarFallback className="bg-muted">
                      {member.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Text>{member.name}</Text>
                    {member.role && <Text variant="muted">{member.role}</Text>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {vacancies && (
            <section className="mt-10">
              <div className="flex gap-1 items-center">
                <Heading level={3}>Вакансии</Heading>
              </div>
              <div className="mt-4 space-y-3">
                {vacancies.map((vacancy) => (
                  <div
                    key={vacancy.id}
                    className="flex items-center justify-between  border p-4 rounded-lg"
                  >
                    <div>
                      <Text className="font-medium">{vacancy.title}</Text>
                      <Text variant="muted">{vacancy.description}</Text>
                    </div>
                    <Button size="sm" variant="secondary">
                      Подать заявку
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {user && project.requests && (
            <section className="mt-10">
              <Heading level={3}>Заявки</Heading>
              <div className="mt-4 border p-4 rounded-lg">
                {project.requests.map((request) => {
                  return (
                    <div className="flex items-center justify-between">
                      <div>
                        <Text>{request.name}</Text>
                        {request.role && (
                          <Text variant="muted">{request.role}</Text>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-success"
                        >
                          <Check />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="text-destructive"
                        >
                          <X />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </Container>
      </UserLayout>
    </>
  );
}
