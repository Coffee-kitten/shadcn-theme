import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Banknote } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  commConfigGet,
  inviteFetchGet,
  useTicketWithdrawPost,
} from "@/api/v1/invite";
export const WithdrawDialog = () => {
  const { data: inviteData } = inviteFetchGet();
  const { data } = commConfigGet();
  const { t } = useTranslation();
  const { ticketWithdrawPost } = useTicketWithdrawPost();
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const { withdrawLoading } = useInviteActions();
  const handleWithdrawCommission = async () => {
    setIsLoading(true);
    const result = await ticketWithdrawPost(withdrawMethod, withdrawAccount);
    if (result) {
      toast.success(
        t("提现申请已提交，提现方式：{{withdrawMethod}}", {
          withdrawMethod,
        })
      );
    }
    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="w-full">
          <Banknote />
          {t("提现")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("提现申请")}</DialogTitle>
          <DialogDescription>
            {t("申请提现 ¥{{currentBalance}} 推广佣金，请填写提现信息。", {
              currentBalance: inviteData?.data.data.stat[4] / 100,
            })}
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2 ">
            <Label htmlFor="withdraw-method">{t("提现方式")}</Label>
            <Select onValueChange={setWithdrawMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={withdrawMethod || "..."} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {data?.data.data.withdraw_methods.map((method: any) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="withdraw-account">{t("提现账号")}</Label>
            <Input
              id="withdraw-account"
              placeholder={t("请输入提现账号")}
              value={withdrawAccount}
              className="w-full"
              onChange={(e) => setWithdrawAccount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="mt-2 sm:mt-0"
              variant="outline"
              disabled={isLoading}
            >
              {t("取消")}
            </Button>
          </DialogClose>
          <Button
            disabled={!withdrawMethod || !withdrawAccount || isLoading}
            onClick={handleWithdrawCommission}
          >
            {t("确认提现")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
