import { Button } from "@/shared/ui/Button";
import {
  FileIcon,
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
import {
  getMemberLabel,
  TaskComplexityBadge,
  TaskTagBadge,
} from "@/entities/Task";
import { SimpleProjectCard } from "./SimpleProjectCard";
import { useAuth } from "@/shared/hooks/useAuth";
import { ExtendedTask } from "../model/ExtendedTask";
import { CreateProjectModal } from "@/features/CreateProjectModal";

export default function TaskPage({ task }: { task: ExtendedTask }) {
  const { user } = useAuth();
  // const { toast } = useToast();

  // const copyToClipboard = (text: string) => {
  //   navigator.clipboard.writeText(text).then(() => {
  //     toast({
  //       title: "Скопировано!",
  //       description: `${text} теперь в буфере обмена.`,
  //       duration: 2000,
  //     });
  //   });
  // };

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
                {user && task.canTake && (
                  <CreateProjectModal task={task}>
                    <div className="flex flex-row w-full sm:w-auto gap-3">
                      <Button className="flex-1 sm:flex-none" size="sm">
                        <ClipboardCheck />
                        Взять задачу
                      </Button>
                    </div>
                  </CreateProjectModal>
                )}
              </div>
              {task.tags && task.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <TaskComplexityBadge complexity={task.complexity} />
                  {task.tags.map((tag) => (
                    <TaskTagBadge tag={tag} key={tag.id} />
                  ))}
                </div>
              )}
            </header>

            <section className="mt-8 ">
              <Heading level={3}>Описание задачи</Heading>
              <div className="mt-4 pl-6 border-l-4 border-primary">
                <Text variant="muted">{task.description}</Text>
                {task.files && task.files.length > 0 && (
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
              </div>
            </section>

            <section className="mt-10">
              <Heading level={3}>Информация о задаче</Heading>
              <div className="mt-4 flex flex-wrap gap-6">
                <div className="flex items-center gap-4 bg-white border p-4 rounded-lg flex-1 min-w-[200px]">
                  <CalendarIcon className="h-6 w-6" />
                  <div>
                    <Text variant="muted">Дедлайн</Text>
                    <Text>{task.deadline}</Text>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white border p-4 rounded-lg flex-1 min-w-[200px]">
                  <UsersIcon className="h-6 w-6" />
                  <div>
                    <Text variant="muted">Команда</Text>
                    <Text>
                      Максимально {task.maxMembers}{" "}
                      {getMemberLabel(task.maxMembers)}
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

            {/* TODO: перенести на страницу проекта */}
            {/* {((user && task.customerEmail) || task.customerPhone) && (
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
            )} */}

            {task.projects?.length > 0 && (
              <section className="mt-10">
                <Heading level={3}>Проекты</Heading>
                <ul className="space-y-3 mt-4">
                  {task.projects.map((project) => (
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
