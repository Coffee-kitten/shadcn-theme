import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { subscribeGet } from "@/api/v1/base";
export function Qrcode() {
  const { t } = useTranslation();
  const { data } = subscribeGet();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <i
            className={`font-[metron] metron-qrcode text-[1.3rem] antialiased not-italic font-normal`}
          />
          {t("二维码")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("二维码")}</DialogTitle>
          <DialogDescription>
            {t("使用支持扫码的客户端进行订阅")}
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 bg-primary rounded-md mx-auto my-4">
          <QRCode
            size={128}
            value={data?.data.data.subscribe_url}
            fgColor="hsl(var(--background))"
            bgColor="hsl(var(--primary))"
          />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
