import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  orderCheckoutPost,
  orderCheckGet,
  paymentDetailGet,
} from "@/api/payment";
import { useV2boardUserData } from "@/store/index";
import { CreditCard } from "lucide-react";
import { AntDesignAlipayCircleFilled } from "@/views/svg/payment";
import { useEffect, useState } from "react";
import { Qrcode } from "@/views/home/widgets/payment/qrcode";
import { useFetchData } from "@/hooks/use-fetch-data";
import { Card2 } from "@/views/home/widgets/payment/card2";
import { Card3 } from "@/views/home/widgets/payment/card3";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
import { subscribeGet } from "@/api/dashboard";
export function Card1() {
  const store = useV2boardUserData();
  const [selectedPayment, setSelectedPayment] = useState(
    store.paymentMethodData.data[0]?.id
  );

  const [isDialogLoading, setDialogIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);

  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useFetchData();
  const { fetchAllData } = useFetchMultipleData([
    {
      fetchFn: () => paymentDetailGet(store.paymentDetailData.data.trade_no),
      setDataFn: store.setPaymentDetailData,
    },
    {
      fetchFn: subscribeGet,
      setDataFn: store.setSubscribeData,
    },
  ]);
  const [shouldPoll, setShouldPoll] = useState(true);

  useEffect(() => {
    if (!shouldPoll) return;

    const intervalId = setInterval(async () => {
      if (!shouldPoll) return;

      const result = await fetchData(() =>
        orderCheckGet(store.paymentDetailData.data.trade_no)
      );

      if (result?.data !== 0) {
        await fetchAllData();
        setShouldPoll(false);
        return;
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [shouldPoll]);

  const getPaymentIcon = (name: string) => {
    if (name.toLowerCase().includes("alipay")) {
      return <AntDesignAlipayCircleFilled className="mb-3 h-6 w-6" />;
    }
    return <CreditCard className="mb-3 h-6 w-6" />;
  };

  const clickPayment = async () => {
    setIsLoading(true);
    const result = await fetchData(() =>
      orderCheckoutPost(store.paymentDetailData.data.trade_no, selectedPayment)
    );
    if (result?.data != true) {
      setPaymentData(result);
      setDialogIsLoading(true);
    } else {
      await fetchAllData();
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
