import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";
import { SevSULogo } from "@/shared/ui/SevSULogo";
import { Text } from "@/shared/ui/Text";

export function Footer() {
  return (
    <div className="bg-gradient-to-b from-[#1D71B8] to-[#1588E9]">
      <Container className="py-8">
        <SevSULogo width={273} height={78} color="white" />
        <Text className="text-center font-semibold text-white mt-6">
          Все права защищены © «Севастопольский госудаственный университет»,
          2025
        </Text>
      </Container>
    </div>
  );
}
