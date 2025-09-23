import {
  useEffect,
  useV2boardUserData,
  PageContainer,
  Head,
  inviteDetailsGet,
  inviteFetchGet,
  useFetchMultipleData,
  commConfigGet,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/invte/card1";
import { Card2 } from "@/views/home/widgets/invte/card2";
import { Loading } from "@/views/home/widgets/invte/Loading";
import { useTranslation } from "react-i18next";
import { Users } from "lucide-react";

export function InvitePage() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: inviteFetchGet,
      setDataFn: store.setInviteFetchData,
    },
    {
      fetchFn: inviteDetailsGet,
      setDataFn: store.setInviteDetailsData,
    },
    {
      fetchFn: commConfigGet,
      setDataFn: store.setConfigData,
    },
  ]);

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head
        badge={t("我的邀请")}
        footer={t("邀请概览")}
        IconComponent={Users}
      />
      <Card1 />
      <Card2 />
    </PageContainer>
  );
}
