import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Link,
  Gift,
  Copy,
  UserPlus,
  Wallet,
  Percent,
} from "lucide-react";
import { toast } from "sonner";
import { InfoCard } from "./InfoCard";
import { TransferDialog } from "./TransferDialog";
import { WithdrawDialog } from "./WithdrawDialog";
import { useState } from "react";
// import { useInviteActions } from "./useInviteActions";
import { useTranslation } from "react-i18next";
import { inviteFetchGet, inviteSaveGet } from "@/api/v1/invite";

export const Card1 = () => {
  const { t } = useTranslation();
  const { data, mutate } = inviteFetchGet();
  const [isLoading, setIsLoading] = useState(false);
  // const { isLoading } = useInviteActions();
  const handleGenerateNewLink = async () => {
    try {
      setIsLoading(true);
      await inviteSaveGet();
      await mutate(); // 更新邀请数据
      toast.success(t("已生成"));
    } catch (error: any) {
      toast.error(error.data?.message || t("生成失败"));
    } finally {
      setIsLoading(false);
    }
  };
  const inviteCodes = data?.data.data.codes || [];

  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              {t("我的邀请")}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t("邀请好友注册，获得丰厚奖励")}
            </p>
          </div>
        </div>

        <Separator />

        <InfoCard
          icon={UserPlus}
          iconBgColor="bg-blue-50 dark:bg-blue-950/50"
          iconColor="text-blue-600 dark:text-blue-400"
          title={t("邀请人数")}
          badge={{
            text: t("累计"),
            variant: "secondary",
            className:
              "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
          }}
          content={
            <Badge variant="outline">
              {t("{{count}}人", { count: data?.data.data.stat[0] })}
            </Badge>
          }
        />

        <Separator />
        <InfoCard
          icon={Wallet}
          iconBgColor="bg-green-50 dark:bg-green-950/50"
          iconColor="text-green-600 dark:text-green-400"
          title={t("剩余佣金")}
          content={
            <Badge variant="outline">¥ {data?.data.data.stat[4] / 100}</Badge>
          }
        />
        <Separator />
        <InfoCard
          icon={Percent}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/50"
          iconColor="text-emerald-600 dark:text-emerald-400"
          title={t("佣金比例")}
          content={<Badge variant="outline">{data?.data.data.stat[3]}%</Badge>}
        />

        <Separator />

        <InfoCard
          icon={Gift}
          iconBgColor="bg-amber-50 dark:bg-amber-950/50"
          iconColor="text-amber-600 dark:text-amber-400"
          title={t("待结算")}
          badge={{
            text: t("处理中"),
            variant: "secondary",
            className:
              "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
          }}
          content={
            <Badge variant="outline">¥ {data?.data.data.stat[2] / 100}</Badge>
          }
        />
        <Separator />
        <div className="flex gap-2">
          <TransferDialog />
          <WithdrawDialog />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Link className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium">{t("邀请码")}</h4>
              <p className="text-xs text-muted-foreground">
                {t("分享邀请码给好友完成注册")}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            {inviteCodes.map((code: any, index: number) => {
              const inviteLink = `${window.location.origin}/#/register?code=${code.code}`;
              return (
                <div key={code.id || index} className="group relative">
                  <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                        <Link className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium font-mono tracking-wider">
                          {code.code}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t("邀请码")}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(inviteLink);
                        toast.success("邀请链接已复制到剪贴板");
                      }}
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={handleGenerateNewLink}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? t("生成中...") : t("生成邀请码")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
