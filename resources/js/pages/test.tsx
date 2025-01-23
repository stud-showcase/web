import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

export default function Test() {
  return (
    <>
      <Head>
        <title>Тестовая страница</title>
      </Head>
      <div className="m-8 flex flex-row gap-8">
        <div>
          <h1 className="text-3xl">Логотип:</h1>
          <img
            src="/logos/sevsu-main.svg"
            alt="Проверка логотипа"
            className="mt-2"
          />

          <div className="mt-8">
            <h1 className="text-3xl">Шрифты:</h1>
            <h1 className="text-2xl mt-2 font-myriad font-light">
              Проверка шрифтов Myriad Pro
            </h1>
            <h2 className="text-2xl mt-2 font-myriad font-normal">
              Проверка шрифтов Myriad Pro
            </h2>
            <h3 className="text-2xl mt-2 font-myriad font-semibold">
              Проверка шрифтов Myriad Pro
            </h3>
            <h4 className="text-2xl mt-2 font-myriad font-bold">
              Проверка шрифтов Myriad Pro
            </h4>

            <h1 className="text-2xl mt-8 font-minion font-normal">
              Проверка шрифтов Minion Pro
            </h1>
            <h2 className="text-2xl mt-2 font-minion font-medium">
              Проверка шрифтов Minion Pro
            </h2>
            <h3 className="text-2xl mt-2 font-minion font-semibold">
              Проверка шрифтов Minion Pro
            </h3>
            <h4 className="text-2xl mt-2 font-minion font-bold">
              Проверка шрифтов Minion Pro
            </h4>
          </div>

          <div className="mt-8">
            <h1 className="text-3xl">Shadcn/UI:</h1>
            <Button variant="outline" className="mt-2">
              Проверка Shadcn/UI
            </Button>
          </div>
        </div>

        <div>
          <h1 className="text-3xl">Цвета:</h1>
          <div className="flex flex-row gap-4">
            <div className="w-40 h-40 bg-sevsu-primary-blue mt-2"></div>
            <div className="w-40 h-40 bg-sevsu-secondary-blue mt-2"></div>
          </div>
        </div>
      </div>
    </>
  );
}
