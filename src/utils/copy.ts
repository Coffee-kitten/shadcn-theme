import { toast } from "sonner";
export const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  toast.success("复制成功");
};
