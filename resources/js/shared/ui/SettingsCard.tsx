import { Heading } from "./Heading";
import { Text } from "./Text";
import { ReactNode } from "react";

export function SettingsCard({
  heading,
  text,
  buttonsSlot,
}: {
  heading: string;
  text: string;
  buttonsSlot: ReactNode;
}) {
  return (
    <div className="bg-background shadow-sm py-4 px-5 gap-6 rounded-lg border flex items-center justify-between">
      <div className="space-y-2 text-balance">
        <Heading level={5}>{heading}</Heading>
        <Text variant="muted">{text}</Text>
      </div>
      {buttonsSlot}
    </div>
  );
}
