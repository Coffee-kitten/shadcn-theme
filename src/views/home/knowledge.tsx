import { PageContainer, Head } from "@/utils/common-imports";
import { Card2 } from "@/views/home/widgets/knowledge/card2";
import { Loading1 } from "@/views/home/widgets/knowledge/loading";
import { useTranslation } from "react-i18next";
import { Map } from "lucide-react";
import { knowledgeFetchGet } from "@/api/v1/knowledge";
export default function Knowledge() {
  const { t } = useTranslation();
  const { isLoading } = knowledgeFetchGet();
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading1}>
      <Head badge={t("知识库")} IconComponent={Map} />
      <Card2 />
    </PageContainer>
  );
}
