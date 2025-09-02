import { FileInput } from "lucide-react";
import { useTranslation } from "react-i18next";
export function Select() {
  const { t } = useTranslation();
  return (
    <div className="grid size-full">
      <div className="flex flex-col gap-1 items-center m-auto text-muted-foreground">
        <FileInput />
        <div className="text-sm">{t("选择一个文档以开始")}</div>
      </div>
    </div>
  );
}
