import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Qrcode } from "@/views/home/widgets/dashboard/qrcode";
import { useClipboard } from "@/utils/copy";
import { redirectToUrl } from "@/utils/url";
import { useTranslation } from "react-i18next";
import { useV2boardUserData } from "@/store/index";
import { Settings } from "lucide-react";

const iconClasses =
  "font-[metron] text-[1.3rem] antialiased not-italic font-normal";
export function Card4() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  const { copyToClipboard } = useClipboard();
  const buttonData = [
    {
      icon: "clash",
      label: "ClashMeta",
      url:
        "clash://install-config?url=" +
        encodeURIComponent(
          store.subscribeData.data.subscribe_url + "&flag=clashmeta"
        ) +
        "&name=" +
        import.meta.env.VITE_APP_NAME,
    },
    {
      icon: "shadowrocket",
      label: "Shadowrocket",
      url:
        "shadowrocket://add/sub://" +
        window.btoa(store.subscribeData.data.subscribe_url),
    },
  ];
  return (
    <Card className="bg-muted/50 relative">
      <Settings className="absolute top-4 right-4 h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
      <CardHeader>
        <CardTitle>{t("快捷订阅")}</CardTitle>
        <CardDescription>{t("不确定如何使用？请查看知识库")}</CardDescription>
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
            {t("复制")}
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
