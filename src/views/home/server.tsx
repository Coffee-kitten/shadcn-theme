import {
  useEffect,
  toast,
  useTranslation,
  useV2boardUserData,
  serverFetchGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/server/card1";
import { Card2 } from "@/views/home/widgets/server/card2";
import { Loading } from "@/views/home/widgets/server/loading";

export function Server() {
  const store = useV2boardUserData();
  const { t } = useTranslation();
  const isLoading = !store.serverFetchData.data;
  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setServerFetchData((await serverFetchGet()).data);
      } catch {
        toast({
          variant: "destructive",
          title: t("请求失败"),
          description: t("遇到了一些问题"),
        });
      }
    };

    fetchData();
  }, []);
  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading}>
      <Head badge="节点状态" />
      <Card2 />
      <Card1 />
    </PageContainer>
  );
}
