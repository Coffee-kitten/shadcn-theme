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
import { useState } from "react";
import { useV2boardUserData } from "@/store/index";
import { AntDesignAlipayCircleFilled } from "@/views/svg/payment";
import { ScanQrCode } from "lucide-react";
export function Qrcode({
  clickFuc,
  isDialogLoading,
  setDialogIsLoading,
  isLoading,
  paymentData,
}: any) {
  const store = useV2boardUserData();
  return (
    <Dialog open={isDialogLoading}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full"
          disabled={isLoading}
          onClick={clickFuc}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" /> Please wait
            </>
          ) : (
            <>
              <CreditCard />
              付款
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <AntDesignAlipayCircleFilled className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold">Lightning Payment</h3>
            </div>
            <ScanQrCode className="w-8 h-8 text-muted-foreground" />
          </DialogTitle>

          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-semibold">
            ¥{(store.paymentDetailData.data.total_amount / 100).toFixed(2)}
          </p>
          <p className="text-muted-foreground">
            Please scan the QR code to complete your lightning payment.
          </p>
          <div className="bg-muted p-4 rounded-md">
            {/* <img
            src="/placeholder.svg"
            width="150"
            height="150"
            alt="QR Code"
            style={{ aspectRatio: "150/150", objectFit: "cover" }}
          /> */}
            {paymentData?.data ? (
              <QRCode
                size={150}
                value={paymentData.data}
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
            onClick={() => setDialogIsLoading(false)}
          >
            关闭
          </Button>
          <Button className="w-full" onClick={() => setDialogIsLoading(false)}>
            已完成
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
