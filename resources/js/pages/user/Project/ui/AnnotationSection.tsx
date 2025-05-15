import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";

export function AnnotationSection({ annotation }: { annotation: string | null }) {
  if (!annotation) return;

  return (
    <section className="mt-8">
      <div className="flex gap-2 items-center">
        <Heading level={3}>Описание</Heading>
      </div>
      <Text className="mt-4" variant="muted">
        {annotation}
      </Text>
    </section>
  );
}
