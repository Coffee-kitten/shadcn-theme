import { useState, PageContainer, Head } from "@/utils/common-imports";
import { Card1 } from "@/views/home/widgets/ticket/Card1";
import { Card2 } from "@/views/home/widgets/ticket/Card2";
import { Loading1 } from "@/views/home/widgets/ticket/Loading1";

import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";
import { ticketFetchGet } from "@/api/v1/ticket";
export default function TicketPage() {
  const { t } = useTranslation();
  const { isLoading } = ticketFetchGet();
  const [currentView, setCurrentView] = useState<"list" | "detail">("list");

  return (
    <PageContainer loading={isLoading} LoadingComponent={Loading1}>
      <Head badge={t("我的工单")} IconComponent={MessageCircle} />
      {currentView === "list" && <Card1 />}
      <Card2 currentView={currentView} setCurrentView={setCurrentView} />
    </PageContainer>
  );
}
