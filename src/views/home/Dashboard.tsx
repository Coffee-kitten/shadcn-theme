import {
  useEffect,
  useV2boardUserData,
  trafficLogGet,
  announcementsFetchGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/dashboard/Card1";
import { Card2 } from "@/views/home/widgets/dashboard/Card2";
import { Card3 } from "@/views/home/widgets/dashboard/Card3";
import { Card4 } from "@/views/home/widgets/dashboard/Card4";
import { Card5 } from "@/views/home/widgets/dashboard/Card5";
import { ExpiredAt, BuyPlan } from "@/views/home/widgets/dashboard/Plan";
import { Loading, Loading2 } from "@/views/home/widgets/dashboard/Loading";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
import dayjs from "dayjs";

export function Dashboard() {
  const store = useV2boardUserData();
  console.log(dayjs().unix());
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: trafficLogGet,
      setDataFn: store.setTrafficLogData,
    },
    {
      fetchFn: announcementsFetchGet,
      setDataFn: store.setNoticeFetchData,
    },
  ]);

  // 根据订阅状态选择加载组件
  const getLoadingComponent = () => {
    if (dayjs().isAfter(dayjs.unix(store.subscribeData.data.expired_at))) {
      return Loading2;
    }
    return Loading;
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={getLoadingComponent()}>
      <Head badge="仪表盘" isShow={true} />
      {store.subscribeData.data.plan ? (
        dayjs().isAfter(dayjs.unix(store.subscribeData.data.expired_at)) ? (
          <ExpiredAt
            expiredAt={dayjs
              .unix(store.subscribeData.data.expired_at)
              .format("YYYY-MM-DD HH:mm")}
          />
        ) : (
          <>
            <Card1 />
            {/* 仪表盘卡片网格 */}
            <div className="grid auto-rows-min gap-4 2xl:grid-cols-3">
              <Card2 />
              <Card3 />
              <Card4 />
            </div>
            <Card5 />
          </>
        )
      ) : (
        <BuyPlan />
      )}
    </PageContainer>
  );
}
