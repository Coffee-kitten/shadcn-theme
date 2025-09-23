import { AppSidebar } from "@/components/app-sidebar";
import {
  useEffect,
  useV2boardUserData,
  subscribeGet,
  infoGet,
} from "@/utils/common-imports";
import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { I18n } from "@/components/i18n";
import { Loading } from "@/views/home/Loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
export function Sidebar() {
  const store = useV2boardUserData();

  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: infoGet,
      setDataFn: store.setInfoData,
    },
    {
      fetchFn: subscribeGet,
      setDataFn: store.setSubscribeData,
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4 w-full justify-between">
            <SidebarTrigger className="-ml-1" />
            <div className="flex gap-2">
              <I18n />
              <ModeToggle />
            </div>
          </div>
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
