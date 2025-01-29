import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { useV2boardUserData } from "@/store/index";

import { useTranslation } from "react-i18next";
export function Card2() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  return (
    <Card className="bg-muted/50 border-0">
      <CardHeader>
        <CardTitle>{store.subscribeData.data.plan.name}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress
          value={
            ((store?.subscribeData.data.u + store.subscribeData.data.d) /
              store?.subscribeData.data.transfer_enable) *
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
          ).toFixed(2)} GB Total
        </p>
      </CardFooter>
    </Card>
  );
}
