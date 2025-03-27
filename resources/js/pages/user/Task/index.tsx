import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import {
  FileIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  UsersIcon,
  Files,
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
import { mockTask, mockTaskProjects } from "./mock";
import { ComplexityBadge } from "@/features/ComplexityBadge";
import { useToast } from "@/shared/hooks/useToast";
import { SimplifiedProjectCard } from "./ui/SimplifiedProjectCard";
import { TaskSidebar } from "./ui/TaskSidebar";

export default function TaskPage() {
  const formattedDeadline = mockTask.deadline.toLocaleDateString("ru-RU", {
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

  const handleTakeTask = () => {
    toast({
      title: "Задача взята!",
      description: "Вы успешно взяли задачу.",
      duration: 2000,
    });
  };

  return (
    <>
      <Head>
        <title>{mockTask.title}</title>
      </Head>
      <UserLayout>
        <Container className="pt-8 flex flex-col lg:flex-row gap-8">
          {/* Боковое меню */}
          <TaskSidebar
            task={mockTask}
            taskProjects={mockTaskProjects}
            onTakeTask={handleTakeTask}
          />

          {/* Основной контент */}
          <main className="lg:w-4/5 w-full">
            <header id="header" className="border-b pb-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/tasks">Банк задач</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{mockTask.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="mt-6 flex flex-col sm:flex-row justify-between sm:items-center items-start gap-6">
                <Heading level={1}>{mockTask.title}</Heading>
                <ComplexityBadge complexity={mockTask.complexity} />
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {mockTask.tags.map((tag) => (
                  <Badge key={tag} variant={"outline"}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <section
              id="description"
              className="mt-8 pl-6 border-l-4 border-primary"
            >
              <Text>{mockTask.description}</Text>
              {mockTask.files && (
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <Files className="h-5 w-5" />
                    <Text variant="small">Файлы к описанию</Text>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-4">
                    {mockTask.files?.map((file) => (
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
              )}
            </section>

            <section id="info" className="mt-10">
              <Heading level={2}>Информация о задаче</Heading>
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
                      До {mockTask.max_members}{" "}
                      {mockTask.max_members === 1 ? "участника" : "участников"}
                    </Text>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white border p-4 rounded-lg flex-1 min-w-[200px]">
                  <UserIcon className="h-6 w-6" />
                  <div>
                    <Text variant="muted">Заказчик</Text>
                    <Text>{mockTask.customer.name}</Text>
                  </div>
                </div>
              </div>
            </section>

            {(mockTask.customer.email || mockTask.customer.phone) && (
              <section id="contacts" className="mt-10">
                <Heading level={2} className="mb-4">
                  Контакты заказчика
                </Heading>
                <div className="flex flex-col sm:flex-row gap-4">
                  {mockTask.customer.email && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-3 w-full sm:w-auto"
                      onClick={() => copyToClipboard(mockTask.customer.email!)}
                    >
                      <MailIcon className="h-5 w-5" />
                      <span>{mockTask.customer.email}</span>
                    </Button>
                  )}
                  {mockTask.customer.phone && (
                    <Button
                      variant="outline"
                      className="flex items-center gap-3 w-full sm:w-auto"
                      onClick={() => copyToClipboard(mockTask.customer.phone!)}
                    >
                      <PhoneIcon className="h-5 w-5" />
                      <span>{mockTask.customer.phone}</span>
                    </Button>
                  )}
                </div>
              </section>
            )}

            {mockTaskProjects?.length > 0 && (
              <section id="projects" className="mt-10">
                <Heading level={2}>Проекты</Heading>
                <ul className="space-y-3 mt-6">
                  {mockTaskProjects.map((project) => (
                    <li key={project.id}>
                      <SimplifiedProjectCard project={project} />
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
