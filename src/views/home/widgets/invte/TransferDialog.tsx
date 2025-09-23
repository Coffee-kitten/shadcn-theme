import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Toggle } from "@/components/ui/toggle";
import { ArrowRightLeft } from "lucide-react";
import { BadgeJapaneseYen } from "lucide-react";
import { useInviteActions } from "./useInviteActions";
import { useTranslation } from "react-i18next";

export const TransferDialog = ({ currentBalance }: any) => {
  const { t } = useTranslation();
  const {
    transferAmount,
    setTransferAmount,
    handleTransferToBalance,
    generateLoading,
  } = useInviteActions();
  const handleTransfer = () => {
    handleTransferToBalance();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <ArrowRightLeft />
          {t("划转")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("佣金划转")}</DialogTitle>
          <DialogDescription>
            {t("划转后的余额仅用于 {{appName}} 消费使用", {
              appName: import.meta.env.VITE_APP_NAME,
            })}
          </DialogDescription>
        </DialogHeader>
        <div className="my-2">
          <div className="text-base">{t("您的可划转佣金:")}</div>
          <div className="flex gap-0.5 items-center font-medium text-xl">
            <span>¥</span>
            <span>{currentBalance / 100}</span>
            <span>CNY</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transfer-amount">{t("划转金额")}</Label>
          <div className="flex gap-2 items-center">
            <Toggle variant="outline" aria-label="Toggle italic">
              <BadgeJapaneseYen />
            </Toggle>
            <Input
              id="transfer-amount"
              type="number"
              placeholder={t("请输入划转金额")}
              value={transferAmount}
              onChange={(e) => {
                const value = e.target.value;
                // 只允许最多两位小数
                if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
                  setTransferAmount(value);
                }
              }}
              max={currentBalance / 100}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="mt-2 sm:mt-0"
              variant="outline"
              disabled={generateLoading}
            >
              {t("取消")}
            </Button>
          </DialogClose>
          <Button
            onClick={handleTransfer}
            disabled={
              !transferAmount ||
              parseFloat(transferAmount) <= 0 ||
              parseFloat(transferAmount) > currentBalance / 100 ||
              generateLoading
            }
          >
            {t("确认划转")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
