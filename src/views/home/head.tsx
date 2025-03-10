import { useEffect } from "react";
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
import { subscribeGet } from "@/api/dashboard";
import { useV2boardUserData } from "@/store/index";

export function Head({ badge, footer }: any) {
  const store = useV2boardUserData();
  useEffect(() => {
    const fetchData = async () => {
      store.setSubscribeData((await subscribeGet()).data);
    };

    fetchData();
  }, []);
  return (
    <Card className="border-0 bg-gradient-to-l from-indigo-300">
      <CardHeader>
        <CardTitle>
          <Badge>{badge || ""} </Badge>
        </CardTitle>
        <CardDescription>
          {store.subscribeData.data?.plan.name || "暂无订阅"}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button variant="secondary">
          <ShoppingBag /> {footer || "购买订阅"}
        </Button>
      </CardFooter>
    </Card>
  );
}
