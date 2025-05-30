import { Container } from "@/shared/ui/Container";
import { SevSULogo } from "@/shared/ui/SevSULogo";
import { Text } from "@/shared/ui/Text";
import "./footer.css";

export function Footer() {
  return (
    <>
      <svg
        className="wave w-full h-[50px] lg:h-[80px]"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="waves">
          <use xlinkHref="#gentle-wave" x="50" y="0" fill="#3B8FDA" />
          <use xlinkHref="#gentle-wave" x="50" y="3" fill="#1D71B8" />
          <use xlinkHref="#gentle-wave" x="50" y="6" fill="#095DA4" />
        </g>
      </svg>

      <footer className="bg-[#095da4] text-white">
        <Container className="py-12 px-4">
          <SevSULogo width={200} height={60} color="white" />
          <div className="flex flex-col md:flex-row justify-between mt-6 space-y-6 md:space-y-0 md:space-x-8 text-sm">
            <div>
              <Text className="font-semibold">КАРТА САЙТА</Text>
              <ul className="mt-2 space-y-2">
                <li className="text-xs">
                  <a href="/" className="hover:underline">
                    Главная
                  </a>
                </li>
                <li className="text-xs">
                  <a href="/projects" className="hover:underline">
                    Проекты
                  </a>
                </li>
                <li className="text-xs">
                  <a href="/tasks" className="hover:underline">
                    Банк задач
                  </a>
                </li>
                <li className="text-xs">
                  <a href="/vacancies" className="hover:underline">
                    Вакансии
                  </a>
                </li>
                <li className="text-xs">
                  <a href="/application" className="hover:underline">
                    Заявка
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <Text className="font-semibold">ЦИФРОВАЯ ЭКОСИСТЕМА</Text>
              <ul className="mt-2 space-y-2">
                <li className="text-xs">
                  <a
                    target="_blank"
                    href="https://sevsu.ru"
                    className="hover:underline"
                  >
                    Официальный сайт
                  </a>
                </li>
                <li className="text-xs">
                  <a
                    target="_blank"
                    href="https://do.sevsu.ru"
                    className="hover:underline"
                  >
                    Дистанционное обучение
                  </a>
                </li>
                <li className="text-xs">
                  <a
                    target="_blank"
                    href="https://lk.sevsu.ru"
                    className="hover:underline"
                  >
                    Личный кабинет
                  </a>
                </li>
                <li className="text-xs">
                  <a
                    target="_blank"
                    href="https://timetable.sevsu.ru"
                    className="hover:underline"
                  >
                    Расписание занятий
                  </a>
                </li>
                <li className="text-xs">
                  <a
                    target="_blank"
                    href="https://chat.is.sevsu.ru"
                    className="hover:underline"
                  >
                    Rocket Chat
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <Text className="font-semibold">СОЦСЕТИ</Text>
              <ul className="mt-2 space-y-2">
                <li className="text-xs">
                  <a
                    target="_blank"
                    href="https://vk.com/sevsu"
                    className="hover:underline"
                  >
                    ВКонтакте
                  </a>
                </li>
                <li className="text-xs">
                  <a
                    target="_blank"
                    href="https://t.me/sevsu_live"
                    className="hover:underline"
                  >
                    Telegram
                  </a>
                </li>
                <li className="text-xs">
                  <a
                    target="_blank"
                    href="https://ok.ru/sevsu"
                    className="hover:underline"
                  >
                    Одноклассники
                  </a>
                </li>
                <li className="text-xs">
                  <a
                    target="_blank"
                    href="https://www.youtube.com/channel/UC1rFaFbJ4pDQgnrolyDfq0g"
                    className="hover:underline"
                  >
                    YouTube
                  </a>
                </li>
                <li className="text-xs">
                  <a
                    target="_blank"
                    href="https://rutube.ru/channel/25013780/"
                    className="hover:underline"
                  >
                    RuTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-10 text-center text-xs">
            Все права защищены © «Севастопольский государственный университет»,{" "}
            {new Date().getFullYear()}
          </p>
        </Container>
      </footer>
    </>
  );
}
