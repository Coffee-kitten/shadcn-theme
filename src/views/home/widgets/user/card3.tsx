import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useState,
  useV2boardUserData,
  useFetchData,
  useFetchMultipleData,
  userUpdatePost,
  infoGet,
} from "@/utils/common-imports";
import { Switch } from "@/components/ui/switch";

export const Card3 = () => {
  const store = useV2boardUserData();
  const fetchData = useFetchData();
  const [loadingTraffic, setLoadingTraffic] = useState(false);
  const [loadingExpire, setLoadingExpire] = useState(false);

  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: infoGet,
      setDataFn: store.setInfoData,
    },
  ]);

  const handleChange = async (
    key: "remind_traffic" | "remind_expire",
    value: number
  ) => {
    const setLoading =
      key == "remind_traffic" ? setLoadingTraffic : setLoadingExpire;

    setLoading(true);
    await fetchData(() => userUpdatePost(key, value));
    await fetchAllData();
    setLoading(false);
  };
  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle>通知偏好</CardTitle>
        <CardDescription>配置系统邮件提醒偏好</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="bg-muted/30">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>到期邮件提醒</CardTitle>
              <Switch
                checked={store.infoData.data.remind_expire}
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
              <CardTitle>流量邮件提醒</CardTitle>
              <Switch
                checked={store.infoData.data.remind_traffic}
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
