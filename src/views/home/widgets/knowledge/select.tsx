import { FileInput } from "lucide-react";

export function Select() {
  return (
    <div className="grid size-full">
      <div className="flex flex-col gap-1 items-center m-auto text-muted-foreground">
        <FileInput />
        <div className="text-sm">选择一个文档以开始</div>
      </div>
    </div>
  );
}
