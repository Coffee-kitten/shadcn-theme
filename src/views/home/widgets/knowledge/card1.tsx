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
export function Card1() {
  const store = useV2boardUserData();
  return (
    <Card className="border-0 bg-gradient-to-l from-indigo-300">
      <CardHeader>
        <CardTitle>
          <Badge>使用教程</Badge>
        </CardTitle>
        <CardDescription>
          {store?.subscribeData?.data?.plan?.name}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button variant="secondary">
          <ShoppingBag /> 购买订阅
        </Button>
      </CardFooter>
    </Card>
  );
}
