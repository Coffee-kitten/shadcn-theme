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
import { useV2boardUserData } from "@/store/index";

export function Head({ badge, footer, IconComponent }: any) {
  const store = useV2boardUserData();

  const Icon = IconComponent || ShoppingBag;

  return (
    <Card className="border-0 bg-gradient-to-l from-indigo-300">
      <CardHeader>
        <CardTitle>
          <Badge>{badge || ""} </Badge>
        </CardTitle>
        <CardDescription>
          {store.subscribeData.data?.plan?.name || "尚未拥有订阅"}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button variant="secondary">
          <Icon /> {footer || "购买订阅"}
        </Button>
      </CardFooter>
    </Card>
  );
}
