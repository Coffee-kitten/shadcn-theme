import { PageContainer, Head } from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/invte/card1";
import { Card2 } from "@/views/home/widgets/invte/card2";
import { Loading } from "@/views/home/widgets/invte/Loading";
import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";
import {
  inviteFetchGet,
  inviteDetailsGet,
  commConfigGet,
} from "@/api/v1/invite";
export function InvitePage() {
  const { t } = useTranslation();
  const { isLoading } = inviteFetchGet();
  const { isLoading: isLoadingDetails } = inviteDetailsGet();
  const { isLoading: isLoadingConfig } = commConfigGet();

  return (
    <PageContainer
      loading={isLoading || isLoadingDetails || isLoadingConfig}
      LoadingComponent={Loading}
    >
      <Head badge={t("我的邀请")} IconComponent={Users} />
      <Card1 />
      <Card2 />
    </PageContainer>
  );
}
