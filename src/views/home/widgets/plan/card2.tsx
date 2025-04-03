import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Check } from "lucide-react";
import { availablePeriods } from "@/hooks/price";
import { Card3 } from "@/views/home/widgets/plan/card3";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export function Card2(plan: any) {
  const periodOptions = availablePeriods(plan);
  return (
    <Card key={plan.id} className="flex flex-col bg-muted/30">
      <CardHeader className="rounded-t-xl bg-muted/50">
        <CardTitle className="font-medium">{plan.name}</CardTitle>
        <span className="my-3 flex items-baseline text-2xl font-semibold gap-2">
          {periodOptions[0].price}
          <span className="flex text-base font-semibold text-foreground/65">
            <span>/</span>
            <span>{periodOptions[0].period}</span>
          </span>
        </span>
        <CardDescription className="text-sm">
          {plan.transfer_enable && `${plan.transfer_enable}GB 流量`}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <ul className="list-outside space-y-3 text-sm">
          {[
            "全球域订阅",
            "100G/Month",
            "华东 | 华南 | 华中节点接入口",
            "MPLS组网＋沪日IPLC＋CN2",
            "允许2台设备同时在线",
            "流量重置包可订阅",
            "Global Domain Subscription",
            "100G/Month",
            "East China | South China | Central China Node Access",
            "MPLS Networking + Shanghai-Tokyo IPLC + CN2",
            "Allows 2 Devices to Be Online Simultaneously",
            "Traffic Reset Package Available for Subscription",
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="size-3" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto">
        <Card3 plan={plan} />
      </CardFooter>
    </Card>
  );
}
