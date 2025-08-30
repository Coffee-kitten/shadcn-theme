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

export function Invite() {
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
  ]);

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge="我的邀请" />
      <Card1 />
      <Card2 />
    </PageContainer>
  );
}
