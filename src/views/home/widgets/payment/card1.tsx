import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard } from "lucide-react";
import { AntDesignAlipayCircleFilled } from "@/views/svg/payment";
import { useState } from "react";
import { Qrcode } from "@/views/home/widgets/payment/qrcode";

import { Card2 } from "@/views/home/widgets/payment/card2";
import { Card3 } from "@/views/home/widgets/payment/card3";

import { useTranslation } from "react-i18next";
import { paymentMethodGet } from "@/api/v1/payment";
export function Card1({ id }: any) {
  const { t } = useTranslation();

  const { data: paymentMethodData } = paymentMethodGet();

  const [selectedPayment, setSelectedPayment] = useState(
    paymentMethodData?.data.data[0]?.id
  );

  // const { fetchAllData } = useFetchMultipleData([
  //   {
  //     fetchFn: () => paymentDetailGet(store.paymentDetailData.data.trade_no),
  //     setDataFn: store.setPaymentDetailData,
  //   },
  //   {
  //     fetchFn: subscribeGet,
  //     setDataFn: store.setSubscribeData,
  //   },
  // ]);
  // const [shouldPoll, setShouldPoll] = useState(true);

  // useEffect(() => {
  //   if (!shouldPoll) return;

  //   const intervalId = setInterval(async () => {
  //     if (!shouldPoll) return;

  //     const result = await fetchData(() =>
  //       orderCheckGet(store.paymentDetailData.data.trade_no)
  //     );

  //     if (result?.data !== 0) {
  //       await fetchAllData();
  //       setShouldPoll(false);
  //       return;
  //     }
  //   }, 5000);

  //   return () => clearInterval(intervalId);
  // }, [shouldPoll]);

  const getPaymentIcon = (name: string) => {
    if (name.toLowerCase().includes("alipay")) {
      return <AntDesignAlipayCircleFilled className="mb-3 h-6 w-6" />;
    }
    return <CreditCard className="mb-3 h-6 w-6" />;
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="grid gap-6">
        <Card3 id={id} />
        <Card>
          <CardHeader>
            <CardTitle>{t("Payment Options")}</CardTitle>
            <CardDescription>
              {t("Select your preferred payment method")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              defaultValue={paymentMethodData?.data.data[0]?.id}
              className="grid gap-4"
              onValueChange={setSelectedPayment}
            >
              {paymentMethodData?.data.data.map((method: any) => (
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
        <Card2 id={id} />
        <Qrcode selectedPayment={selectedPayment} id={id} />
      </div>
    </div>
  );
}
