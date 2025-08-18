import {
  useEffect,
  useV2boardUserData,
  trafficLogGet,
  subscribeGet,
  announcementsFetchGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/dashboard/Card1";
import { Card2 } from "@/views/home/widgets/dashboard/Card2";
import { Card3 } from "@/views/home/widgets/dashboard/Card3";
import { Card4 } from "@/views/home/widgets/dashboard/Card4";
import { Card5 } from "@/views/home/widgets/dashboard/Card5";

import { Loading } from "@/views/home/widgets/dashboard/Loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";

export function Dashboard() {
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: trafficLogGet,
      setDataFn: (data) => store.setTrafficLogData(data),
    },
    {
      fetchFn: subscribeGet,
      setDataFn: (data) => store.setSubscribeData(data),
    },
    {
      fetchFn: announcementsFetchGet,
      setDataFn: (data) => store.setNoticeFetchData(data),
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge="仪表盘" isShow={true} />

      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      {/* <Skeleton className="h-[125px] w-[250px] rounded-xl" /> */}
      {/* 公告卡片 - 全宽显示 */}
      <Card1 />

      {/* 仪表盘卡片网格 */}
      <div className="grid auto-rows-min gap-4 2xl:grid-cols-3">
        <Card2 />
        <Card3 />
        <Card4 />
      </div>
      <Card5 />
    </PageContainer>
  );
}
