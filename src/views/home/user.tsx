import {
  useEffect,
  useV2boardUserData,
  userNoticeFetchGet,
  PageContainer,
  Head,
  infoGet,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/user/card1";
import { Card2 } from "@/views/home/widgets/user/card2";
import { Card3 } from "@/views/home/widgets/user/card3";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
export function User() {
  const store = useV2boardUserData();
  const { fetchAllData } = useFetchMultipleData([
    {
      fetchFn: infoGet,
      setDataFn: store.setInfoData,
    },
  ]);
  return (
    <PageContainer>
      <Head badge="用户中心" />
      <Card1 />
      <Card2 fetchAllData={fetchAllData} />
      <Card3 />
    </PageContainer>
  );
}
