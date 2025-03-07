import { Container } from "@/shared/ui/Container";
import { SevSULogo } from "@/shared/ui/SevSULogo";
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
              <h3 className="font-semibold mb-4">ЦИФРОВАЯ ЭКОСИСТЕМА</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Официальный сайт
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Дистанционное обучение
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Личный кабинет
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Расписание занятий
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Rocket Chat
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">СОЦСЕТИ</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    ВКонтакте
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Одноклассники
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    RuTube
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">КОНТАКТЫ</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="tel:+79781234567" className="hover:underline">
                    +7 (978) 123-45-67
                  </a>
                </li>
                <li>
                  <a href="mailto:info@sevsu.ru" className="hover:underline">
                    info@sevsu.ru
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">ПОМОЩЬ</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:underline">
                    Студенту
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Заказчику
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <p className="text-sm mt-20 text-center">
            Все права защищены © «Севастопольский государственный университет»,{" "}
            {new Date().getFullYear()}
          </p>
        </Container>
      </footer>
    </>
  );
}
