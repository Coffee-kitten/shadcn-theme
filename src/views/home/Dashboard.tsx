import {
  useEffect,
  toast,
  useTranslation,
  useV2boardUserData,
  trafficLogGet,
  subscribeGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card2 } from "@/views/home/widgets/dashboard/card2";
import { Card3 } from "@/views/home/widgets/dashboard/card3";
import { Card4 } from "@/views/home/widgets/dashboard/card4";
import { Card5 } from "@/views/home/widgets/dashboard/card5";
import { Loading } from "@/views/home/widgets/dashboard/loading";

export function Dashboard() {
  const store = useV2boardUserData();
  const { t } = useTranslation();
  const isLoading = !store.subscribeData.data || !store.trafficLogData.data;
  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setTrafficLogData((await trafficLogGet()).data);
        store.setSubscribeData((await subscribeGet()).data);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: t("请求失败"),
          description: error.data.message || t("遇到了一些问题"),
        });
      }
    };

    fetchData();
  }, []);

  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge="仪表盘" />

      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      {/* <Skeleton className="h-[125px] w-[250px] rounded-xl" /> */}
      <div className="grid auto-rows-min gap-4 2xl:grid-cols-3">
        <Card2 />
        <Card3 />
        <Card4 />
      </div>
      <Card5 />
    </PageContainer>
  );
}
