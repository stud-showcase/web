import { ServerFile } from "@/shared/types/ServerFile";
import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";
import { FileIcon } from "lucide-react";

export function FilesSection({
  files,
}: {
  files: ServerFile[];
}) {
  if (files.length === 0) return;

  return (
    <section className="mt-10">
      <Heading level={3}>Дополнительные материалы</Heading>
      <div className="mt-4 flex flex-wrap gap-3">
        {files.map((file) => (
          <Button key={file.name} variant="outline" size="sm" asChild>
            <a
              href={`/download/${encodeURIComponent(file.path)}`}
              download
              className="flex items-center gap-2"
            >
              <FileIcon className="h-4 w-4" />
              {file.name}
            </a>
          </Button>
        ))}
      </div>
    </section>
  );
}
