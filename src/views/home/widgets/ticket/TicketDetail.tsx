
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import {
  decodeUnicode,
  getTicketStatus,
  getPriorityText,
  TicketInfoRow,
} from "./utils";

interface TicketDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTicket: any;
  ticketMessages: any[];
  loadingTicketDetail: boolean;
  isLoading: boolean;
  onCloseTicket: (ticketId: string) => void;
  isTabView?: boolean;
  onBack?: () => void;
}

export function TicketDetail({
  open,
  onOpenChange,
  selectedTicket,
  ticketMessages,
  loadingTicketDetail,
  isLoading,
  onCloseTicket,
  isTabView = false,
  onBack,
}: TicketDetailProps) {
  // 选项卡模式下直接渲染内容，不使用Dialog包装
  const content = (
    <div className={isTabView ? "space-y-4" : "p-6 space-y-4"}>
      {loadingTicketDetail ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-muted-foreground">加载中...</div>
        </div>
      ) : selectedTicket ? (
        <>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold leading-none tracking-tight">
              工单详情 #{selectedTicket.id}
            </h2>
            <p className="text-sm text-muted-foreground">
              {decodeUnicode(selectedTicket.subject)}
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg border-l-4 border-l-primary/60">
            {getTicketStatus(selectedTicket.status).icon("h-5 w-5")}
            <div>
              <div
                className={`text-sm font-medium ${
                  getTicketStatus(selectedTicket.status).color
                }`}
              >
                {getTicketStatus(selectedTicket.status).text}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                工单编号: {selectedTicket.id}
              </div>
            </div>
          </div>
          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <TicketInfoRow
              label="优先级"
              value={getPriorityText(selectedTicket.level).text}
            />
            <TicketInfoRow
              label="创建时间"
              value={dayjs
                .unix(selectedTicket.created_at)
                .format("YYYY-MM-DD HH:mm")}
            />
            <TicketInfoRow
              label="更新时间"
              value={dayjs
                .unix(selectedTicket.updated_at)
                .format("YYYY-MM-DD HH:mm")}
            />
            <TicketInfoRow
              label="回复状态"
              value={selectedTicket.reply_status === 1 ? "等待回复" : "已回复"}
            />
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium text-foreground">消息记录</div>
            <ScrollArea className="h-64 w-full border rounded-lg">
              <div className="p-4 space-y-4">
                {ticketMessages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.is_me ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.is_me
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">
                        {decodeUnicode(message.message)}
                      </div>
                      <div
                        className={`text-xs mt-2 ${
                          message.is_me
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {dayjs.unix(message.created_at).format("MM-DD HH:mm")}
                        {message.is_me ? " (我)" : " (客服)"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="flex w-full items-center gap-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit" variant="outline">
              回复
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button size="sm" variant="outline" disabled={isLoading}>
              返回
            </Button>
            <Button
              size="sm"
              onClick={() => onCloseTicket(selectedTicket.id.toString())}
              disabled={isLoading}
            >
              {isLoading ? "处理中..." : "关闭工单"}
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center py-8">
          <div className="text-sm text-muted-foreground">无法加载工单详情</div>
        </div>
      )}
    </div>
  );

  return <div className="bg-card border rounded-lg p-6">{content}</div>;
}
