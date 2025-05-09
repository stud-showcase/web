import { Head, Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import {
  Check,
  ChevronDown,
  ChevronUp,
  FileIcon,
  Link as LinkIcon,
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
import { TaskComplexityBadge, TaskTagBadge } from "@/entities/Task";
import { ProjectHiringBadge, ProjectStatusBadge } from "@/entities/Project";
import { useAuth } from "@/shared/hooks/useAuth";
import { UserLayout } from "@/layouts/UserLayout";
import { Container } from "@/shared/ui/Container";
import { ExtendedProject } from "../model/ExtendedProject";
import { JoinProjectModal } from "@/features/JoinProjectModal";
import { mockVacancies } from "@/shared/mocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { useState } from "react";

function getAvatartName(firstName: string, lastName: string | null) {
  if (lastName) {
    return `${firstName[0]}${lastName[0]}`;
  }
  return firstName[0];
}

function getFullName(
  firstName: string,
  secondName: string,
  lastName: string | null
) {
  if (lastName) {
    return `${secondName} ${firstName} ${lastName}`;
  }
  return `${secondName} ${firstName}`;
}

export default function ProjectPage({ project }: { project: ExtendedProject }) {
  const { user } = useAuth();

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
                    <Link href={`/tasks/${project.task.id}`}>
                      {project.task.title}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{project.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Heading level={1}>{project.name}</Heading>
                <div className="flex flex-row w-full sm:w-auto gap-3">
                  <Button
                    variant="outline"
                    asChild
                    className="flex-1 sm:flex-none"
                    size="sm"
                  >
                    <Link href={`/tasks/${project.task.id}`}>
                      <LinkIcon /> К задаче
                    </Link>
                  </Button>
                  {user && project.canJoin && (
                    <JoinProjectModal
                      projectId={project.id}
                      vacancies={mockVacancies}
                    >
                      <Button className="flex-1 sm:flex-none" size="sm">
                        <UserPlus />
                        Вступить
                      </Button>
                    </JoinProjectModal>
                  )}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <TaskComplexityBadge complexity={project.task.complexity} />
                <ProjectStatusBadge status={project.status} />
                <ProjectHiringBadge isHiring={project.isHiring} />
                {project.task.tags &&
                  project.task.tags.length > 0 &&
                  project.task.tags.map((tag) => (
                    <TaskTagBadge tag={tag} key={tag.id} />
                  ))}
              </div>
            </div>
          </header>

          {project.annotation && (
            <section className="mt-8">
              <div className="flex gap-2 items-center">
                <Heading level={3}>Описание</Heading>
              </div>
              <Text className="mt-4" variant="muted">
                {project.annotation}
              </Text>
            </section>
          )}

          {project.files && project.files.length > 0 && (
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
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.mentor && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback className="bg-muted">
                          {getAvatartName(
                            project.mentor.firstName,
                            project.mentor.lastName
                          )}
                        </AvatarFallback>
                      </Avatar>
                      {getFullName(
                        project.mentor.firstName,
                        project.mentor.secondName,
                        project.mentor.lastName
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">Наставник проекта</Badge>
                  </CardContent>
                </Card>
              )}
              {project.members.map((member) => (
                <Card key={member.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Avatar>
                        <AvatarFallback className="bg-muted">
                          {getAvatartName(member.firstName, member.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      {getFullName(
                        member.firstName,
                        member.secondName,
                        member.lastName
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-row gap-2">
                      {member.isCreator && (
                        <Badge variant="secondary">Руководитель проекта</Badge>
                      )}
                      {member.position && (
                        <Badge variant="outline">{member.position}</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* TODO: подать заявку должно быть только если user && canJoin */}
          {project.vacancies && project.vacancies.length > 0 && (
            <section className="mt-10">
              <Heading level={3}>Вакансии</Heading>
              <div className="mt-4 space-y-4">
                {/* TODO: убрать мок вакансии */}
                {mockVacancies.map((vacancy) => {
                  const [isExpanded, setIsExpanded] = useState(false);

                  return (
                    <Card key={vacancy.id}>
                      <CardHeader>
                        <CardTitle title={vacancy.name}>
                          {vacancy.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <Text
                            variant="muted"
                            className={isExpanded ? "" : "line-clamp-2"}
                          >
                            {vacancy.description}
                          </Text>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="mt-2"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="h-4 w-4" />
                              Скрыть
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-4 w-4" />
                              Показать полностью
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          )}

          {user && project.invites && project.invites.length > 0 && (
            <section className="mt-10">
              <Heading level={3}>Заявки</Heading>
              <div className="mt-4 border p-4 rounded-lg">
                {project.invites.map((invite) => {
                  return (
                    <div className="flex items-center justify-between">
                      <div>
                        <Text>{invite.name}</Text>
                        {invite.role && (
                          <Text variant="muted">{invite.role}</Text>
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
