import { PageContainer, Head, useTranslation } from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/server/card1";
import { Card2 } from "@/views/home/widgets/server/card2";
import { Loading } from "@/views/home/widgets/server/loading";
import { Server } from "lucide-react";
import { serverFetchGet } from "@/api/v1/server";
export function ServerPage() {
  const { t } = useTranslation();
  const { isLoading } = serverFetchGet();
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge={t("节点状态")} IconComponent={Server} />
      <Card2 />
      <Card1 />
    </PageContainer>
  );
}
