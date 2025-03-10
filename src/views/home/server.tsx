import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useV2boardUserData } from "@/store/index";
import { serverFetchGet } from "@/api/server";
import { Head } from "@/views/home/head";
import { Card1 } from "@/views/home/widgets/server/card1";
import { Card2 } from "@/views/home/widgets/server/card2";
import { Loading1 } from "@/views/home/widgets/knowledge/loading";

export function Server() {
  const store = useV2boardUserData();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setServerFetchData((await serverFetchGet()).data);
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
  return store.serverFetchData.data ? (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-[1280px] mx-auto w-full">
      <Head badge="节点状态" />
      <Card2 />
      <Card1 />
    </div>
  ) : (
    <Loading1 />
  );
}
