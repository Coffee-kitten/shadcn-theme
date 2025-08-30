import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useV2boardUserData } from "@/store/index";
import { Minus, Wallet, CreditCard } from "lucide-react";
import dayjs from "dayjs";
export function Card2() {
  const store = useV2boardUserData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span>订单号</span>
            <span>{store.paymentDetailData.data.trade_no}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>创建时间</span>
            <span>
              {dayjs
                .unix(store.paymentDetailData.data.created_at)
                .format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        </div>
        <Separator />

        {/* 金额明细 */}
        <div className="space-y-3">
          {/* 优惠金额 */}
          {store.paymentDetailData.data.discount_amount && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Minus className="h-4 w-4 text-green-500" />
                <span className="text-sm">优惠减免</span>
              </div>
              <Badge
                variant="outline"
                className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
              >
                -¥
                {(store.paymentDetailData.data.discount_amount / 100).toFixed(
                  2
                )}
              </Badge>
            </div>
          )}

          {/* 余额支付 */}
          {store.paymentDetailData.data.balance_amount && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wallet className="h-4 w-4 text-blue-500" />
                <span className="text-sm">余额支付</span>
              </div>
              <Badge
                variant="outline"
                className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
              >
                -¥
                {(store.paymentDetailData.data.balance_amount / 100).toFixed(2)}
              </Badge>
            </div>
          )}

          {/* 手续费 */}
          {store.paymentDetailData.data.handling_amount && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4 text-orange-500" />
                <span className="text-sm">手续费</span>
              </div>
              <Badge
                variant="outline"
                className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800"
              >
                +¥
                {(store.paymentDetailData.data.handling_amount / 100).toFixed(
                  2
                )}
              </Badge>
            </div>
          )}

          {/* 剩余金额 */}
          {store.paymentDetailData.data.surplus_amount && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">剩余待付</span>
              <Badge
                variant="outline"
                className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800"
              >
                ¥
                {(store.paymentDetailData.data.surplus_amount / 100).toFixed(2)}
              </Badge>
            </div>
          )}

          {/* 退款金额 */}
          {store.paymentDetailData.data.refund_amount && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">已退款</span>
              <Badge
                variant="outline"
                className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
              >
                ¥{(store.paymentDetailData.data.refund_amount / 100).toFixed(2)}
              </Badge>
            </div>
          )}
        </div>

        <Separator />

        {/* 实付金额 */}
        <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
          <span className="font-semibold">实付金额</span>
          <span className="text-xl font-bold text-primary">
            ¥{(store.paymentDetailData.data.total_amount / 100).toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
