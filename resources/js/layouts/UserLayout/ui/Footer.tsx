import { Container } from "@/shared/ui/Container";
import { SevSULogo } from "@/shared/ui/SevSULogo";
import { Text } from "@/shared/ui/Text";
import "./footer.css";

export function Footer() {
  return (
    <>
      <svg
        className="wave w-full h-44"
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
        <Container className="py-12 px-6">
          <SevSULogo width={273} height={78} color="white" />
          <div className="flex justify-between mt-10">
            <div>
              <Text variant="large">ЦИФРОВАЯ ЭКОСИСТЕМА</Text>
              <ul className="space-y-2 text-sm mt-4">
                <li>
                  <a
                    target="_blank"
                    href="https://sevsu.ru"
                    className="hover:underline"
                  >
                    Официальный сайт
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://do.sevsu.ru"
                    className="hover:underline"
                  >
                    Дистанционное обучение
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://lk.sevsu.ru"
                    className="hover:underline"
                  >
                    Личный кабинет
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://timetable.sevsu.ru"
                    className="hover:underline"
                  >
                    Расписание занятий
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://chat.is.sevsu.ru"
                    className="hover:underline"
                  >
                    Rocket Chat
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://iot.sevsu.ru"
                    className="hover:underline"
                  >
                    ИОТ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <Text variant="large">СОЦСЕТИ</Text>
              <ul className="space-y-2 text-sm mt-4">
                <li>
                  <a
                    target="_blank"
                    href="https://vk.com/sevsu"
                    className="hover:underline"
                  >
                    ВКонтакте
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://t.me/sevsu_live"
                    className="hover:underline"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://ok.ru/sevsu"
                    className="hover:underline"
                  >
                    Одноклассники
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.youtube.com/channel/UC1rFaFbJ4pDQgnrolyDfq0g"
                    className="hover:underline"
                  >
                    YouTube
                  </a>
                </li>
                <li>
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

            <div>
              <Text variant="large">КОНТАКТЫ</Text>
              <ul className="space-y-2 text-sm mt-4">
                <li>
                  <a
                    target="_blank"
                    href="tel:+79781234567"
                    className="hover:underline"
                  >
                    +7 (978) 123-45-67
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="mailto:info@sevsu.ru"
                    className="hover:underline"
                  >
                    info@sevsu.ru
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <Text variant="large">ПОМОЩЬ</Text>
              <ul className="space-y-2 text-sm mt-4">
                <li>
                  <a target="_blank" href="#" className="hover:underline">
                    Студенту
                  </a>
                </li>
                <li>
                  <a target="_blank" href="#" className="hover:underline">
                    Заказчику
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="mt-20 text-center text-sm">
            Все права защищены © «Севастопольский государственный университет»,{" "}
            {new Date().getFullYear()}
          </p>
        </Container>
      </footer>
    </>
  );
}
