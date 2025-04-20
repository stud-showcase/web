import { Heading } from "@/shared/ui/Heading";
import { UserLayout } from "@/layouts/UserLayout";
import { Head, Link } from "@inertiajs/react";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/Accordion";
import { LeaveRequest } from "@/features/LeaveRequest";

export default function MainPage() {
  return (
    <>
      <Head>
        <title>Главная</title>
      </Head>
      <UserLayout>
        <div className="flex flex-col items-center font-myriad">
          <section className="px-6 py-16 bg-background text-center w-full">
            <Heading level={1} className="mb-4">
              Витрина студенческих проектов
            </Heading>
            <Text variant="lead" className="mb-6 max-w-2xl mx-auto">
              Платформа, обеспечивающая взаимодействие заказчиков, студентов и
              преподавателей в рамках образовательного процесса СевГУ.
            </Text>
            <LeaveRequest>
              <Button size="lg">Оставить заявку на проект</Button>
            </LeaveRequest>
          </section>

          <section className="px-6 py-16 w-full bg-muted/60">
            <Heading level={2} className="mb-6 text-center">
              Для кого
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Заказчики</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    Реализация проектов с привлечением студенческих команд под
                    руководством преподавателей.
                  </Text>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Студенты</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    Приобретение опыта выполнения реальных задач и развитие
                    профессиональных компетенций.
                  </Text>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Преподаватели</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    Координация проектной деятельности студентов и контроль
                    качества выполнения задач.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="px-6 py-16 w-full bg-background">
            <Heading level={2} className="mb-6 text-center">
              Как это работает
            </Heading>
            <Accordion type="single" collapsible className="max-w-2xl mx-auto">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Регистрация заявки</AccordionTrigger>
                <AccordionContent>
                  <Text variant="muted">
                    Оформление запроса на включение проекта в базу задач
                    платформы.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>2. Детализация требований</AccordionTrigger>
                <AccordionContent>
                  <Text variant="muted">
                    Указание целей, объёма работ и сроков выполнения.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>3. Назначение исполнителей</AccordionTrigger>
                <AccordionContent>
                  <Text variant="muted">
                    Формирование студенческой команды под руководством
                    преподавателя.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>4. Контроль выполнения</AccordionTrigger>
                <AccordionContent>
                  <Text variant="muted">
                    Мониторинг хода работы и получение промежуточных
                    результатов.
                  </Text>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>5. Итоговая сдача</AccordionTrigger>
                <AccordionContent>
                  <Text variant="muted">
                    Завершение проекта и предоставление готового решения
                    заказчику.
                  </Text>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <section className="px-6 py-16 w-full bg-muted/60">
            <Heading level={2} className="mb-6 text-center">
              Функции
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Банк задач</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    Размещение и администрирование проектных предложений.
                  </Text>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Организация проектов</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    Формирование групп студентов для выполнения заданий.
                  </Text>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Мониторинг</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    Отслеживание этапов выполнения и взаимодействия участников.
                  </Text>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Контроль качества</CardTitle>
                </CardHeader>
                <CardContent>
                  <Text variant="muted">
                    Обеспечение соответствия результатов требованиям заказчика.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="px-6 py-16 w-full bg-background text-center">
            <Heading level={2} className="mb-4">
              Изучите проекты
            </Heading>
            <Text variant="lead" className="mb-6 max-w-2xl mx-auto">
              Ознакомьтесь с текущими и завершенными проектами студентов, чтобы
              оценить их потенциал и найти подходящее решение для ваших задач.
            </Text>
            <Link href="/projects">
              <Button size="lg" variant="outline">
                Посмотреть проекты
              </Button>
            </Link>
          </section>
        </div>
      </UserLayout>
    </>
  );
}
