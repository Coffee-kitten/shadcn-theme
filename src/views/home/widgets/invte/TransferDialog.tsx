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
import { useTranslation } from "react-i18next";
import { inviteFetchGet } from "@/api/v1/invite";
import { useUserTransferPost } from "@/api/v1/invite";
import { useState } from "react";
import { toast } from "sonner";
export const TransferDialog = () => {
  const { t } = useTranslation();
  const { data, mutate } = inviteFetchGet();
  const [isLoading, setIsLoading] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const { userTransferPost } = useUserTransferPost();

  const handleTransferToBalance = async () => {
    setIsLoading(true);
    const result = await userTransferPost(
      Math.floor((transferAmount as any) * 100)
    );
    if (result) {
      await mutate(); // 更新数据
      toast.success(
        t("成功划转 ¥{{transferAmount}} 到账户余额", {
          transferAmount,
        })
      );
      setTransferAmount(""); // 清空输入框
    }

    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="w-full">
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
            <span>{data?.data.data.stat[4] / 100}</span>
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
              max={data?.data.data.stat[4] / 100}
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
              disabled={isLoading}
            >
              {t("取消")}
            </Button>
          </DialogClose>
          <Button
            onClick={handleTransferToBalance}
            disabled={
              !transferAmount ||
              parseFloat(transferAmount) <= 0 ||
              parseFloat(transferAmount) > data?.data.data.stat[4] / 100 ||
              isLoading
            }
          >
            {t("确认划转")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
