import { UserLayout } from "@/layouts/UserLayout";
import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/Breadcrumb";
import { Head, Link } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { Textarea } from "@/shared/ui/Textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/DropdownMenu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/AlertDialog";
import {
  Check,
  Delete,
  Edit,
  Edit2,
  EllipsisVertical,
  File,
  Plus,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import React, { PropsWithChildren } from "react";
import { Switch } from "@/shared/ui/Switch";
import { Text } from "@/shared/ui/Text";
import { ConfirmationDialog } from "@/shared/ui/ConfirmationDialog";
import { Label } from "@/shared/ui/Label";
import { Checkbox } from "@/shared/ui/Checkbox";

const mockProject = {
  id: 1,
  name: "Инновационный стартап",
  description: "Разработка платформы для автоматизации бизнес-процессов",
  isRecruiting: true,
};

const mockTeamMembers = [
  { id: 1, name: "Иван Иванов", role: "leader" },
  { id: 2, name: "Мария Петрова", role: "member" },
  { id: 3, name: "Алексей Сидоров", role: "member" },
];

const mockVacancies = [
  {
    id: 1,
    title: "Frontend разработчик",
    description: "Разработка пользовательского интерфейса на React",
  },
  {
    id: 2,
    title: "Backend разработчик",
    description: "Разработка серверной части на Node.js",
  },
];

const mockApplications = [
  {
    id: 1,
    user: { id: 4, name: "Елена Смирнова" },
    vacancy: { id: 1, title: "Frontend разработчик" },
    status: "pending",
  },
  {
    id: 2,
    user: { id: 5, name: "Дмитрий Козлов" },
    vacancy: null,
    status: "pending",
  },
  {
    id: 3,
    user: { id: 6, name: "Анна Васильева" },
    kinci: { id: 1, title: "Frontend разработчик" },
    status: "accepted",
  },
];

const mockFiles = [
  {
    id: 1,
    name: "project_specification.pdf",
    url: "/files/project_specification.pdf",
  },
  { id: 2, name: "design_mockup.png", url: "/files/design_mockup.png" },
];

function ProjectNameSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Название проекта</CardTitle>
        <CardDescription>
          Является публичным именем вашего проекта
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          value={mockProject.name}
          placeholder="Введите название проекта..."
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button size="sm">Сохранить</Button>
      </CardFooter>
    </Card>
  );
}

function ProjectDescriptionSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Описание проекта</CardTitle>
        <CardDescription>
          Описание является публичной аннотацией к вашему проекту
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          value={mockProject.description}
          placeholder="Введите описание проекта..."
        />
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button size="sm">Сохранить</Button>
      </CardFooter>
    </Card>
  );
}

function RecruitmentSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Набор в проектную команду</CardTitle>
        <CardDescription>
          {mockProject.isRecruiting
            ? "Новые участники могут подавать заявки"
            : "Набор закрыт — заявки не принимаются"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Switch />
          <Text variant="muted">
            {mockProject.isRecruiting ? "Набор открыт" : "Набор закрыт"}
          </Text>
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button size="sm">Сохранить</Button>
      </CardFooter>
    </Card>
  );
}

function FilesSection() {
  function FileUploadDialog({ children }: PropsWithChildren) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Загрузка файла</DialogTitle>
            <DialogDescription>
              Выберите файл для загрузки в проект.
            </DialogDescription>
          </DialogHeader>
          <Input type="file" />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button>Загрузить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Файлы проекта</CardTitle>
          <CardDescription>
            Публично доступные файлы, относящиеся к вашему проекту
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUploadDialog>
            <Button size="sm">
              <Plus />
              Добавить файл
            </Button>
          </FileUploadDialog>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Имя файла</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>
                    <ConfirmationDialog
                      title="Подтверждение удаления файла"
                      description="Вы уверены, что хотите удалить этот файл? Это действие нельзя отменить."
                    >
                      <Button variant="outline" size="icon">
                        <Trash2 />
                      </Button>
                    </ConfirmationDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

function TeamMembersSection() {
  function EditMemberDialog({ children }: PropsWithChildren) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Изменение позиции</DialogTitle>
            <DialogDescription>
              Введите новую позицию для участника.
            </DialogDescription>
          </DialogHeader>
          <Input placeholder="Новая позиция" />
          <div className="flex items-center gap-2">
            <Checkbox id="team_leader" defaultChecked />
            <Label htmlFor="team_leader">
              Дать права руководителя команды.
            </Label>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Проектная команда</CardTitle>
          <CardDescription>
            Управление участниками проектной команды
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Имя</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTeamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.name}</TableCell>
                  <TableCell>
                    {member.role === "leader" ? "Руководитель" : "Участник"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <EditMemberDialog>
                        <Button size="icon" variant="outline">
                          <Edit />
                        </Button>
                      </EditMemberDialog>
                      <ConfirmationDialog
                        title="Подтверждение удаления участника команды"
                        description="Вы уверены, что хотите исключить участника проектной команды? Это действие нельзя отменить."
                      >
                        <Button size="icon" variant="outline">
                          <Trash2 />
                        </Button>
                      </ConfirmationDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

function VacanciesSection() {
  function CreateVacancyDialog({ children }: PropsWithChildren) {
    return (
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создание вакансии</DialogTitle>
            <DialogDescription>
              Введите данные для новой вакансии.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input placeholder="Название вакансии" />
            <Textarea placeholder="Описание вакансии" />
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button>Создать</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  function EditVacancyDialog({ children }: PropsWithChildren) {
    return (
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактирование вакансии</DialogTitle>
            <DialogDescription>Измените данные вакансии.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Input placeholder="Название вакансии" />
            <Textarea placeholder="Описание вакансии" />
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Отмена</Button>
            </DialogClose>
            <Button>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Вакансии</CardTitle>
          <CardDescription>Создание и управление вакансиями</CardDescription>
        </CardHeader>
        <CardContent>
          <CreateVacancyDialog>
            <Button size="sm">
              <Plus />
              Добавить вакансию
            </Button>
          </CreateVacancyDialog>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockVacancies.map((vacancy) => (
                <TableRow key={vacancy.id}>
                  <TableCell>{vacancy.title}</TableCell>
                  <TableCell>{vacancy.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <EditVacancyDialog>
                        <Button size="icon" variant="outline">
                          <Edit />
                        </Button>
                      </EditVacancyDialog>
                      <ConfirmationDialog
                        title="Подтверждение удаления вакансии"
                        description="Вы уверены, что хотите удалить вакансию? Это действие нельзя отменить."
                      >
                        <Button size="icon" variant="outline">
                          <Trash2 />
                        </Button>
                      </ConfirmationDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

function ApplicationsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Заявки на вступление</CardTitle>
        <CardDescription>
          Управление заявками на вступление в проектную команду
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Пользователь</TableHead>
              <TableHead>Вакансия</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell>{application.user.name}</TableCell>
                <TableCell>{application.vacancy?.title || "—"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <ConfirmationDialog
                      title="Подтверждения принятия заявки"
                      description="Вы уверены, что хотите принять нового участника в проектную команду? Вы сможете исключить его только в период командообразования."
                    >
                      <Button size="icon" variant="outline">
                        <Check />
                      </Button>
                    </ConfirmationDialog>
                    <ConfirmationDialog
                      title="Подтверждение отклонения заявки"
                      description="Вы уверены, что хотите отклонить заявку? Это действие нельзя отменить."
                    >
                      <Button size="icon" variant="outline">
                        <X />
                      </Button>
                    </ConfirmationDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function ProjectControlPanel() {
  return (
    <>
      <Head>
        <title>Панель управления</title>
      </Head>
      <UserLayout>
        <Container withVerticalPaddings>
          <header>
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
                    <Link href={`/projects/${mockProject.id}`}>
                      {mockProject.name}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Панель управления</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Heading level={1} className="mt-6">
              Панель управления
            </Heading>
          </header>

          <div className="mt-8 flex flex-col gap-6">
            <ProjectNameSection />
            <ProjectDescriptionSection />
            <RecruitmentSection />
            <FilesSection />
            <TeamMembersSection />
            <VacanciesSection />
            <ApplicationsSection />
          </div>
        </Container>
      </UserLayout>
    </>
  );
}
