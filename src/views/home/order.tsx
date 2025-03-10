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
import { orderFetchGet } from "@/api/order";
import { Head } from "@/views/home/head";
import { Card1 } from "@/views/home/widgets/order/card1";
import { Card2 } from "@/views/home/widgets/server/card2";
import { Loading1 } from "@/views/home/widgets/knowledge/loading";

export function Order() {
  const store = useV2boardUserData();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setOrderFetchData((await orderFetchGet()).data);
      } catch {
        toast({
          variant: "destructive",
          title: t("请求失败"),
          description: t("遇到了一些问题"),
        });
      }
    };

    fetchData();
  }, []);
  return store.orderFetchData.data ? (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-[1280px] mx-auto w-full">
      <Head badge="订单管理" />
      <Card1 />
    </div>
  ) : (
    <Loading1 />
  );
}
