import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const buttonData = [
  { icon: "copy", label: "复制" },
  { icon: "qrcode", label: "二维码" },
  { icon: "clash", label: "Clash 订阅" },
  { icon: "surge", label: "Surge 订阅" },
  { icon: "shadowrocket", label: "Shadowrocket 订阅" },
];
export function Card4() {
  return (
    <Card className="bg-muted/50 border-0">
      <CardHeader>
        <CardTitle>快捷订阅</CardTitle>
        <CardDescription>点击下方跳转</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-5">
          {buttonData.map(({ icon, label }, index) => (
            <Button key={index} className="rounded-full">
              <i
                className={`font-[metron] metron-${icon} text-[1.3rem] antialiased not-italic font-normal`}
              />
              {label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
