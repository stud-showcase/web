import React, { useState } from "react";
import { Text } from "@/shared/ui/Text";
import { Button } from "@/shared/ui/Button";
import { cn } from "@/shared/lib/utils";
import { Upload } from "lucide-react";

type FileUploadProps = {
  id?: string;
  files: File[];
  onFilesChange: (files: File[]) => void;
};

export function FileUpload({ id, files, onFilesChange }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesChange(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files) {
      onFilesChange(Array.from(e.dataTransfer.files));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div
      className={cn(
        "border-2 border-input border-dashed rounded-lg p-8 text-center transition-colors bg-background",
        {
          "border-primary bg-muted/20": isDragging,
        }
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
        id={id}
      />
      <div className="space-y-2">
        <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
        <Text variant="muted">
          {files.length > 0
            ? `${files.length} файл(ов) выбрано`
            : "Перетащите файлы сюда или"}
        </Text>
        <Button variant="outline" asChild className="mt-2">
          <label htmlFor="files" className="cursor-pointer">
            Выбрать файлы
          </label>
        </Button>
      </div>
    </div>
  );
}
