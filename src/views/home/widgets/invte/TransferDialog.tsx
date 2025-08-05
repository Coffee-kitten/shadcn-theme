import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ArrowRightLeft } from "lucide-react";

export const TransferDialog = ({
  currentBalance,
  transferAmount,
  setTransferAmount,
  onTransfer,
}: any) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
        >
          <ArrowRightLeft className="w-3 h-3 mr-1" />
          划转
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>佣金划转</AlertDialogTitle>
          <AlertDialogDescription>
            划转后的余额仅用于 {(window as any).config.name} 消费使用
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current-balance">当前推广佣金余额</Label>
            <Input
              id="current-balance"
              value={`¥${currentBalance / 100}`}
              disabled
              className="bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transfer-amount">划转金额</Label>
            <Input
              id="transfer-amount"
              type="number"
              placeholder="请输入划转金额"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              max={currentBalance / 100}
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setTransferAmount("")}>
            取消
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onTransfer}
            disabled={
              !transferAmount ||
              parseFloat(transferAmount) <= 0 ||
              parseFloat(transferAmount) > currentBalance / 100
            }
          >
            确认划转
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
