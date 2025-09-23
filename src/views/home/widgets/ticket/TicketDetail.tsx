import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import dayjs from "dayjs";
import { getTicketStatus, getPriorityText, TicketInfoRow } from "./utils";
import { Loading2 } from "./Loading2";
import { useState, useEffect } from "react";
import { ticketReplyPost, ticketFetchIdGet } from "@/api/ticket";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function TicketDetail({
  setTicketMessages,
  ticketMessages,
  isLoading,
  onCloseTicket,
  onBack,
  shouldPoll,
}: any) {
  const { t } = useTranslation();
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplyLoading, setIsReplyLoading] = useState(false);

  useEffect(() => {
    if (!shouldPoll) return;

    const intervalId = setInterval(async () => {
      const response = await ticketFetchIdGet(ticketMessages.id);
      setTicketMessages(response.data.data);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [shouldPoll]);

  if (!ticketMessages) return <Loading2 />;
  const statusInfo =
    ticketMessages.status == 1
      ? { ...getTicketStatus(2, t), text: t("已完成") }
      : getTicketStatus(ticketMessages.reply_status, t);
  const handleReply = async () => {
    try {
      setIsReplyLoading(true);
      await ticketReplyPost(ticketMessages.id, replyMessage);
      setTicketMessages((await ticketFetchIdGet(ticketMessages.id)).data.data);
    } catch (error: any) {
      toast.error(error?.data?.message);
    } finally {
      setIsReplyLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="px-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">{t("工单详情")}</h2>
      </div>
      <div className="bg-card border rounded-lg p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            #{ticketMessages.id}
          </h2>
          <p className="text-sm text-muted-foreground">
            {ticketMessages.subject}
          </p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border-l-4 border-l-primary/60">
          {statusInfo.icon("h-5 w-5")}
          <div>
            <div className={`text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.text}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {t("工单编号")}: {ticketMessages.id}
            </div>
          </div>
        </div>

        <Separator />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TicketInfoRow
            label={t("优先级")}
            value={getPriorityText(ticketMessages.level, t).text}
          />
          <TicketInfoRow
            label={t("创建时间")}
            value={dayjs
              .unix(ticketMessages.created_at)
              .format("YYYY-MM-DD HH:mm")}
          />
          <TicketInfoRow
            label={t("更新时间")}
            value={dayjs
              .unix(ticketMessages.updated_at)
              .format("YYYY-MM-DD HH:mm")}
          />
        </div>
        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">
            {t("消息记录")}
          </div>
          <ScrollArea className="h-64 w-full border rounded-lg">
            <div className="p-4 space-y-4">
              {ticketMessages.message.map((message: any) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.is_me ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="max-w-[70%] p-3 rounded-lg bg-muted">
                    <div className="text-sm whitespace-pre-wrap">
                      {message.message}
                    </div>
                    <div className="text-xs mt-2 text-muted-foreground">
                      {dayjs.unix(message.created_at).format("MM-DD HH:mm")}
                      {message.is_me
                        ? " (" + t("我") + ")"
                        : " (" + t("客服") + ")"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        {ticketMessages.status != 1 && (
          <div className="space-y-3">
            <div className="flex w-full gap-2">
              <Textarea
                placeholder={t("请输入回复内容")}
                className="flex-1"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                disabled={isLoading || isReplyLoading}
              />
              <Button
                className="self-end"
                disabled={isLoading || isReplyLoading}
                onClick={handleReply}
              >
                {t("回复")}
              </Button>
            </div>
            <div className="flex justify-end pt-2">
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onCloseTicket(ticketMessages.id)}
                disabled={isLoading || isReplyLoading}
              >
                {t("关闭工单")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
