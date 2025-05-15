import { Heading } from "@/shared/ui/Heading";
import { Text } from "@/shared/ui/Text";
import { FileIcon, Files } from "lucide-react";
import { Button } from "@/shared/ui/Button";

export function DescriptionSection({
  description,
  files,
}: {
  description: string;
  files: { name: string; url: string }[];
}) {
  return (
    <section className="mt-8">
      <Heading level={3}>Описание задачи</Heading>
      <div className="mt-4 pl-6 border-l-4 border-primary">
        <Text variant="muted">{description}</Text>

        {files.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2">
              <Files className="h-5 w-5" />
              <Text variant="small">Файлы к описанию</Text>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {files.map((file) => (
                <Button key={file.name} variant="outline" size="sm" asChild>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <FileIcon className="h-4 w-4" />
                    {file.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
