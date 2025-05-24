import { ServerFile } from "@/shared/types/ServerFile";
import { Label } from "@/shared/ui/Label";
import { Text } from "@/shared/ui/Text";
import { Download } from "lucide-react";

export function ServerFiles({ serverFiles }: { serverFiles: ServerFile[] }) {
  return (
    <div className="space-y-2">
      <Label>Файлы заказчика</Label>
      <ul className="space-y-2">
        {serverFiles.map((file) => (
          <li
            key={file.id}
            className="flex items-center justify-between py-2 px-3 bg-muted/60 rounded-lg"
          >
            <Text variant="small">{file.name}</Text>
            <a href={`/download/${encodeURIComponent(file.path)}`} download title={`Скачать ${file.name}`}>
              <Download className="h-4 w-4" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
