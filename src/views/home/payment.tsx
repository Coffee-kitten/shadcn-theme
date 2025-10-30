import { PageContainer, Head } from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/payment/card1";
import { Card4 } from "@/views/home/widgets/payment/card4";
import { Card5 } from "@/views/home/widgets/payment/card5";
import { Loading } from "@/views/home/widgets/payment/Loading";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
// Create a client
import { CreditCard } from "lucide-react";
import { paymentMethodGet, paymentDetailGet } from "@/api/v1/payment";
export default function Payment() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { isLoading } = paymentDetailGet(id);
  const { isLoading: loadingPaymentMethod } = paymentMethodGet();
  return (
    <PageContainer
      loading={isLoading || loadingPaymentMethod}
      LoadingComponent={Loading}
    >
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      {/* <Skeleton className="h-[125px] w-[250px] rounded-xl" /> */}
      <Head badge={t("订单详细")} IconComponent={CreditCard} />
      <Card1 id={id} />
    </PageContainer>
  );
}
