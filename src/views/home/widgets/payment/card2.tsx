import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Minus, Wallet, CreditCard } from "lucide-react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { paymentDetailGet } from "@/api/v1/payment";
export function Card2({ id }: any) {
  const { t } = useTranslation();
  const { data } = paymentDetailGet(id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>Review your order details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span>{t("订单号：")}</span>
            <span>{data?.data.data.trade_no}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t("创建时间：")}</span>
            <span>
              {dayjs
                .unix(data?.data.data.created_at)
                .format("YYYY-MM-DD HH:mm:ss")}
            </span>
          </div>
        </div>
        <Separator />

        {/* 金额明细 */}
        <div className="space-y-3">
          {/* 优惠金额 */}
          {data?.data.data.discount_amount && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Minus className="h-4 w-4 text-green-500" />
                <span className="text-sm">{t("优惠减免")}</span>
              </div>
              <Badge
                variant="outline"
                className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
              >
                -¥
                {(data?.data.data.discount_amount / 100).toFixed(2)}
              </Badge>
            </div>
          )}

          {/* 余额支付 */}
          {data?.data.data.balance_amount && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Wallet className="h-4 w-4 text-blue-500" />
                <span className="text-sm">{t("余额支付")}</span>
              </div>
              <Badge
                variant="outline"
                className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800"
              >
                -¥
                {(data?.data.data.balance_amount / 100).toFixed(2)}
              </Badge>
            </div>
          )}

          {/* 手续费 */}
          {data?.data.data.handling_amount && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4 text-orange-500" />
                <span className="text-sm">{t("手续费")}</span>
              </div>
              <Badge
                variant="outline"
                className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800"
              >
                +¥
                {(data?.data.data.handling_amount / 100).toFixed(2)}
              </Badge>
            </div>
          )}

          {/* 剩余金额 */}
          {data?.data.data.surplus_amount && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("剩余待付")}
              </span>
              <Badge
                variant="outline"
                className="text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800"
              >
                ¥{(data?.data.data.surplus_amount / 100).toFixed(2)}
              </Badge>
            </div>
          )}

          {/* 退款金额 */}
          {data?.data.data.refund_amount && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("已退款")}
              </span>
              <Badge
                variant="outline"
                className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
              >
                ¥{(data?.data.data.refund_amount / 100).toFixed(2)}
              </Badge>
            </div>
          )}
        </div>

        {/* 实付金额 */}
        <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
          <span className="font-semibold">{t("实付金额")}</span>
          <span className="text-xl font-bold text-primary">
            ¥{(data?.data.data.total_amount / 100).toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
