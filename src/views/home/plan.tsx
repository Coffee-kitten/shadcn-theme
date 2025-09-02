import {
  useEffect,
  toast,
  useTranslation,
  planFetchGet,
  useV2boardUserData,
  PageContainer,
  Head,
} from "@/utils/common-imports";

import { Loading } from "@/views/home/widgets/plan/Loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
import { Card1 } from "@/views/home/widgets/plan/card1";
import { Card2 } from "@/views/home/widgets/plan/card2";

export function Plan() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: planFetchGet,
      setDataFn: store.setPlanFetchData,
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge={t("订阅")} />
      <Card1 />
    </PageContainer>
  );
}
