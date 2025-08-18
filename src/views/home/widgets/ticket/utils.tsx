import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

// 解码Unicode字符串
export const decodeUnicode = (str: string) => {
  try {
    return str.replace(/\\u[\dA-F]{4}/gi, (match) => {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    });
  } catch (error) {
    return str;
  }
};

// 获取工单状态信息
export const getTicketStatus = (status: number) => {
  const statusMap: Record<
    number,
    {
      text: string;
      color: string;
      variant: "default" | "secondary" | "destructive" | "outline";
      icon: (className?: string) => React.ReactNode;
    }
  > = {
    0: {
      text: "待处理",
      color: "text-yellow-600 dark:text-yellow-400",
      variant: "outline",
      icon: (className) => <Clock className={className} />,
    },
    1: {
      text: "已回复",
      color: "text-green-600 dark:text-green-400",
      variant: "default",
      icon: (className) => <CheckCircle className={className} />,
    },
    2: {
      text: "已关闭",
      color: "text-gray-600 dark:text-gray-400",
      variant: "secondary",
      icon: (className) => <XCircle className={className} />,
    },
    3: {
      text: "待用户回复",
      color: "text-blue-600 dark:text-blue-400",
      variant: "outline",
      icon: (className) => <AlertTriangle className={className} />,
    },
  };

  return (
    statusMap[status] || {
      text: "未知状态",
      color: "text-gray-600 dark:text-gray-400",
      variant: "secondary" as const,
      icon: (className?: string) => <AlertTriangle className={className} />,
    }
  );
};

// 获取优先级文本和样式
export const getPriorityText = (level: number) => {
  const priorityMap: Record<number, { text: string; color: string }> = {
    0: { text: "低", color: "text-green-600" },
    1: { text: "中", color: "text-yellow-600" },
    2: { text: "高", color: "text-red-600" },
  };

  return (
    priorityMap[level] || { text: "未知", color: "text-gray-600" }
  );
};

// 工单信息行组件
export function TicketInfoRow({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

// 工单区域组件
export function TicketSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-foreground">{title}</h4>
      {children}
    </div>
  );
}