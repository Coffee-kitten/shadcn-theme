import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { Package } from "lucide-react";
import {
  getOrderStatus,
  OrderInfoRow,
  OrderSection,
} from "@/views/home/widgets/order/card2";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "@/utils/common-imports";
import { useOrderCancelPost } from "@/api/v1/order";
import { usePeriodMap } from "@/hooks/price";
import { useTranslation } from "react-i18next";
import { orderFetchGet } from "@/api/v1/order";
export function Card1() {
  const { data, mutate } = orderFetchGet();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const periodMap = usePeriodMap();
  const { orderCancelPost } = useOrderCancelPost();
  const handlePayment = (tardeNo: string) => {
    navigate("/order/" + tardeNo);
  };
  const handleCancel = async (tardeNo: string) => {
    setIsLoading(true);
    const result = await orderCancelPost(tardeNo);
    if (result) {
      await mutate();
      toast.success(t("订单已取消"));
    }
    setIsLoading(false);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data?.data.data.map((item: any) => {
        const orderStatus = getOrderStatus(item.status, t);
        return (
          <Dialog key={item.trade_no}>
            <DialogTrigger asChild>
              <button className="p-4 md:p-6 flex bg-muted/50 rounded-lg justify-between transition-all active:scale-[0.98] active:bg-muted/70 hover:bg-muted/60">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="text-start flex gap-2 items-center text-base md:text-lg font-medium">
                    <p className="flex-1 min-w-0 truncate">{item.trade_no}</p>
                    <Package className="flex-shrink-0" />
                  </div>
                  <div className="text-sm text-start flex flex-col sm:flex-row sm:gap-2 sm:items-center text-muted-foreground">
                    <Badge
                      className="w-fit mb-1 sm:mb-0"
                      variant={
                        orderStatus.text == t("已完成")
                          ? "default"
                          : orderStatus.text == t("已折抵")
                          ? "secondary"
                          : orderStatus.text == t("待支付")
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {orderStatus.text}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs sm:text-sm">
                      <span className="font-medium">{t("创建于")}</span>
                      <span className="line-clamp-1">
                        {dayjs.unix(item.created_at).format("MM-DD HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {t("订单详细")} #{item.trade_no}
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>

              <div className="h-24 flex flex-col gap-1 items-center justify-center bg-muted/25 rounded-lg border mt-8">
                {orderStatus.icon("h-8 w-8")}
                <div className={`text-sm font-medium ${orderStatus.color}`}>
                  {orderStatus.text}
                </div>
              </div>
              <Separator />

              <div className="space-y-6">
                <OrderSection title={t("订阅信息")}>
                  <OrderInfoRow label={t("订阅名称")} value={item.plan?.name} />
                  <OrderInfoRow
                    label={t("订阅类型/周期")}
                    value={
                      periodMap[item.period as keyof typeof periodMap]?.long
                    }
                  />
                  <OrderInfoRow
                    label={t("订阅流量")}
                    value={`${item.plan?.transfer_enable} GB`}
                  />
                </OrderSection>
                <OrderSection title={t("订阅信息")}>
                  <OrderInfoRow label={t("订单号")} value={item.trade_no} />
                  {item.callback_no && (
                    <OrderInfoRow
                      label={t("回调单号")}
                      value={item.callback_no}
                    />
                  )}

                  <OrderInfoRow
                    label={t("需支付金额")}
                    value={`¥ ${(item.total_amount / 100).toFixed(2)} CNY`}
                  />
                  <OrderInfoRow
                    label={t("订单创建于")}
                    value={dayjs
                      .unix(item.created_at)
                      .format("YYYY-MM-DD HH:mm:ss")}
                  />
                  {item.paid_at && (
                    <OrderInfoRow
                      label={t("订单支付于")}
                      value={dayjs
                        .unix(item.paid_at)
                        .format("YYYY-MM-DD HH:mm:ss")}
                    />
                  )}
                  <OrderInfoRow
                    label={t("订单更新于")}
                    value={dayjs
                      .unix(item.updated_at)
                      .format("YYYY-MM-DD HH:mm:ss")}
                  />
                </OrderSection>
              </div>
              {item.status == 0 && (
                <DialogFooter className="flex-col sm:flex-row gap-2">
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleCancel(item.trade_no)}
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    {t("取消订单")}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handlePayment(item.trade_no)}
                    disabled={isLoading}
                    className="w-full sm:w-auto"
                  >
                    {t("支付")}
                  </Button>
                </DialogFooter>
              )}
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
