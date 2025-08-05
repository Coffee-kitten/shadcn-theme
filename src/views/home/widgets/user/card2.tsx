import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export const Card2 = () => {
  return (
    <Card className="bg-muted/30">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between p-6">
        <div className="text-sm space-y-4">
          <p className="font-medium text-foreground/80">重置订阅信息</p>

          <p className="text-foreground/60">
            当你的订阅地址或账户发生泄漏被他人滥用时，可以在此重置订阅信息。避免带来不必要的损失。
          </p>
        </div>
        <Button variant="destructive" size="sm">
          重置
        </Button>
      </div>
    </Card>
  );
};
