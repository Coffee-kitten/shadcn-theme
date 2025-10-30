import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { usePeriodMap } from "@/hooks/price";
import { useTranslation } from "react-i18next";
import { paymentDetailGet } from "@/api/v1/payment";
import dayjs from "dayjs";
export function CardInfo({ id }: any) {
  const { t } = useTranslation();
  const { data } = paymentDetailGet(id);
  const periodMap = usePeriodMap();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("订阅信息")}</CardTitle>
        <CardDescription>Subscription Info</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-2 items-center">
          <CardDescription className="w-32">{t("订阅名称：")}</CardDescription>
          <div className="text-sm">{data?.data.data.plan.name}</div>
        </div>
        <div className="flex gap-2 items-center">
          <CardDescription className="w-32">{t("类型/周期")}：</CardDescription>
          <div className="text-sm">
            {periodMap[data?.data.data.period as keyof typeof periodMap].long}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <CardDescription className="w-32">{t("订阅流量：")}</CardDescription>
          <div className="text-sm">
            {data?.data.data.plan.transfer_enable} GB
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export function CardOrder({ id }: any) {
  const { t } = useTranslation();
  const { data } = paymentDetailGet(id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("订单信息")}</CardTitle>
        <CardDescription>Order Info</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-2 items-center">
          <CardDescription className="w-32">{t("订单号：")}</CardDescription>
          <div className="text-sm">{data?.data.data.trade_no}</div>
        </div>
        {data?.data.data.callback_no && (
          <div className="flex gap-2 items-center">
            <CardDescription className="w-32">
              {t("回调单号：")}
            </CardDescription>
            <div className="text-sm">{data?.data.data.callback_no}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
