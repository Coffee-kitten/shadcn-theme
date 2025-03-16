import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { Package } from "lucide-react";
import { useV2boardUserData } from "@/store/index";
import {
  getOrderStatus,
  getPeriodText,
  OrderInfoRow,
  OrderSection,
} from "@/views/home/widgets/order/card2";

export function Card1() {
  const store = useV2boardUserData();
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {store.orderFetchData.data.map((item: any, index: any) => {
        const orderStatus = getOrderStatus(item.status);

        return (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button className="p-6 flex bg-muted rounded-lg justify-between transition-all hover:px-[1.715rem]">
                <div className="mt-4 space-y-0.5 line-clamp-1">
                  <div className="text-start flex gap-2 items-center text-base md:text-lg font-medium line-clamp-1">
                    <p className="line-clamp-1">{item.trade_no}</p>
                    <Package />
                  </div>
                  <div className="text-sm line-clamp-1 text-start flex gap-1 items-center text-muted-foreground">
                    <Badge className="line-clamp-1">{orderStatus.text}</Badge>
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
                <div className="mt-2">
                  <div className="h-24 flex flex-col gap-1 items-center justify-center bg-muted/25 rounded-lg border mt-8">
                    {orderStatus.icon}
                    <div className={`text-sm font-medium ${orderStatus.color}`}>
                      {orderStatus.text}
                    </div>
                  </div>
                  <hr className="h-px my-8 border-0 bg-muted-foreground/65" />
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
                        <OrderInfoRow
                          label="回调单号"
                          value={item.callback_no}
                        />
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
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}
