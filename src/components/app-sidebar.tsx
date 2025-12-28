import * as React from "react";
import {
  Command,
  Frame,
  Map,
  SendHorizontal,
  ShoppingCart,
  Server,
  Receipt,
  Users,
  User,
  ClipboardList,
  MessageCircle,
  Gift,
} from "lucide-react";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { Separator } from "@/components/ui/separator";
import { NavUser } from "@/components/nav-user";
import { NavMain } from "@/components/nav-main";
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
import { infoGet } from "@/api/v1/base";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
const getSidebarData = () => {
  const { data } = infoGet();
  const { t } = useTranslation();
  return {
    user: {
      email: data?.data.data.email,
      avatar: data?.data.data.avatar_url,
    },
    navSecondary: [
      {
        title: "Telegram",
        url: import.meta.env.VITE_APP_TG,
        icon: SendHorizontal,
      },
    ],
    projects: [
      {
        title: t("仪表盘"),
        url: "/dashboard",
        icon: Frame,
      },
    ],
    subscriptionItems: [
      {
        name: t("节点状态"),
        url: "/server",
        icon: Server, // 服务器图标更适合表示节点状态
      },
    ],

    // 用户相关功能
    userItems: [
      {
        name: t("我的工单"),
        url: "/ticket",
        icon: MessageCircle, // 消息圆圈图标表示工单
      },

      {
        name: t("报告"),
        url: "/announcements",
        icon: ClipboardList,
      },
    ],
    navMain: [
      {
        title: t("可购订阅"),
        url: "/store",
        icon: ShoppingCart,
        isActive: true,
      },
    ],
    // 将 projects3 重命名为 accountItems
    accountItems: [
      {
        name: t("知识库"),
        url: "/knowledge",
        icon: Map,
      },
      {
        name: t("我的订单"),
        url: "/order", // 修正了URL，应该指向订单页面
        icon: Receipt, // 文档图标更适合表示订单
      },
      {
        name: t("推荐好友"),
        url: "/invite", // 修正了URL，应该指向邀请页面
        icon: Gift, // 用户组图标更适合表示邀请功能
      },
    ],
  };
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = getSidebarData();
  const { t } = useTranslation();
  return (
    <Sidebar variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">OnePixel Inc</span>
                  <span className="truncate text-xs">
                    2020-{dayjs().year()}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.projects} />

        <div className="px-4">
          <Separator />
        </div>
        <NavMain items={data.navMain} />
        <div className="px-4">
          <Separator />
        </div>
        <NavProjects projects={data.accountItems} lable={t("财务")} />
        <NavProjects projects={data.userItems} lable={t("用户")} />

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
