import { Head, PageContainer } from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/order/card1";
import { Loading } from "@/views/home/widgets/order/loading";

import { useTranslation } from "react-i18next";
import { Receipt } from "lucide-react";
import { orderFetchGet } from "@/api/v1/order";
export function Order() {
  const { t } = useTranslation();

  const { isLoading } = orderFetchGet();

  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge={t("我的订单")} IconComponent={Receipt} />
      <Card1 />
    </PageContainer>
  );
}
