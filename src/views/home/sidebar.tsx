import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { I18n } from "@/components/i18n";
import { Loading } from "@/views/home/Loading";
import { infoGet, subscribeGet } from "@/api/v1/base";
export function Sidebar() {
  const { isLoading: infoLoading } = infoGet();
  const { isLoading: subLoading } = subscribeGet();
  if (infoLoading || subLoading) {
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
