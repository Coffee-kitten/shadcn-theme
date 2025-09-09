import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card2 } from "@/views/home/widgets/plan/card2.tsx";
import { useTranslation } from "react-i18next";
import { useV2boardUserData } from "@/store/index";
export function Card1() {
  const { t } = useTranslation();
  const store = useV2boardUserData();

  // 过滤函数
  const filterPlans = [
    ["all", () => true],
    ["traffic", (plan: any) => plan.onetime_price],
    ["period", (plan: any) => !plan.onetime_price],
  ];
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-2">
        <TabsTrigger value="all">{t("全部")}</TabsTrigger>
        <TabsTrigger value="traffic">{t("按流量")}</TabsTrigger>
        <TabsTrigger value="period">{t("按周期")}</TabsTrigger>
      </TabsList>

      {filterPlans.map((key: any) => (
        <TabsContent key={key[0]} value={key[0]}>
          <section className="grid auto-rows-min gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {store.planFetchData.data
              .filter(key[1])
              .map((plan: any) => Card2(plan))}
          </section>
        </TabsContent>
      ))}
    </Tabs>
  );
}
