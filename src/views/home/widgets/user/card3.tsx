import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useUserUpdatePost } from "@/api/v1/user";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "react-i18next";
import { infoGet } from "@/api/v1/base";
export const Card3 = () => {
  const { t } = useTranslation();
  const [loadingTraffic, setLoadingTraffic] = useState(false);
  const [loadingExpire, setLoadingExpire] = useState(false);
  const { data, mutate } = infoGet();
  const { userUpdatePost } = useUserUpdatePost();
  const handleChange = async (
    key: "remind_traffic" | "remind_expire",
    value: number
  ) => {
    const setLoading =
      key == "remind_traffic" ? setLoadingTraffic : setLoadingExpire;

    setLoading(true);
    await userUpdatePost(key, value);

    await mutate();

    setLoading(false);
  };
  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle>{t("通知偏好")}</CardTitle>
        <CardDescription>{t("配置系统邮件提醒偏好")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="bg-muted/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t("到期邮件提醒")}</CardTitle>
              <Switch
                checked={data?.data.data.remind_expire}
                disabled={loadingExpire}
                onCheckedChange={(checked) =>
                  handleChange("remind_expire", checked ? 1 : 0)
                }
              />
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-muted/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>{t("流量邮件提醒")}</CardTitle>
              <Switch
                checked={data?.data.data.remind_traffic}
                disabled={loadingTraffic}
                onCheckedChange={(checked) =>
                  handleChange("remind_traffic", checked ? 1 : 0)
                }
              />
            </div>
          </CardHeader>
        </Card>
      </CardContent>
    </Card>
  );
};
