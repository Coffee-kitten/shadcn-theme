import { useTranslation, PageContainer, Head } from "@/utils/common-imports";

import { Loading } from "@/views/home/widgets/plan/Loading";
import { Card1 } from "@/views/home/widgets/plan/card1";
import { ShoppingCart } from "lucide-react";
import { planFetchGet } from "@/api/v1/plan";
export function Plan() {
  const { t } = useTranslation();
  const { isLoading } = planFetchGet();
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge={t("购买订阅")} IconComponent={ShoppingCart} />
      <Card1 />
    </PageContainer>
  );
}
