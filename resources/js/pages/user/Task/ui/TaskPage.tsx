import { Button } from "@/shared/ui/Button";
import {
  FileIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  UsersIcon,
  Files,
  ClipboardCheck,
  Briefcase,
} from "lucide-react";
import { UserLayout } from "@/layouts/UserLayout";
import { Text } from "@/shared/ui/Text";
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
import { ComplexityBadge, Task } from "@/entities/Task";
import { useToast } from "@/shared/hooks/useToast";
import { Project } from "@/entities/Project";
import { SimpleProjectCard } from "./SimpleProjectCard";
import { TaskTag } from "@/entities/Task";
import { project, task } from "@/shared/mocks";
import { useAuth } from "@/shared/hooks/useAuth";

export default function TaskPage({}: { task: Task; projects: Project[] }) {
  const { user } = useAuth();
  const projects = Array(5).fill(project);

  const formattedDeadline = task.deadline.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Скопировано!",
        description: `${text} теперь в буфере обмена.`,
        duration: 2000,
      });
    });
  };

  return (
    <>
      <Head>
        <title>{task.title}</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <main>
            <header className="border-b pb-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/tasks">Банк задач</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{task.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="mt-6 flex flex-col sm:flex-row justify-between sm:items-center items-start gap-6">
                <Heading level={1}>{task.title}</Heading>
                {user?.role === "student" && (
                  <div className="flex flex-row w-full sm:w-auto gap-3">
                    <Button className="flex-1 sm:flex-none">
                      <ClipboardCheck />
                      Взять задачу
                    </Button>
                  </div>
                )}
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <ComplexityBadge complexity={task.complexity} />
                {task.tags.map((tag) => (
                  <TaskTag value={tag} />
                ))}
              </div>
            </header>

            <section className="mt-8 pl-6 border-l-4 border-primary">
              <Text variant="muted">{task.description}</Text>
              {task.files && (
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <Files className="h-5 w-5" />
                    <Text variant="small">Файлы к описанию</Text>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-wrap gap-3">
                      {task.files?.map((file) => (
                        <Button
                          key={file.name}
                          variant="outline"
                          size="sm"
                          asChild
                        >
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
                  </div>
                </div>
              )}
            </section>

            <section className="mt-10">
              <Heading level={3}>Информация о задаче</Heading>
              <div className="mt-4 flex flex-wrap gap-6">
                <div className="flex items-center gap-4 bg-white border p-4 rounded-lg flex-1 min-w-[200px]">
                  <CalendarIcon className="h-6 w-6" />
                  <div>
                    <Text variant="muted">Дедлайн</Text>
                    <Text>{formattedDeadline}</Text>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white border p-4 rounded-lg flex-1 min-w-[200px]">
                  <UsersIcon className="h-6 w-6" />
                  <div>
                    <Text variant="muted">Команда</Text>
                    <Text>
                      До {task.maxMembers}{" "}
                      {task.maxMembers === 1 ? "участника" : "участников"}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white border p-4 rounded-lg flex-1 min-w-[200px]">
                  <Briefcase className="h-6 w-6" />
                  <div>
                    <Text variant="muted">Заказчик</Text>
                    <Text>{task.customer}</Text>
                  </div>
                </div>
              </div>
            </section>

            {((user && task.customerEmail) || task.customerPhone) && (
              <section className="mt-10">
                <Heading level={3} className="mb-4">
                  Контакты заказчика
                </Heading>
                <div className="flex flex-col sm:flex-row gap-4">
                  {task.customerEmail && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-3 w-full sm:w-auto"
                      onClick={() => copyToClipboard(task.customerEmail!)}
                    >
                      <MailIcon className="h-5 w-5" />
                      <span>{task.customerEmail}</span>
                    </Button>
                  )}
                  {task.customerPhone && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-3 w-full sm:w-auto"
                      onClick={() => copyToClipboard(task.customerPhone!)}
                    >
                      <PhoneIcon className="h-5 w-5" />
                      <span>{task.customerPhone}</span>
                    </Button>
                  )}
                </div>
              </section>
            )}

            {projects?.length > 0 && (
              <section className="mt-10">
                <Heading level={3}>Проекты</Heading>
                <ul className="space-y-3 mt-6">
                  {projects.map((project) => (
                    <li key={project.id}>
                      <SimpleProjectCard project={project} />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </Container>
      </UserLayout>
    </>
  );
}
