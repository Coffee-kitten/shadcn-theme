import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function useClipboard() {
  const { t } = useTranslation();

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(t("复制成功"));
  };

  return { copyToClipboard };
}
