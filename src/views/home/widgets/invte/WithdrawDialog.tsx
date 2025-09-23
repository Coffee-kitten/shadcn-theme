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
import { useV2boardUserData } from "@/store/index";
import { useInviteActions } from "./useInviteActions";
import { useTranslation } from "react-i18next";

export const WithdrawDialog = ({ currentBalance }: any) => {
  const { t } = useTranslation();
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const store = useV2boardUserData();
  const { handleWithdrawCommission, withdrawLoading } = useInviteActions();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <Banknote />
          {t("提现")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("提现申请")}</DialogTitle>
          <DialogDescription>
            {t("申请提现 ¥{{currentBalance}} 推广佣金，请填写提现信息。", {
              currentBalance: currentBalance / 100,
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
                  {store.configData.data.withdraw_methods.map((method: any) => (
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
              disabled={withdrawLoading}
            >
              {t("取消")}
            </Button>
          </DialogClose>
          <Button
            disabled={!withdrawMethod || !withdrawAccount || withdrawLoading}
            onClick={() => {
              handleWithdrawCommission(withdrawMethod, withdrawAccount);
            }}
          >
            {t("确认提现")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
