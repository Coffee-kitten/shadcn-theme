import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Banknote } from "lucide-react";
import { useState } from "react";
import { useV2boardUserData } from "@/store/index";

export const WithdrawDialog = ({ currentBalance, onWithdraw }: any) => {
  const [withdrawMethod, setWithdrawMethod] = useState("");
  const [withdrawAccount, setWithdrawAccount] = useState("");
  const store = useV2boardUserData();

  const handleWithdraw = () => {
    if (withdrawMethod && withdrawAccount) {
      onWithdraw(withdrawMethod, withdrawAccount);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <Banknote className="w-3 h-3 mr-1" />
          提现
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>提现申请</AlertDialogTitle>
          <AlertDialogDescription>
            申请提现 ¥{currentBalance / 100} 推广佣金，请填写提现信息。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="withdraw-method">提现方式</Label>
            <Select value={withdrawMethod} onValueChange={setWithdrawMethod}>
              <SelectTrigger>
                <SelectValue placeholder="请选择提现方式" />
              </SelectTrigger>
              <SelectContent>
                {store.configData.data?.withdraw_methods?.map(
                  (method: string) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="withdraw-account">提现账号</Label>
            <Input
              id="withdraw-account"
              placeholder="请输入提现账号"
              value={withdrawAccount}
              onChange={(e) => setWithdrawAccount(e.target.value)}
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction onClick={handleWithdraw}>
            确认提现
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
