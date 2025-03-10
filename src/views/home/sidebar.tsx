import { AppSidebar } from "@/components/app-sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { useV2boardUserData } from "@/store/index";
import { serverFetchGet } from "@/api/server";

export function Sidebar() {
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
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-[1280px] mx-auto w-full">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
