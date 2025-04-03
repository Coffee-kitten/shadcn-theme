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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { availablePeriods } from "@/hooks/price";
import {
  useState,
  couponCheckPost,
  orderSavePost,
} from "@/utils/common-imports";
import { useFetchData } from "@/hooks/use-fetch-data";
import { Ticket } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
export function Card3({ plan }: any) {
  const navigate = useNavigate();
  const periodOptions = availablePeriods(plan);
  const [selectedPeriod, setSelectedPeriod] = useState(
    periodOptions[0]?.period || ""
  );
  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useFetchData();

  const price =
    Number(
      periodOptions.find((item) => item.period == selectedPeriod)?.price
    ) || 0;

  const couponDiscount = couponData
    ? couponData.type == 2
      ? price * (1 - couponData.value / 100)
      : price - couponData.value / 100
    : price;

  const resetCouponState = () => {
    setCouponData(null);
    setCouponCode("");
  };

  const clickCheck = async () => {
    setIsLoading(true);
    const result = await fetchData(() => couponCheckPost(couponCode, plan.id));
    if (result?.data) setCouponData(result.data);
    setIsLoading(false);
  };
  const clickOrder = async () => {
    resetCouponState();
    setIsLoading(true);
    const result = await fetchData(() =>
      orderSavePost(
        String(
          periodOptions.find((item) => item.period == selectedPeriod)?.key
        ),
        plan.id,

        couponData ? couponCode : undefined
      )
    );
    setIsLoading(false);
    if (result?.data) {
      navigate(`/order/${result.data}`);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="w-full">
          立即订购
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>购买订阅 #{plan.name}</AlertDialogTitle>
          <AlertDialogDescription>
            如果您已有订阅，当前订阅被新订阅覆盖，将会丢失当前订阅的流量和到期时间，并覆盖为新订阅。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="text-lg font-bold">订阅参数</div>
            <div className="grid grid-cols-3 md:grid-cols-4 text-sm">
              <div className="space-y-0.5 col-span-1 w-full font-medium">
                <div>可用流量</div>
                <div>速率限制</div>
                <div>可续费</div>
                <div>可重置流量</div>
              </div>
              <div className="space-y-0.5 col-span-2 md:grid-cols-3 w-full">
                <div>
                  {plan.transfer_enable && `${plan.transfer_enable} GiB`}
                </div>
                <div>无限制</div>
                <div>是</div>
                <div>是</div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="font-bold">周期</p>
            <Tabs
              defaultValue={selectedPeriod}
              onValueChange={setSelectedPeriod}
            >
              <TabsList>
                {periodOptions.map((item) => (
                  <TabsTrigger key={item.key} value={item.period}>
                    {`${item.period}付`}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="flex w-full items-center space-x-2">
            <Input
              placeholder="优惠码"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button
              variant="secondary"
              onClick={clickCheck}
              disabled={isLoading}
            >
              <Ticket />
              应用
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <p className="font-bold">待支付价格</p>
            <p className="font-bold text-xl">￥{couponDiscount.toFixed(2)}</p>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={resetCouponState} disabled={isLoading}>
            取消
          </AlertDialogCancel>
          <Button onClick={clickOrder} disabled={isLoading}>
            提交
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
