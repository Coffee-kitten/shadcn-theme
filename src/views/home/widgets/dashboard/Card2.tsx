import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { orderSavePost } from "@/api/v1/order";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { subscribeGet } from "@/api/v1/base";
export function Card2() {
  const { t } = useTranslation();
  const { data } = subscribeGet();
  const navigate = useNavigate();
  const formatGB = (bytes: number) => (bytes / 1024 ** 3).toFixed(2);
  const used = data?.data.data.u + data?.data.data.d;
  const total = data?.data.data.transfer_enable;
  const handleReset = async () => {
    const result = await orderSavePost(
      t,
      "reset_price",
      data?.data.data.plan.id
    );
    if (result?.data.data) {
      navigate(`/order/${result.data.data}`);
    }
  };
  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {t("流量")}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="secondary"
                disabled={data?.data.data.plan.reset_price == null}
              >
                <RotateCcw />
                {t("重置")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                    <RotateCcw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <AlertDialogTitle>
                    {t("确认重置本月已用流量？")}
                  </AlertDialogTitle>
                </div>
                <AlertDialogDescription>
                  {t(
                    "点击「确定」后将跳转至收银台。完成支付后，系统将自动为阁下重置本周期的流量，流量额度即刻恢复。"
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("取消")}</AlertDialogCancel>
                <AlertDialogAction onClick={handleReset}>
                  {t("继续")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardTitle>
        <CardDescription>
          <p>
            {formatGB(used)} GB Used / {formatGB(total)} GB Total
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 pb-8">
        <Progress
          value={
            ((data?.data.data.u + data?.data.data.d) /
              data?.data.data.transfer_enable) *
            100
          }
        />
      </CardContent>
      <CardFooter>
        {data?.data.data.plan.onetime_price ? (
          <p>Never</p>
        ) : data?.data.data.reset_day == 0 ? (
          <p>{t("已用流量已在今日重置")}</p>
        ) : (
          <p>
            {t("已用流量将在")} {data?.data.data.reset_day} {t("日后重置")}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
