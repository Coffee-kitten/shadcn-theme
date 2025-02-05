import { toast } from "@/components/ui/use-toast";
export const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
  toast({
    description: "复制成功",
  });
};
