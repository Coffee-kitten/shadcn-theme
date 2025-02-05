import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useV2boardUserData } from "@/store/index";

import { useTranslation } from "react-i18next";

export function Card2() {
  const { t } = useTranslation();
  const store = useV2boardUserData();

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          流量 <Button variant="secondary">重置</Button>
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
