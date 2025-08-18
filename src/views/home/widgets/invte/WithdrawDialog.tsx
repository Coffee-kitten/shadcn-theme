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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Banknote } from "lucide-react";
import { useState } from "react";
import { useV2boardUserData } from "@/store/index";

export const WithdrawDialog = ({ currentBalance, onWithdraw }: any) => {
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const [open, setOpen] = useState(false);
  const store = useV2boardUserData();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <Banknote />
          提现
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>提现申请</DialogTitle>
          <DialogDescription>
            申请提现 ¥{currentBalance / 100} 推广佣金，请填写提现信息。
          </DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2 ">
            <Label htmlFor="withdraw-method">提现方式</Label>
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
            <Label htmlFor="withdraw-account">提现账号</Label>
            <Input
              id="withdraw-account"
              placeholder="请输入提现账号"
              value={withdrawAccount}
              className="w-full"
              onChange={(e) => setWithdrawAccount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="mt-2 sm:mt-0" variant="outline">
              取消
            </Button>
          </DialogClose>
          <Button
            disabled={!withdrawMethod || !withdrawAccount}
            onClick={() => {
              onWithdraw(withdrawMethod, withdrawAccount);
              setOpen(false);
            }}
          >
            确认提现
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
