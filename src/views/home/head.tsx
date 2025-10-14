import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { subscribeGet } from "@/api/v1/base";
export function Head({ badge, IconComponent }: any) {
  const { data } = subscribeGet();
  const Icon = IconComponent || ShoppingBag;
  const { t } = useTranslation();

  return (
    <Card className="border-0 bg-gradient-to-l from-indigo-300">
      <CardHeader>
        <CardTitle>
          <Badge>{badge || ""} </Badge>
        </CardTitle>
        <CardDescription>
          {data?.data.data.plan?.name || t("未拥有订阅")}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button variant="outline" size="icon" className="rounded-full">
          <Icon />
        </Button>
      </CardFooter>
    </Card>
  );
}
