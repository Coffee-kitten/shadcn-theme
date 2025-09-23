import {
  useEffect,
  useV2boardUserData,
  paymentMethodGet,
  paymentDetailGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/payment/card1";
import { Card4 } from "@/views/home/widgets/payment/card4";
import { Loading } from "@/views/home/widgets/payment/Loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
// Create a client
import { CreditCard } from "lucide-react";
export function Payment() {
  const { id } = useParams();
  const { t } = useTranslation();
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: paymentMethodGet,
      setDataFn: store.setPaymentMethodData,
    },
    {
      fetchFn: () => paymentDetailGet(id),
      setDataFn: store.setPaymentDetailData,
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      {/* <Skeleton className="h-[125px] w-[250px] rounded-xl" /> */}
      <Head
        badge={t("订单详细")}
        IconComponent={CreditCard}
        footer={t("订单详细")}
      />
      {store.paymentDetailData?.data?.status == 0 ? <Card1 /> : <Card4 />}
    </PageContainer>
  );
}
