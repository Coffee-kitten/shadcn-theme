import { PageContainer, Head } from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/announcements/Card1";
import { Loading } from "@/views/home/widgets/announcements/loading";
import { useTranslation } from "react-i18next";
import { ClipboardList } from "lucide-react";
import { announcementsFetchGet } from "@/api/v1/dashboard";
export default function Announcements() {
  const { t } = useTranslation();
  const { isLoading } = announcementsFetchGet();
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge={t("报告")} IconComponent={ClipboardList} />
      <Card1 />
    </PageContainer>
  );
}
