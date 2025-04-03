import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { orderCheckoutPost, orderCheckGet } from "@/api/payment";
import { useV2boardUserData } from "@/store/index";
import { CreditCard } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AntDesignAlipayCircleFilled } from "@/views/svg/payment";
import { useState } from "react";
import { Qrcode } from "@/views/home/widgets/payment/qrcode";
import { useFetchData } from "@/hooks/use-fetch-data";
import { Card2 } from "@/views/home/widgets/payment/card2";
import { Card3 } from "@/views/home/widgets/payment/card3";
export function Card1() {
  const store = useV2boardUserData();
  const [selectedPayment, setSelectedPayment] = useState(
    store.paymentMethodData.data[0]?.id
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogLoading, setDialogIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);

  const [tradeNo, setTradeNo] = useState<string | null>(null);
  const { data, error } = useQuery({
    queryKey: ["transactions", tradeNo],
    queryFn: async () => {
      if (!tradeNo) throw new Error("tradeNo 不能为空");
      return await orderCheckGet(tradeNo);
    },
    enabled: !!tradeNo, // 只有当 tradeNo 存在时才执行查询
    refetchInterval: 5000, // 每 5 秒轮询
    staleTime: 3000, // 数据 3 秒内不会被标记为过期
    onSuccess: (data) => {
      if (data.data?.status === 1) {
        setTradeNo(null); // 如果交易成功，则清空 tradeNo
      }
    },
    onError: (error) => {
      console.error("查询失败:", error);
    },
  });

  const getPaymentIcon = (name: string) => {
    if (name.toLowerCase().includes("alipay")) {
      return <AntDesignAlipayCircleFilled className="mb-3 h-6 w-6" />;
    }
    return <CreditCard className="mb-3 h-6 w-6" />;
  };
  const fetchData = useFetchData();
  const clickPayment = async () => {
    setIsLoading(true);
    const result = await fetchData(() =>
      orderCheckoutPost(store.paymentDetailData.data.trade_no, selectedPayment)
    );
    if (result?.data) {
      setPaymentData(result);
      setDialogIsLoading(true);
    }
    setIsLoading(false);
  };
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="grid gap-6">
        <Card3 />
        <Card>
          <CardHeader>
            <CardTitle>Payment Options</CardTitle>
            <CardDescription>
              Select your preferred payment method
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              defaultValue={store.paymentMethodData.data[0]?.id}
              className="grid gap-4"
              onValueChange={setSelectedPayment}
            >
              {store.paymentMethodData.data.map((method: any) => (
                <div className="block" key={method.id}>
                  <RadioGroupItem
                    value={method.id}
                    id={`payment-${method.id}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`payment-${method.id}`}
                    className="flex flex-col items-center text-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    {getPaymentIcon(method.name)}
                    <span>{method.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6">
        <Card2 />
        <Qrcode
          clickFuc={clickPayment}
          isDialogLoading={isDialogLoading}
          setDialogIsLoading={setDialogIsLoading}
          isLoading={isLoading}
          paymentData={paymentData}
        />
      </div>
    </div>
  );
}
