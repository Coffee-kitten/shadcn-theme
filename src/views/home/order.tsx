import {
  useEffect,
  toast,
  useTranslation,
  useV2boardUserData,
  orderFetchGet,
  Head,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/order/card1";
import { Loading } from "@/views/home/widgets/order/loading";

export function Order() {
  const store = useV2boardUserData();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setOrderFetchData((await orderFetchGet()).data);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: t("请求失败"),
          description: error.data.message || t("遇到了一些问题"),
        });
      }
    };

    fetchData();
  }, []);
  return store.orderFetchData.data ? (
    <div className="flex flex-1 flex-col gap-4 p-6 pt-0 max-w-[1380px] mx-auto w-full">
      <Head badge="订单管理" />
      <Card1 />
    </div>
  ) : (
    <Loading />
  );
}
