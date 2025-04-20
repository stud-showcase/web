import React, { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { Avatar, AvatarFallback } from "@/shared/ui/Avatar";
import { Users, FileIcon, Link as LinkIcon, UserPlus } from "lucide-react";
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
import { UserLayout } from "@/layouts/UserLayout";
import { Container } from "@/shared/ui/Container";
import { ComplexityBadge, TaskTag } from "@/entities/Task";
import { HiringBadge, StatusBadge } from "@/entities/Project";

const mockProject = {
  id: "proj1",
  title: "AI-Powered Task Manager",
  task: {
    id: "task1",
    title: "Develop AI Task Prioritization",
    tags: ["AI", "Productivity", "WebApp"],
    complexity: "Advanced",
  },
  mentor: {
    id: "user1",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  status: "In Progress",
  isRecruiting: true,
  annotation:
    "A smart task management system using AI to prioritize and organize tasks efficiently.",
  files: [
    { id: "file1", name: "requirements.pdf", url: "#" },
    { id: "file2", name: "mockups.fig", url: "#" },
  ],
  members: [
    {
      id: "user2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: "user3",
      name: "Bob Wilson",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
  ],
  vacancies: [
    {
      id: "vac1",
      title: "Frontend Developer",
      description: "React expertise required",
    },
    {
      id: "vac2",
      title: "AI Engineer",
      description: "Experience with ML models",
    },
  ],
  applications: [
    {
      id: "app1",
      user: { id: "user4", name: "Alice Brown" },
      status: "Pending",
    },
    { id: "app2", user: { id: "user5", name: "Tom Clark" }, status: "Pending" },
  ],
};

interface Project {
  id: string;
  title: string;
  task?: {
    id: string;
    title: string;
    tags: string[];
    complexity: string;
  };
  mentor?: {
    id: string;
    name: string;
    avatar: string;
  };
  status: string;
  isRecruiting: boolean;
  annotation?: string;
  files: { id: string; name: string; url: string }[];
  members: { id: string; name: string; avatar: string }[];
  vacancies: { id: string; title: string; description: string }[];
  applications: {
    id: string;
    user: { id: string; name: string };
    status: string;
  }[];
}

const ProjectPage: React.FC = () => {
  const [project, setProject] = useState<Project>(mockProject);
  const [isEditingAnnotation, setIsEditingAnnotation] = useState(false);
  const [newAnnotation, setNewAnnotation] = useState(project.annotation || "");
  const [newVacancy, setNewVacancy] = useState({ title: "", description: "" });

  const handleJoinProject = () => {
    alert("Join request sent!");
  };

  const toggleRecruitment = () => {
    setProject({ ...project, isRecruiting: !project.isRecruiting });
  };

  const handleAnnotationSave = () => {
    setProject({ ...project, annotation: newAnnotation });
    setIsEditingAnnotation(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newFile = {
        id: `file${project.files.length + 1}`,
        name: file.name,
        url: "#",
      };
      setProject({ ...project, files: [...project.files, newFile] });
    }
  };

  const handleFileDelete = (fileId: string) => {
    setProject({
      ...project,
      files: project.files.filter((f) => f.id !== fileId),
    });
  };

  const handleVacancyCreate = () => {
    if (newVacancy.title && newVacancy.description) {
      const vacancy = {
        id: `vac${project.vacancies.length + 1}`,
        ...newVacancy,
      };
      setProject({ ...project, vacancies: [...project.vacancies, vacancy] });
      setNewVacancy({ title: "", description: "" });
    }
  };

  const handleVacancyDelete = (vacancyId: string) => {
    setProject({
      ...project,
      vacancies: project.vacancies.filter((v) => v.id !== vacancyId),
    });
  };

  const handleApplicationAction = (
    applicationId: string,
    action: "accept" | "reject"
  ) => {
    setProject({
      ...project,
      applications: project.applications.map((app) =>
        app.id === applicationId
          ? { ...app, status: action === "accept" ? "Accepted" : "Rejected" }
          : app
      ),
    });
  };

  return (
    <>
      <Head>
        <title>Название проекта</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <main>
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
                    <Link href="/tasks/1">Название связанной задачи</Link>
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbPage>Название проекта</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <header className="border-b pb-6 mt-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Heading level={1}>{project.title}</Heading>
                <div className="flex gap-3">
                  {project.task && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/task/${project.task.id}`}>
                        <LinkIcon /> К задаче
                      </Link>
                    </Button>
                  )}
                  <Button onClick={handleJoinProject} size="sm">
                    <UserPlus />
                    Вступить
                  </Button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <ComplexityBadge complexity="medium" />
                <StatusBadge status="in_progress" />
                <HiringBadge />
                {project.task?.tags.map((tag) => (
                  <TaskTag value={tag} />
                ))}
              </div>
            </header>

            <section className="mt-8">
              <div className="flex gap-2 items-center">
                <Heading level={3}>Описание</Heading>
              </div>
              <Text className="mt-4">{project.annotation}</Text>
            </section>

            <section className="mt-10">
              <Heading level={3}>Файлы</Heading>
              {project.files.length > 0 && (
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
              )}
            </section>

            <section className="mt-10">
              <Heading level={3}>Участники</Heading>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 border p-4 rounded-lg">
                  <Avatar>
                    <AvatarFallback className="bg-muted">Н</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Text>Иванов Иван Иванович</Text>
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
                      <Text variant="muted">Front-end разработчик</Text>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10">
              <div className="flex gap-1 items-center">
                <Heading level={3}>Вакансии</Heading>
              </div>
              {project.vacancies.length > 0 && (
                <div className="mt-4 space-y-3">
                  {project.vacancies.map((vacancy) => (
                    <div
                      key={vacancy.id}
                      className="flex items-center justify-between  border p-4 rounded-lg"
                    >
                      <div>
                        <Text className="font-medium">{vacancy.title}</Text>
                        <Text variant="muted">{vacancy.description}</Text>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="mt-10">
              <Heading level={3}>Заявки</Heading>
              <div className="mt-4 border p-4 rounded-lg">
                <Text>Иван Иванов</Text>
                <Text variant="muted">Front-end разработчик</Text>
              </div>
            </section>
          </main>
        </Container>
      </UserLayout>
    </>
  );
};

export default ProjectPage;
