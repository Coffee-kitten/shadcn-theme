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
import { useV2boardUserData } from "@/store/index";
import { orderSavePost } from "@/utils/common-imports";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "@/hooks/use-fetch-data";
export function Card2() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  const navigate = useNavigate();
  const fetchData = useFetchData();
  const handleReset = async () => {
    const result = await fetchData(() =>
      orderSavePost("reset_price", store.subscribeData.data.plan.id)
    );
    if (result?.data) {
      navigate(`/order/${result.data}`);
    }
  };
  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {t("流量")}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="secondary">{t("重置")}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {t("确认重置本月已用流量？")}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {t(
                    "点击「确定」后将跳转至收银台。完成支付后，系统将自动为阁下重置本月的流量使用记录，流量额度即刻恢复。"
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
          {store.subscribeData.data.plan.onetime_price ? (
            <p>Never</p>
          ) : (
            <p>
              {t("已用流量将在")} {store.subscribeData.data.reset_day}{" "}
              {t("日后重置")}
            </p>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress
          value={
            ((store.subscribeData.data.u + store.subscribeData.data.d) /
              store.subscribeData.data.transfer_enable) *
            100
          }
        />
      </CardContent>
      <CardFooter>
        <p>
          {(
            (store.subscribeData.data.u + store.subscribeData.data.d) /
            Math.pow(1024, 3)
          ).toFixed(2)}{" "}
          GB Used /{" "}
          {(
            store.subscribeData.data.transfer_enable / Math.pow(1024, 3)
          ).toFixed(2)}{" "}
          GB Total
        </p>
      </CardFooter>
    </Card>
  );
}
