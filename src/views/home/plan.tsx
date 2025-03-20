import {
  useEffect,
  toast,
  useTranslation,
  planFetchGet,
  useV2boardUserData,
  PageContainer,
  Head,
} from "@/utils/common-imports";

import { Loading } from "@/views/home/widgets/announcements/loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
import { Card1 } from "@/views/home/widgets/plan/card1";

export function Plan() {
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: planFetchGet,
      setDataFn: (data) => store.setPlanFetchData(data),
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge="订阅" />
      <Card1 />
    </PageContainer>
  );
}
