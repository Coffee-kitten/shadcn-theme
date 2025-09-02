import {
  useEffect,
  useV2boardUserData,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { knowledgeFetchGet } from "@/api/knowledge";
import { Card2 } from "@/views/home/widgets/knowledge/card2";
import { Loading1 } from "@/views/home/widgets/knowledge/loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
import { useTranslation } from "react-i18next";

export function Knowledge() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: knowledgeFetchGet,
      setDataFn: (data) => store.setKnowledgeFetchData(data),
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading1}>
      <Head badge={t("知识库")} />
      <Card2 />
    </PageContainer>
  );
}
