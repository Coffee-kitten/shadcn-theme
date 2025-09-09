import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import dayjs from "dayjs";
import { getTicketStatus } from "./utils";
import { useTranslation } from "react-i18next";

interface TicketListProps {
  tickets: any[];
  onTicketClick: (ticket: any) => void;
}

export function TicketList({ tickets, onTicketClick }: TicketListProps) {
  const { t } = useTranslation();
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {tickets.map((ticket: any) => {
        const ticketStatus = getTicketStatus(ticket.reply_status);

        return (
          <button
            key={ticket.id}
            className="group p-5 bg-card border border-border/50 rounded-xl hover:border-border hover:shadow-sm transition-all duration-200 w-full"
            onClick={(e) => {
              e.preventDefault();
              onTicketClick(ticket);
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 text-left space-y-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <MessageCircle className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground line-clamp-1 text-sm">
                    {ticket.subject}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {ticket.status == 1 ? (
                    <Badge
                      variant="secondary"
                      className="text-xs px-2 py-0.5 font-normal"
                    >
                      {t("已完成")}
                    </Badge>
                  ) : (
                    <Badge
                      variant={ticketStatus.variant}
                      className="text-xs px-2 py-0.5 font-normal"
                    >
                      {ticketStatus.text}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {dayjs.unix(ticket.created_at).format("MM-DD HH:mm")}
                  </span>
                </div>
              </div>

              <div className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30"></div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
