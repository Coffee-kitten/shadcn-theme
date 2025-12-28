import { type LucideIcon } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

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
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleItemClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{lable}</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          // 确保比较逻辑正确
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={location.pathname == item.url}>
              <Link to={item.url} onClick={handleItemClick}>
                <item.icon />
                <span className="text-xs">{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
