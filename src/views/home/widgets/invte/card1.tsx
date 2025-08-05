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
import { useV2boardUserData } from "@/store/index";
import { toast } from "sonner";
import { InfoCard } from "./InfoCard";
import { TransferDialog } from "./TransferDialog";
import { WithdrawDialog } from "./WithdrawDialog";
import { useInviteActions } from "./useInviteActions";

export const Card1 = () => {
  const store = useV2boardUserData();
  const {
    isLoading,
    transferAmount,
    setTransferAmount,
    handleGenerateNewLink,
    handleTransferToBalance,
    handleWithdrawCommission,
  } = useInviteActions();

  const inviteCodes = store.inviteFetchData?.data?.codes || [];

  return (
    <Card className="bg-muted/30">
      <CardHeader className="pb-6 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              我的邀请
            </h4>
            <p className="text-sm text-muted-foreground">
              邀请好友注册，获得丰厚奖励
            </p>
          </div>
        </div>

        <Separator />

        <InfoCard
          icon={UserPlus}
          iconBgColor="bg-blue-50 dark:bg-blue-950/50"
          iconColor="text-blue-600 dark:text-blue-400"
          title="邀请人数"
          badge={{
            text: "累计",
            variant: "secondary",
            className:
              "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
          }}
          content={
            <Badge variant="outline">
              {store.inviteFetchData.data.stat[0]}人
            </Badge>
          }
        />

        <Separator />
        <InfoCard
          icon={Wallet}
          iconBgColor="bg-green-50 dark:bg-green-950/50"
          iconColor="text-green-600 dark:text-green-400"
          title="剩余佣金"
          badge={{
            text: "可提现",
            variant: "secondary",
            className:
              "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
          }}
          content={
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <TransferDialog
                  currentBalance={store.inviteFetchData.data.stat[4]}
                  transferAmount={transferAmount}
                  setTransferAmount={setTransferAmount}
                  onTransfer={handleTransferToBalance}
                />
                <WithdrawDialog
                  currentBalance={store.inviteFetchData.data.stat[4]}
                  onWithdraw={handleWithdrawCommission}
                />
              </div>
              <Badge variant="outline">
                ¥ {store.inviteFetchData.data.stat[4] / 100}
              </Badge>
            </div>
          }
        />
        <Separator />
        <InfoCard
          icon={Percent}
          iconBgColor="bg-emerald-50 dark:bg-emerald-950/50"
          iconColor="text-emerald-600 dark:text-emerald-400"
          title="佣金比例"
          content={
            <Badge variant="outline">
              {store.inviteFetchData.data.stat[3]}%
            </Badge>
          }
        />

        <Separator />

        <InfoCard
          icon={Gift}
          iconBgColor="bg-amber-50 dark:bg-amber-950/50"
          iconColor="text-amber-600 dark:text-amber-400"
          title="待结算"
          badge={{
            text: "处理中",
            variant: "secondary",
            className:
              "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",
          }}
          content={
            <Badge variant="outline">
              ¥ {store.inviteFetchData.data.stat[2] / 100}
            </Badge>
          }
        />
      </CardHeader>
      <Separator />
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Link className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground">邀请码</h4>
              <p className="text-xs text-muted-foreground">
                分享邀请码给好友完成注册
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
                        <Link className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium font-mono tracking-wider">
                          {code.code}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          邀请码
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
            {isLoading ? "生成中..." : "生成邀请码"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
