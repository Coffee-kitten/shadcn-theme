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
export const Card2 = ({ fetchAllData }: { fetchAllData: () => Promise<void> }) => {
  const onClickReset = async () => {
    try {
      await resetSecurityGet();
      toast.success("重置成功");
      fetchAllData();
    } catch {
      toast.error("重置失败");
    }
  };
  return (
    <Card className="bg-muted/30">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between p-6">
        <div className="text-sm space-y-4">
          <p className="font-medium text-foreground/80">重置订阅信息</p>

          <p className="text-foreground/60">
            当你的订阅地址或账户发生泄漏被他人滥用时，可以在此重置订阅信息。避免带来不必要的损失。
          </p>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              重置
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>确定要重置订阅信息？</AlertDialogTitle>
              <AlertDialogDescription>
                如果您的订阅地址或信息发生泄露可以执行此操作。重置后您的 UUID
                及订阅将会变更，需要重新导入订阅。
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={onClickReset}>确认</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Card>
  );
};
