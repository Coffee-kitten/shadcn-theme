import { useState } from "react";
import { useV2boardUserData } from "@/store";
import { ticketFetchIdGet } from "@/api/ticket";
import { TicketList } from "./TicketList";
import { TicketDetail } from "./TicketDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function Card2({ currentView, setCurrentView }: any) {
  const store = useV2boardUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [ticketMessages, setTicketMessages] = useState<any[]>([]);
  const [loadingTicketDetail, setLoadingTicketDetail] = useState(false);

  // 获取真实的工单数据

  const handleTicketClick = async (ticket: any) => {
    try {
      setLoadingTicketDetail(true);
      const response = await ticketFetchIdGet(ticket.id);
      if (response.data) {
        const { data: ticketData } = response;
        setSelectedTicket(ticketData.data);
        setTicketMessages(ticketData.data.message || []);
        setCurrentView("detail");
      }
    } catch (error) {
      console.error("获取工单详情失败:", error);
    } finally {
      setLoadingTicketDetail(false);
    }
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedTicket(null);
    setTicketMessages([]);
  };

  const handleCloseTicket = async (ticketId: string) => {
    try {
      setIsLoading(true);
      console.log("Closing ticket:", ticketId);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Failed to close ticket:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return currentView == "detail" && selectedTicket ? (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBackToList}
          className="h-8 px-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">工单详情</h2>
      </div>
      <TicketDetail
        open={true}
        onOpenChange={() => {}}
        selectedTicket={selectedTicket}
        ticketMessages={ticketMessages}
        loadingTicketDetail={loadingTicketDetail}
        isLoading={isLoading}
        onCloseTicket={handleCloseTicket}
        isTabView={true}
        onBack={handleBackToList}
      />
    </div>
  ) : (
    <TicketList
      tickets={store.ticketFetchData?.data}
      onTicketClick={handleTicketClick}
    />
  );
}
