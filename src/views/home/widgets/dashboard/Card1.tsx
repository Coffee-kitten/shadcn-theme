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
import { Map } from "lucide-react";
export function Card1() {
  return (
    <Card className="border-0 bg-gradient-to-l from-indigo-300">
      <CardHeader>
        <CardTitle>
          <Badge>仪表盘</Badge>
        </CardTitle>
        <CardDescription>账户使用情况和快捷订阅</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
        <Button variant="secondary">
          <Map /> 使用教程
        </Button>
      </CardFooter>
    </Card>
  );
}
