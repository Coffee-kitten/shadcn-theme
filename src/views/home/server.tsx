import {
  useEffect,
  useV2boardUserData,
  serverFetchGet,
  PageContainer,
  Head,
  useTranslation,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/server/card1";
import { Card2 } from "@/views/home/widgets/server/card2";
import { Loading } from "@/views/home/widgets/server/loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
export function Server() {
  const store = useV2boardUserData();
  const { t } = useTranslation();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: serverFetchGet,
      setDataFn: store.setServerFetchData,
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge={t("节点状态")} />
      <Card2 />
      <Card1 />
    </PageContainer>
  );
}
