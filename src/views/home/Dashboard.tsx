import { PageContainer, Head } from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/dashboard/Card1";
import { Card2 } from "@/views/home/widgets/dashboard/Card2";
import { Card3 } from "@/views/home/widgets/dashboard/Card3";
import { Card4 } from "@/views/home/widgets/dashboard/Card4";
import { Card5 } from "@/views/home/widgets/dashboard/Card5";
import { ExpiredAt, BuyPlan } from "@/views/home/widgets/dashboard/Plan";
import { Loading } from "@/views/home/widgets/dashboard/Loading";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Frame } from "lucide-react";
import { trafficLogGet, announcementsFetchGet } from "@/api/v1/dashboard";
import { subscribeGet } from "@/api/v1/base";
export default function Dashboard() {
  const { t } = useTranslation();
  const { isLoading: trafficLogLoading } = trafficLogGet();
  const { isLoading: noticeLoading } = announcementsFetchGet();
  const { data, isLoading: subscribeLoading } = subscribeGet();
  // const { fetchAllData, isLoading } = useFetchMultipleData([
  //   {
  //     fetchFn: trafficLogGet,
  //     setDataFn: store.setTrafficLogData,
  //   },
  //   {
  //     fetchFn: announcementsFetchGet,
  //     setDataFn: store.setNoticeFetchData,
  //   },
  //   {
  //     fetchFn: subscribeGet,
  //     setDataFn: store.setSubscribeData,
  //   },
  // ]);

  // 根据订阅状态选择加载组件
  // const getLoadingComponent = () => {
  //   if (dayjs().isAfter(dayjs.unix(data?.data.data.expired_at))) {
  //     return Loading2;
  //   }
  //   return Loading;
  // };

  // useEffect(() => {
  //   fetchAllData();
  // }, []);
  return (
    <PageContainer
      loading={trafficLogLoading || noticeLoading || subscribeLoading}
      LoadingComponent={Loading}
    >
      <Head badge={t("仪表盘")} IconComponent={Frame} />

      {data?.data.data.plan ? (
        dayjs().isAfter(dayjs.unix(data?.data.data.expired_at)) &&
        data?.data.data.expired_at ? (
          <ExpiredAt
            expiredAt={dayjs
              .unix(data?.data.data.expired_at)
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
