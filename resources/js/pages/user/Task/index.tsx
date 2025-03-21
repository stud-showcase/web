import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import {
  FileIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  UsersIcon,
} from "lucide-react";
import { UserLayout } from "@/layouts/UserLayout";
import { TaskComplexity } from "@/shared/types/Task";
import { Text } from "@/shared/ui/Text";
import { Heading } from "@/shared/ui/Heading";
import { Container } from "@/shared/ui/Container";
import { Head, Link } from "@inertiajs/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/Breadcrumb";
import { mockTask } from "./mock";

export default function TaskPage() {
  const difficultyColors: Record<TaskComplexity, string> = {
    easy: "bg-success",
    medium: "bg-warning",
    hard: "bg-destructive",
  };

  const formattedDeadline = mockTask.deadline.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Head>
        <title>{mockTask.title}</title>
      </Head>
      <UserLayout>
        <Container className="pt-8 pb-12 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink>
                    <Link href="/task-bank">Банк задач</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Задача #1</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Button size={"sm"}>Взять задачу</Button>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-8">
            <div className="md:w-3/4 flex flex-col space-y-6 min-h-[600px]">
              <Card className="flex-shrink-0">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Heading level={2}>{mockTask.title}</Heading>
                    <Badge
                      className={`${
                        difficultyColors[mockTask.complexity]
                      } text-white`}
                    >
                      {mockTask.complexity === "easy"
                        ? "Легкая"
                        : mockTask.complexity === "medium"
                        ? "Средняя"
                        : "Сложная"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockTask.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="flex-1">
                <CardContent className="pt-6 space-y-2">
                  <Heading level={3}>Описание задачи</Heading>
                  <Text>{mockTask.description}</Text>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-1/4 flex flex-col space-y-6 min-h-[600px]">
              <Card className="flex-shrink-0">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Text variant="muted">Заказчик</Text>
                      <Text>{mockTask.customer.name}</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Text variant="muted">Дедлайн</Text>
                      <Text>{formattedDeadline}</Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <Text variant="muted">Макс. размер команды</Text>
                      <Text>
                        {mockTask.max_members}{" "}
                        {mockTask.max_members === 1 ? "участник" : "участника"}
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {(mockTask.customer.email || mockTask.customer.phone) && (
                <Card className="flex-shrink-1">
                  <CardContent className="pt-6 space-y-2">
                    <Heading level={4}>Контакты заказчика</Heading>
                    <div className="flex flex-col gap-2">
                      {mockTask.customer.email && (
                        <div className="flex items-center gap-2">
                          <MailIcon className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={`mailto:${mockTask.customer.email}`}
                            className="text-primary hover:underline"
                          >
                            {mockTask.customer.email}
                          </a>
                        </div>
                      )}
                      {mockTask.customer.phone && (
                        <div className="flex items-center gap-2">
                          <PhoneIcon className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={`tel:${mockTask.customer.phone}`}
                            className="text-primary hover:underline"
                          >
                            {mockTask.customer.phone}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {mockTask.files && (
                <Card className="flex-1">
                  <CardContent className="pt-6 space-y-2">
                    <Heading level={4}>Прикрепленные файлы</Heading>
                    <div className="flex flex-col gap-2">
                      {mockTask.files.map((file) => (
                        <Button
                          key={file.name}
                          variant="outline"
                          className="justify-start w-full"
                          asChild
                        >
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileIcon className="h-4 w-4 mr-2" />
                            {file.name}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </UserLayout>
    </>
  );
}
