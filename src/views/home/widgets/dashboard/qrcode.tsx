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
import { useV2boardUserData } from "@/store/index";
export function Qrcode() {
  const store = useV2boardUserData();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <i
            className={`font-[metron] metron-qrcode text-[1.3rem] antialiased not-italic font-normal`}
          />
          二维码
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>二维码</DialogTitle>
          <DialogDescription>使用支持扫码的客户端进行订阅</DialogDescription>
        </DialogHeader>
        <div className="p-4 bg-primary rounded-md mx-auto my-4">
          <QRCode
            size={128}
            value={store.subscribeData.data.subscribe_url}
            fgColor="hsl(var(--background))"
            bgColor="hsl(var(--primary))"
          />
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
