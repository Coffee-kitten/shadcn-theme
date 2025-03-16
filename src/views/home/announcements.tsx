import {
  useEffect,
  toast,
  useTranslation,
  useV2boardUserData,
  noticeFetchGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card2 } from "@/views/home/widgets/announcements/card1";
import { Loading } from "@/views/home/widgets/announcements/loading";

export function Announcements() {
  const store = useV2boardUserData();
  const { t } = useTranslation();
  const isLoading = !store.noticeFetchData.data;
  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setNoticeFetchData((await noticeFetchGet()).data);
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
      <Head badge="公告" />
      <Card2 />
    </PageContainer>
  );
}
