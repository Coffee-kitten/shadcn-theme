import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, ArrowRight } from "lucide-react";
import { useV2boardUserData } from "@/store/index";
import dayjs from "dayjs";
import { useState } from "react";

export function Card1() {
  const store = useV2boardUserData();
  const [isExpanded, setIsExpanded] = useState(false);

  // 获取第一个公告
  const firstAnnouncement = store.noticeFetchData?.data?.[0];

  if (!firstAnnouncement) {
    return (
      <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-full bg-primary/10">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            最新公告
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">暂无公告</p>
        </CardContent>
      </Card>
    );
  }

  // 使用 whitespace-pre-wrap 处理换行符
  const formatText = (text: string, expanded = false) => {
    // const normalized = text.replace(/\\[rn]/g, "\n").replace(/\r\n?/g, "\n");

    if (!expanded && text.length > 90) {
      return text.slice(0, 90) + "...";
    }

    return text;
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-lg transition-all duration-300 group">
      {/* 装饰性背景元素 */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary/10 rounded-full translate-y-10 -translate-x-10 group-hover:scale-110 transition-transform duration-500" />

      <CardHeader className="pb-3 relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Bell className="h-4 w-4 text-primary animate-pulse" />
            </div>
            最新公告
            <Badge variant="secondary">NEW</Badge>
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {dayjs(firstAnnouncement.created_at * 1000).format("MM-DD")}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-3">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {firstAnnouncement.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-6 [&:not(:first-child)]:mt-6 whitespace-pre-wrap">
          {formatText(firstAnnouncement.content, isExpanded)}
        </p>

        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary hover:text-primary/80 hover:bg-primary/10 p-0 h-auto font-medium"
          >
            {isExpanded ? "收起" : "展开"}
            <ArrowRight
              className={`ml-1 h-3 w-3 transition-transform duration-200 ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          </Button>

          {/* <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
            刚刚更新
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
