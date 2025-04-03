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
  getPeriodText,
  OrderInfoRow,
  OrderSection,
} from "@/views/home/widgets/order/card2";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "@/hooks/use-fetch-data";
import { toast } from "sonner";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
import {
  useState,
  useV2boardUserData,
  orderFetchGet,
  orderCancelPost,
} from "@/utils/common-imports";
export function Card1() {
  const store = useV2boardUserData();
  const navigate = useNavigate();
  const fetchData = useFetchData();
  const [isLoading, setIsLoading] = useState(false);
  const handlePayment = (tardeNo: string) => {
    navigate("/order/" + tardeNo);
  };
  const { fetchAllData } = useFetchMultipleData([
    {
      fetchFn: orderFetchGet,
      setDataFn: (data) => store.setOrderFetchData(data),
    },
  ]);
  const handleCancel = async (tardeNo: string) => {
    setIsLoading(true);
    const result = await fetchData(() => orderCancelPost(tardeNo));

    if (result?.data) {
      toast.success("订单已取消");
    }

    fetchAllData();
    setIsLoading(false);
  };
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {store.orderFetchData.data.map((item: any) => {
        const orderStatus = getOrderStatus(item.status);

        return (
          <Dialog key={item.trade_no}>
            <DialogTrigger asChild>
              <button className="p-6 flex bg-muted/50 rounded-lg justify-between transition-all hover:px-[1.715rem]">
                <div className="mt-4 space-y-0.5 line-clamp-1">
                  <div className="text-start flex gap-2 items-center text-base md:text-lg font-medium line-clamp-1">
                    <p className="line-clamp-1">{item.trade_no}</p>
                    <Package />
                  </div>
                  <div className="text-sm line-clamp-1 text-start flex gap-1 items-center text-muted-foreground">
                    <Badge
                      variant={
                        orderStatus.text == "已完成"
                          ? "default"
                          : orderStatus.text == "已折抵"
                          ? "secondary"
                          : orderStatus.text == "待支付"
                          ? "destructive"
                          : "outline"
                      }
                    >
                      {orderStatus.text}
                    </Badge>
                    <div className="space-x-0.5 line-clamp-1">
                      <span className="font-medium">创建于</span>
                      <span>
                        {dayjs(item.created_at * 1000).format(
                          "YYYY-MM-DD HH:mm:ss"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>订单详细 #{item.trade_no}</DialogTitle>
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
                <OrderSection title="订阅信息">
                  <OrderInfoRow label="订阅名称" value={item.plan.name} />
                  <OrderInfoRow
                    label="订阅类型/周期"
                    value={getPeriodText(item.period)}
                  />
                  <OrderInfoRow
                    label="订阅流量"
                    value={`${item.plan.transfer_enable} GiB`}
                  />
                </OrderSection>
                <OrderSection title="订阅信息">
                  <OrderInfoRow label="订单号" value={item.trade_no} />
                  {item.callback_no && (
                    <OrderInfoRow label="回调单号" value={item.callback_no} />
                  )}

                  <OrderInfoRow
                    label="需支付金额"
                    value={`¥ ${(item.total_amount / 100).toFixed(2)} CNY`}
                  />
                  <OrderInfoRow
                    label="订单创建于"
                    value={dayjs(item.created_at * 1000).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  />
                  {item.paid_at && (
                    <OrderInfoRow
                      label="订单支付于"
                      value={dayjs(item.paid_at * 1000).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    />
                  )}
                  <OrderInfoRow
                    label="订单更新于"
                    value={dayjs(item.updated_at * 1000).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  />
                </OrderSection>
              </div>
              {item.status == 0 && (
                <DialogFooter>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleCancel(item.trade_no)}
                    disabled={isLoading}
                  >
                    取消订单
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handlePayment(item.trade_no)}
                    disabled={isLoading}
                    className="transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95"
                  >
                    支付
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
