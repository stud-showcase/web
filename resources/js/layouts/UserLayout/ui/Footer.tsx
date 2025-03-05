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
      <div className="content bg-[#095da4] min-h-96">
        <Container className="py-12 px-6">
          <SevSULogo width={273} height={78} color="white" />
          <div className="text-center font-semibold text-white mt-6">
            Все права защищены © «Севастопольский государственный университет»,
            2025
          </div>
        </Container>
      </div>
    </>
  );
}
