import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useV2boardUserData } from "@/store/index";
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
              {dayjs(store.paymentDetailData.data.created_at * 1000).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </span>
          </div>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span>Total</span>
          <span>
            {(store.paymentDetailData.data.total_amount / 100).toFixed(2)} CNY
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
