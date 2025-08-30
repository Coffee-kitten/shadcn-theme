import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Ticket, Tag, Percent } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
export function PlanCard3({ plan, renew = 0 }: { plan: any; renew?: number }) {
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
  const actionMap: Record<number, JSX.Element> = {
    0: (
      <Button variant="outline" className="w-full">
        立即订购
      </Button>
    ),
    1: (
      <Button variant="secondary" disabled={plan.onetime_price}>
        续费
      </Button>
    ),
    2: <Button className="h-9 py-2 px-6">即刻续费</Button>,
  };

  return (
    <Dialog onOpenChange={resetCouponState}>
      <DialogTrigger asChild>{actionMap[renew]}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {renew != 0 ? (
            <>
              <DialogTitle>续费订阅 #{plan.name}</DialogTitle>
              <DialogDescription>
                您可以在旧订阅的基础上直接续费，保持您的订阅计划不变，延长订阅到期时间。
              </DialogDescription>
            </>
          ) : (
            <>
              <DialogTitle>购买订阅 #{plan.name}</DialogTitle>
              <DialogDescription>
                如果您已有订阅，当前订阅被新订阅覆盖，将会丢失当前订阅的流量和到期时间，并覆盖为新订阅。
              </DialogDescription>
            </>
          )}
        </DialogHeader>
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
                <div>{`${plan.transfer_enable} GiB`}</div>
                <div>
                  {plan.speed_limit ? `${plan.speed_limit} Mbps` : "无限制"}
                </div>
                <div>{(plan.renew = 1 ? "是" : "否")}</div>
                <div>{plan.reset_price ? "是" : "否"}</div>
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

          <div className="space-y-4">
            <div className="flex w-full items-center space-x-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="输入优惠码"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="secondary"
                onClick={clickCheck}
                disabled={isLoading || !couponCode.trim()}
                className="shrink-0"
              >
                <Ticket className="h-4 w-4 mr-1" />
                应用
              </Button>
            </div>

            {/* 价格显示区域 */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">原价</span>
                <span
                  className={`text-lg font-medium ${
                    couponData
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  ￥{price.toFixed(2)}
                </span>
              </div>

              {couponData && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-muted-foreground">
                        优惠
                      </span>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      >
                        {couponData.type === 2
                          ? `${couponData.value}%`
                          : `￥${(couponData.value / 100).toFixed(2)}`}
                      </Badge>
                    </div>
                    <span className="text-sm text-green-600 font-medium">
                      -￥{(price - couponDiscount).toFixed(2)}
                    </span>
                  </div>
                  <Separator className="my-2" />
                </>
              )}

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">订阅金额</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">
                    ￥{couponDiscount.toFixed(2)}
                  </span>
                  {couponData && (
                    <Badge variant="outline" className="text-xs">
                      已优惠
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="mt-2 sm:mt-0"
              variant="outline"
              disabled={isLoading}
            >
              取消
            </Button>
          </DialogClose>
          <Button onClick={clickOrder} disabled={isLoading}>
            提交
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
