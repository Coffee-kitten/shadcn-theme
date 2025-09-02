import { Button } from "@/components/ui/button";
import { PlanCard3 } from "@/views/home/widgets/plan/card3";
import { useV2boardUserData } from "@/store";
import { useTranslation } from "react-i18next";

export const ExpiredAt = ({ expiredAt }: { expiredAt: string }) => {
  const store = useV2boardUserData();
  const { t } = useTranslation();
  return (
    <div className="grid w-full h-full bg-muted/75 border rounded-lg">
      <div className="flex flex-col items-center gap-2 p-2 m-auto">
        <div className="flex flex-col items-center p-1">
          <div className="text-lg font-semibold text-foreground">
            {t("订阅已于 {{expiredAt}} 到期", { expiredAt })}
          </div>
          <div className="text-sm text-muted-foreground">
            {t("好用、爱用。下次不要忘记续费了。")}
          </div>
        </div>
        <div className="space-x-2">
          <PlanCard3 plan={store.subscribeData.data.plan} renew={2} />
          <Button variant="outline" className="h-9 py-2 px-6" asChild>
            <a href="/#/store">{t("新购订阅")}</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const BuyPlan = () => {
  const { t } = useTranslation();
  return (
    <div className="grid w-full h-full bg-muted/75 border rounded-lg">
      <div className="flex flex-col items-center gap-2 p-2 m-auto">
        <div className="flex flex-col items-center p-1">
          <div className="text-lg font-semibold text-foreground">
            {t("尚未拥有订阅")}
          </div>
          <div className="text-sm text-muted-foreground">
            {t("不要犹豫，就从现在开始。")}
          </div>
        </div>
        <Button className="h-9 py-2 px-8" asChild>
          <a href="/#/store">{t("前往选购")}</a>
        </Button>
      </div>
    </div>
  );
};
