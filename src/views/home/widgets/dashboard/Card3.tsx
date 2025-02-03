import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useV2boardUserData } from "@/store/index";

import { useTranslation } from "react-i18next";
import { Workflow } from "lucide-react";
import dayjs from "dayjs";
export function Card3() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  return (
    <Card className="bg-muted/50 border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          到期时间
          <Button
            variant="secondary"
            disabled={store.subscribeData.data.plan.onetime_price}
          >
            续费
          </Button>
        </CardTitle>
        <CardDescription>订阅流量用尽请进行重置</CardDescription>
      </CardHeader>
      <CardContent>
        {store.subscribeData.data.plan.onetime_price ? (
          <p>该订阅长期有效</p>
        ) : (
          <p>
            {dayjs(store.subscribeData.data.expired_at * 1000).format(
              "YYYY-MM-DD HH:mm:ss"
            )}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {store.subscribeData.data.plan.onetime_price ? (
          <p>Never</p>
        ) : (
          <p>
            {dayjs(store.subscribeData.data.expired_at * 1000).diff(
              dayjs(),
              "day"
            )}{" "}
            days before expiration
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
