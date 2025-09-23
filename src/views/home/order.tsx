import {
  useEffect,
  useV2boardUserData,
  orderFetchGet,
  Head,
  PageContainer,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/order/card1";
import { Loading } from "@/views/home/widgets/order/loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
import { useTranslation } from "react-i18next";
import { Receipt } from "lucide-react";
export function Order() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: orderFetchGet,
      setDataFn: store.setOrderFetchData,
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head
        badge={t("我的订单")}
        IconComponent={Receipt}
        footer={t("订单列表")}
      />
      <Card1 />
    </PageContainer>
  );
}
