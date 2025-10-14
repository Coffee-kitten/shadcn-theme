import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlanCard3 } from "@/views/home/widgets/plan/card3";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { subscribeGet } from "@/api/v1/base";
export function Card3() {
  const { t } = useTranslation();
  const { data } = subscribeGet();
  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {t("到期时间")}
          <PlanCard3 plan={data?.data.data.plan} renew={1} />
        </CardTitle>
        <CardDescription>{t("订阅流量用尽请进行重置")}</CardDescription>
      </CardHeader>
      <CardContent>
        {data?.data.data.plan.onetime_price ? (
          <p>{t("该订阅长期有效")}</p>
        ) : (
          <p>
            {dayjs
              .unix(data?.data.data.expired_at)
              .format("YYYY-MM-DD HH:mm:ss")}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {data?.data.data.plan.onetime_price ? (
          <p>Never</p>
        ) : (
          <p>
            {dayjs.unix(data?.data.data.expired_at).diff(dayjs(), "day")} days
            before expiration
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
