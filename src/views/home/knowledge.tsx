import {
  useEffect,
  toast,
  useTranslation,
  useV2boardUserData,
  subscribeGet,
  trafficLogGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { knowledgeFetchGet } from "@/api/knowledge";
import { Card2 } from "@/views/home/widgets/knowledge/card2";
import { Loading1 } from "@/views/home/widgets/knowledge/loading";

export function Knowledge() {
  const store = useV2boardUserData();
  const { t } = useTranslation();
  const isLoading =
    !store.subscribeData.data ||
    !store.trafficLogData.data ||
    !store.knowledgeFetchData.data;
  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setSubscribeData((await subscribeGet()).data);
        store.setTrafficLogData((await trafficLogGet()).data);
        store.setKnowledgeFetchData((await knowledgeFetchGet()).data);
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
    <PageContainer loading={isLoading} LoadingComponent={Loading1}>
      <Head badge="知识库" />
      <Card2 />
    </PageContainer>
  );
}
