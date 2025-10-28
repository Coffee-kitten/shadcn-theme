import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import dayjs from "dayjs";
import { getTicketStatus, getPriorityText, TicketInfoRow } from "./utils";
import { Loading2 } from "./Loading2";
import { useState } from "react";
import { useTicketReplyPost, useTicketClosePost } from "@/api/v1/ticket";
import { useTranslation } from "react-i18next";
import { ticketFetchIdGet, ticketFetchGet } from "@/api/v1/ticket";
export function TicketDetail({ onBack, ticketID }: any) {
  const { t } = useTranslation();
  const [replyMessage, setReplyMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReplyLoading, setIsReplyLoading] = useState(false);
  const { ticketReplyPost } = useTicketReplyPost();
  const { ticketClosePost } = useTicketClosePost();
  const {
    data,
    isLoading: isLoadingDetail,
    mutate,
  } = ticketFetchIdGet(ticketID);
  const { mutate: mutateList } = ticketFetchGet();
  // useEffect(() => {
  //   if (!shouldPoll) return;

  //   const intervalId = setInterval(async () => {
  //     const response = await ticketFetchIdGet(data?.data.data.id);
  //     setTicketMessages(response.data.data);
  //   }, 10000);

  //   return () => clearInterval(intervalId);
  // }, [shouldPoll]);

  if (isLoadingDetail) return <Loading2 />;
  const statusInfo =
    data?.data.data.status == 1
      ? { ...getTicketStatus(2, t), text: t("已完成") }
      : getTicketStatus(data?.data.data.reply_status, t);
  const handleReply = async () => {
    setIsReplyLoading(true);
    const result = await ticketReplyPost(data?.data.data.id, replyMessage);
    if (result) {
      await mutate();
    }
    setIsReplyLoading(false);
  };
  const handleCloseTicket = async (ticketId: number) => {
    setIsLoading(true);
    const result = await ticketClosePost(ticketId);
    if (result) {
      await mutate();
      await mutateList();
    }
    // setTicketMessages((await ticketFetchIdGet(ticketId)).data.data);
    setIsLoading(false);
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
            #{data?.data.data.id}
          </h2>
          <p className="text-sm text-muted-foreground">
            {data?.data.data.subject}
          </p>
        </div>

        <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border-l-4 border-l-primary/60">
          {statusInfo.icon("h-5 w-5")}
          <div>
            <div className={`text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.text}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {t("工单编号")}: {data?.data.data.id}
            </div>
          </div>
        </div>

        <Separator />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TicketInfoRow
            label={t("优先级")}
            value={getPriorityText(data?.data.data.level, t).text}
          />
          <TicketInfoRow
            label={t("创建时间")}
            value={dayjs
              .unix(data?.data.data.created_at)
              .format("YYYY-MM-DD HH:mm")}
          />
          <TicketInfoRow
            label={t("更新时间")}
            value={dayjs
              .unix(data?.data.data.updated_at)
              .format("YYYY-MM-DD HH:mm")}
          />
        </div>
        <div className="space-y-3">
          <div className="text-sm font-medium text-foreground">
            {t("消息记录")}
          </div>
          <ScrollArea className="h-64 w-full border rounded-lg">
            <div className="p-4 space-y-4">
              {data?.data.data.message.map((message: any) => (
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
        {data?.data.data.status != 1 && (
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
                onClick={() => handleCloseTicket(data?.data.data.id)}
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
