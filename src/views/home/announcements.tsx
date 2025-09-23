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
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";

export function Announcements() {
  const { t } = useTranslation();
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
      <Head badge={t("报告")} footer={t("报告列表")} IconComponent={FileText} />
      <Card1 />
    </PageContainer>
  );
}
