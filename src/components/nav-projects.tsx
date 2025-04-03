import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useTranslation } from "react-i18next";
export function NavProjects({
  projects,
  lable,
}: {
  projects: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
  lable: string;
}) {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{lable}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => {
          // 确保比较逻辑正确
          const isActive = `/#${location.pathname}` == item.url;
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a
                  href={item.url}
                  className={cn(
                    isActive && "bg-accent text-accent-foreground font-medium"
                  )}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
