import {
  useEffect,
  useV2boardUserData,
  noticeFetchGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card2 } from "@/views/home/widgets/announcements/card1";
import { Loading } from "@/views/home/widgets/announcements/loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
export function Announcements() {
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: noticeFetchGet,
      setDataFn: (data) => store.setNoticeFetchData(data),
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge="报告" />
      <Card2 />
    </PageContainer>
  );
}
