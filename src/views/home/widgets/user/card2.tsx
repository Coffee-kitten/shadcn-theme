import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { resetSecurityGet } from "@/api/user";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { infoGet } from "@/api/v1/base";
export const Card2 = () => {
  const { t } = useTranslation();
  const { mutate } = infoGet();
  const onClickReset = async () => {
    try {
      await resetSecurityGet();
      mutate();
      toast.success(t("重置成功"));
    } catch {
      toast.error(t("重置失败"));
    }
  };
  return (
    <Card className="bg-muted/30">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between p-6">
        <div className="text-sm space-y-4">
          <p className="font-medium text-foreground/80">{t("重置订阅信息")}</p>

          <p className="text-foreground/60">
            {t(
              "如果订阅地址或账户被他人使用，您可以在此重置订阅信息，以防止损失。"
            )}
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              {t("重置")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t("确定要重置订阅信息？")}</AlertDialogTitle>
              <AlertDialogDescription>
                {t(
                  "如果您的订阅地址或信息发生泄露可以执行此操作。重置后您的 UUID 及订阅将会变更，需要重新导入订阅。"
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("取消")}</AlertDialogCancel>
              <AlertDialogAction onClick={onClickReset}>
                {t("确认")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
};
