import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Qrcode } from "@/views/home/widgets/dashboard/qrcode";
import { copyToClipboard } from "@/utils/copy";
import { redirectToUrl } from "@/utils/url";

import { useV2boardUserData } from "@/store/index";

const iconClasses =
  "font-[metron] text-[1.3rem] antialiased not-italic font-normal";
export function Card4() {
  const store = useV2boardUserData();
  const buttonData = [
    {
      icon: "clash",
      label: "Clash 订阅",
      url:
        "clash://install-config?url=" +
        encodeURIComponent(store.subscribeData.data.subscribe_url),
    },
    {
      icon: "surge",
      label: "Surge 订阅",
      url:
        "surge:///install-config?url=" +
        encodeURIComponent(store.subscribeData.data.subscribe_url),
    },
    {
      icon: "shadowrocket",
      label: "Shadowrocket 订阅",
      url:
        "shadowrocket://add/sub://" +
        window.btoa(store.subscribeData.data.subscribe_url),
    },
  ];
  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle>快捷订阅</CardTitle>
        <CardDescription>不会使用请查阅使用教程</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-5">
          <Button
            className="rounded-full"
            onClick={() =>
              copyToClipboard(store.subscribeData.data.subscribe_url)
            }
          >
            <i className={`${iconClasses} metron-copy`} />
            复制
          </Button>
          <Qrcode />

          {buttonData.map(({ icon, label, url }, index) => (
            <Button
              key={index}
              className="rounded-full"
              onClick={() => redirectToUrl(url)}
            >
              <i className={`${iconClasses} metron-${icon}`} />
              {label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
