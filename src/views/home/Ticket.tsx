import {
  useEffect,
  useState,
  useV2boardUserData,
  ticketFetchGet,
  PageContainer,
  Head,
} from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/ticket/Card1";
import { Card2 } from "@/views/home/widgets/ticket/Card2";
import { Loading1 } from "@/views/home/widgets/ticket/Loading1";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
import { useTranslation } from "react-i18next";
import { Ticket } from "lucide-react";
export function TicketPage() {
  const { t } = useTranslation();
  const store = useV2boardUserData();
  const [currentView, setCurrentView] = useState<"list" | "detail">("list");

  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: ticketFetchGet,
      setDataFn: store.setTicketFetchData,
    },
  ]);

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading1}>
      <Head
        badge={t("我的工单")}
        footer={t("工单列表")}
        IconComponent={Ticket}
      />
      {currentView === "list" && (
        <Card1 onTicketCreated={() => fetchAllData(true)} />
      )}
      <Card2
        currentView={currentView}
        setCurrentView={setCurrentView}
        onTicketCreated={() => fetchAllData(true)}
      />
    </PageContainer>
  );
}
