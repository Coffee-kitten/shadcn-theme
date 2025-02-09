import { AppSidebar } from "@/components/app-sidebar";
import { useEffect } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useV2boardUserData } from "@/store/index";
import { subscribeGet, trafficLogGet } from "@/api/dashboard";
import { Card1 } from "@/views/home/widgets/dashboard/card1";
import { Card2 } from "@/views/home/widgets/dashboard/card2";
import { Card3 } from "@/views/home/widgets/dashboard/card3";
import { Card4 } from "@/views/home/widgets/dashboard/card4";
import { Card5 } from "@/views/home/widgets/dashboard/card5";
import { Loading } from "@/views/home/widgets/dashboard/loading";

export function Dashboard() {
  const store = useV2boardUserData();
  const { t } = useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setSubscribeData((await subscribeGet()).data);
        store.setTrafficLogData((await trafficLogGet()).data);
      } catch {
        toast({
          variant: "destructive",
          title: t("请求失败"),
          description: t("遇到了一些问题"),
        });
      } finally {
        store.setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>

        {store.subscribeData.data && store.trafficLogData.data ? (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-[1500px] mx-auto">
            <Card1 />

            {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
            {/* <Skeleton className="h-[125px] w-[250px] rounded-xl" /> */}
            <div className="grid auto-rows-min gap-4 2xl:grid-cols-3">
              <Card2 />
              <Card3 />
              <Card4 />
            </div>
            <Card5 />
          </div>
        ) : (
          <Loading />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
