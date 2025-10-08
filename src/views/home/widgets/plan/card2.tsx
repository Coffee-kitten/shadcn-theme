import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  Check,
  Zap,
  Globe,
  Shield,
  Users,
  Smartphone,
  Play,
  Gift,
  RefreshCw,
  MapPin,
  Gamepad2,
  GraduationCap,
  BotMessageSquare,
} from "lucide-react";
import { useAvailablePeriods } from "@/hooks/price";
import { PlanCard3 } from "@/views/home/widgets/plan/card3";
import { useTranslation } from "react-i18next";

export function Card2(plan: any) {
  const { t } = useTranslation();
  const periodOptions = useAvailablePeriods(plan);
  // 图标映射
  const iconMap: { [key: string]: any } = {
    Globe,
    Shield,
    Users,
    Zap,
    Check,
    Smartphone,
    Play,
    Gift,
    RefreshCw,
    MapPin,
    Gamepad2,
    GraduationCap,
    BotMessageSquare,
  };

  const parseHtmlToData = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const badge = doc.querySelector("badge")?.textContent?.trim() || "";

    const list = Array.from(doc.querySelectorAll("ul > li")).map((li) => ({
      icon: li.getAttribute("class") || "Globe",
      text: li.textContent?.trim() || "",
    }));

    const features = Array.from(doc.querySelectorAll("features > badge")).map(
      (badge) => badge.textContent?.trim() || ""
    );

    return { badge, list, features };
  };

  // 解析HTML内容
  const parsedData = parseHtmlToData(plan.content);

  return (
    <Card
      key={plan.id}
      className="
       flex flex-col relative overflow-hidden
       group border-0 bg-gradient-to-br from-background to-muted/30
       shadow-lg hover:shadow-xl
       transition-all duration-300 hover:-translate-y-1
      "
    >
      {/* 装饰性渐变 */}
      <div
        className="
         absolute inset-0               
         bg-gradient-to-br from-primary/5 to-transparent  
         opacity-0 group-hover:opacity-100 transition-opacity duration-300 
        "
      />

      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
          {parsedData.badge && (
            <Badge variant="secondary" className="text-xs">
              {parsedData.badge}
            </Badge>
          )}
        </div>

        {/* 价格展示 */}
        <div className="mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">
              {periodOptions[0].price}
            </span>
            <span className="text-sm text-muted-foreground font-medium">
              /{periodOptions[0].period.short}
            </span>
          </div>
          {plan.transfer_enable && (
            <CardDescription className="mt-2 text-sm font-medium">
              {plan.transfer_enable}GB{" "}
              {plan.reset_traffic_method != 2 ? t("月流量") : t("一次性")}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      <Separator className="ml-6" />

      <CardContent className="relative pt-6 pb-4">
        {/* 核心功能 */}
        {parsedData.list.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t("核心功能")}
            </h4>
            <div className="grid gap-3">
              {parsedData.list.map((feature, idx) => {
                const Icon = iconMap[feature.icon] || Check;
                return (
                  <div key={idx} className="flex items-center gap-3 group/item">
                    <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 附加特性 */}
        {parsedData.features.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {t("附加特性")}
            </h4>
            <div className="flex flex-wrap gap-2">
              {parsedData.features.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="relative mt-auto pt-4">
        <PlanCard3 plan={plan} />
      </CardFooter>
    </Card>
  );
}
