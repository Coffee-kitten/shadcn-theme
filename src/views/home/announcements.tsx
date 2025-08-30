import {
  useEffect,
  useV2boardUserData,
  announcementsFetchGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/announcements/Card1";
import { Loading } from "@/views/home/widgets/announcements/loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
export function Announcements() {
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: announcementsFetchGet,
      setDataFn: store.setNoticeFetchData,
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge="报告" />
      <Card1 />
    </PageContainer>
  );
}
