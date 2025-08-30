import { useState } from "react";
import { useV2boardUserData } from "@/store";
import { ticketFetchIdGet, ticketClosePost } from "@/api/ticket";
import { TicketList } from "./TicketList";
import { TicketDetail } from "./TicketDetail";
import { toast } from "sonner";
export function Card2({ currentView, setCurrentView, onTicketCreated }: any) {
  const store = useV2boardUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [ticketMessages, setTicketMessages] = useState<any>(null);
  const [shouldPoll, setShouldPoll] = useState(false);
  // 获取真实的工单数据
  const handleTicketClick = async (ticket: any) => {
    try {
      setCurrentView("detail");
      setTicketMessages((await ticketFetchIdGet(ticket)).data.data);
      setShouldPoll(true);
    } catch (error) {
      console.error("获取工单详情失败:", error);
    }
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setTicketMessages(null);
    setShouldPoll(false);
    onTicketCreated();
  };

  const handleCloseTicket = async (ticketId: number) => {
    try {
      setIsLoading(true);
      await ticketClosePost(ticketId);
      setShouldPoll(false);
    } catch (error) {
      toast.error("工单关闭失败，请重试");
    } finally {
      setTicketMessages((await ticketFetchIdGet(ticketId)).data.data);
      setIsLoading(false);
    }
  };

  return currentView == "detail" ? (
    <TicketDetail
      setTicketMessages={setTicketMessages}
      ticketMessages={ticketMessages}
      isLoading={isLoading}
      onCloseTicket={handleCloseTicket}
      onBack={handleBackToList}
      shouldPoll={shouldPoll}
    />
  ) : (
    <TicketList
      tickets={store.ticketFetchData?.data}
      onTicketClick={handleTicketClick}
    />
  );
}
