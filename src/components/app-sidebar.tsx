import * as React from "react";
import {
  Command,
  Frame,
  LifeBuoy,
  Map,
  SendHorizontal,
  ShoppingCart,
  Server,
  FileText,
  Users,
  ClipboardList,
} from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTranslation } from "react-i18next";
import { useV2boardUserData } from "@/store/index";
const getSidebarData = () => {
  const store = useV2boardUserData();
  const { t } = useTranslation();
  return {
    user: {
      email: store.infoData.data.email,
      avatar: store.infoData.data.avatar_url,
    },
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: SendHorizontal,
      },
    ],
    projects: [
      {
        name: t("仪表盘"),
        url: "/#/dashboard",
        icon: Frame,
      },
      {
        name: t("知识库"),
        url: "/#/knowledge",
        icon: Map,
      },
      {
        name: t("报告"),
        url: "/#/announcements",
        icon: ClipboardList,
      },
    ],
    subscriptionItems: [
      {
        name: t("购买订阅"),
        url: "/#/plan",
        icon: ShoppingCart, // 购物车图标更适合购买操作
      },
      {
        name: t("节点状态"),
        url: "/#/server",
        icon: Server, // 服务器图标更适合表示节点状态
      },
    ],

    // 将 projects3 重命名为 accountItems
    accountItems: [
      {
        name: t("我的订单"),
        url: "/#/order", // 修正了URL，应该指向订单页面
        icon: FileText, // 文档图标更适合表示订单
      },
      {
        name: t("我的邀请"),
        url: "/#/invite", // 修正了URL，应该指向邀请页面
        icon: Users, // 用户组图标更适合表示邀请功能
      },
    ],
  };
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = getSidebarData();
  const { t } = useTranslation();
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} lable={t("概况")} />
        <NavProjects projects={data.subscriptionItems} lable={t("订阅")} />
        <NavProjects projects={data.accountItems} lable={t("财务")} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
