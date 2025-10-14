import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, CreditCard } from "lucide-react";
import QRCode from "react-qr-code";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { AntDesignAlipayCircleFilled } from "@/views/svg/payment";
import { ScanQrCode } from "lucide-react";
import { toast } from "sonner";
import {
  paymentDetailGet,
  orderCheckGet,
  orderCheckoutPost,
} from "@/api/v1/payment";
export function Qrcode({ selectedPayment, id }: any) {
  const { t } = useTranslation();
  const { data, mutate } = paymentDetailGet(id);
  const { data: orderData } = orderCheckGet(id);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [isDialogLoading, setIsDialogLoading] = useState(false);

  // 监听 orderData.data 的变化，当不等于 0 时触发 mutate
  useEffect(() => {
    if (orderData?.data.data != 0) {
      mutate();
    }
  }, [orderData?.data]);

  const clickPayment = async () => {
    try {
      setIsLoading(true);
      const result = await orderCheckoutPost(id, selectedPayment);

      if (result?.data.data != true) {
        setPaymentData(result);
        setIsDialogLoading(true);
      } else {
        await mutate();
      }
    } catch (error: any) {
      toast.error(error.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={isDialogLoading}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full"
          disabled={isLoading}
          onClick={clickPayment}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" /> Please wait
            </>
          ) : (
            <>
              <CreditCard />
              {t("付款")}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <AntDesignAlipayCircleFilled className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold">
                {t("Lightning Payment")}
              </h3>
            </div>
            <ScanQrCode className="w-8 h-8 text-muted-foreground" />
          </DialogTitle>

          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-semibold">
            ¥{(data?.data.data.total_amount / 100).toFixed(2)}
          </p>
          <p className="text-muted-foreground">
            {t("Please scan the QR code to complete your lightning payment.")}
          </p>
          <div className="bg-muted p-4 rounded-md">
            {/* <img
            src="/placeholder.svg"
            width="150"
            height="150"
            alt="QR Code"
            style={{ aspectRatio: "150/150", objectFit: "cover" }}
          /> */}
            {paymentData?.data.data ? (
              <QRCode
                size={150}
                value={paymentData.data.data}
                fgColor="hsl(var(--foreground))"
                bgColor="hsl(var(--muted))"
              />
            ) : null}
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsDialogLoading(false)}
          >
            {t("关闭")}
          </Button>
          <Button className="w-full" onClick={() => setIsDialogLoading(false)}>
            {t("已完成")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
