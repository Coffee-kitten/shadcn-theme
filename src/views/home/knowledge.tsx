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
import { knowledgeFetchGet } from "@/api/knowledge";
import { Card1 } from "@/views/home/widgets/knowledge/card1";
import { Card2 } from "@/views/home/widgets/knowledge/card2";
import { Loading } from "@/views/home/widgets/knowledge/loading";
import { Android } from "@/views/svg/android";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function Knowledge() {
  const store = useV2boardUserData();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setSubscribeData((await subscribeGet()).data);
        store.setTrafficLogData((await trafficLogGet()).data);
        store.setKnowledgeFetchData((await knowledgeFetchGet()).data);
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

        {store.subscribeData.data &&
        store.trafficLogData.data &&
        store.knowledgeFetchData.data ? (
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-[1500px] mx-auto w-full">
            <Card1 />
            <Card2 />
          </div>
        ) : (
          <Loading />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
