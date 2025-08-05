import {
  useEffect,
  useV2boardUserData,
  userNoticeFetchGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/user/card1";
import { Card2 } from "@/views/home/widgets/user/card2";
import { Card3 } from "@/views/home/widgets/user/card3";
import { Loading } from "@/views/home/widgets/announcements/loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
export function User() {
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([

  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge="用户中心" />
      <Card1 />
      <Card2 />
      <Card3 />
    </PageContainer>
  );
}
