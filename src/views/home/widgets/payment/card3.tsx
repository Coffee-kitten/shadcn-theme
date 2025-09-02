import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { useV2boardUserData } from "@/store/index";
import { OrderperiodMap } from "@/hooks/price";
import { useTranslation } from "react-i18next";

export function Card3() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("订阅信息")}</CardTitle>
        <CardDescription>Enter your payment details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex gap-2 items-center">
          <CardDescription className="w-32">{t("产品名称：")}</CardDescription>
          <div className="text-sm">
            {store.paymentDetailData.data.plan.name}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <CardDescription className="w-32">{t("类型/周期")}：</CardDescription>
          <div className="text-sm">
            {OrderperiodMap[store.paymentDetailData.data.period]}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <CardDescription className="w-32">{t("产品流量：")}</CardDescription>
          <div className="text-sm">
            {store.paymentDetailData.data.plan.transfer_enable} GiB
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
