import {
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  CreditCard,
} from "lucide-react";
export const getPeriodText = (period: string) => {
  const periodMap: Record<string, string> = {
    month_price: "月付",
    quarter_price: "季付",
    half_year_price: "半年付",
    year_price: "年付",
    two_year_price: "两年付",
    three_year_price: "三年付",
    onetime_price: "一次性",
    reset_price: "流量重置",
  };

  return periodMap[period] || period;
};
// 获取订单状态信息和对应图标
export const getOrderStatus = (status: number, extraClassName: string = "") => {
  const statusMap: Record<
    number,
    {
      text: string;
      color: string;
      icon: (className?: string) => React.ReactNode;
    }
  > = {
    0: {
      text: "待支付",
      color: "text-yellow-600 dark:text-yellow-400",
      icon: (className = "") => (
        <CreditCard
          className={`text-yellow-600 dark:text-yellow-400 ${className} ${extraClassName}`.trim()}
        />
      ),
    },
    1: {
      text: "处理中",
      color: "text-blue-600 dark:text-blue-400",
      icon: (className = "") => (
        <Clock
          className={`text-blue-600 dark:text-blue-400 ${className} ${extraClassName}`.trim()}
        />
      ),
    },
    2: {
      text: "已取消",
      color: "text-red-600 dark:text-red-400",
      icon: (className = "") => (
        <XCircle
          className={`text-red-600 dark:text-red-400 ${className} ${extraClassName}`.trim()}
        />
      ),
    },
    3: {
      text: "已完成",
      color: "text-green-600 dark:text-green-400",
      icon: (className = "") => (
        <CheckCircle
          className={`text-green-600 dark:text-green-400 ${className} ${extraClassName}`.trim()}
        />
      ),
    },
    4: {
      text: "已折抵",
      color: "text-purple-600 dark:text-purple-400",
      icon: (className = "") => (
        <AlertCircle
          className={`text-purple-600 dark:text-purple-400 ${className} ${extraClassName}`.trim()}
        />
      ),
    },
  };

  return (
    statusMap[status] || {
      text: "未知状态",
      color: "text-muted-foreground",
      icon: (className = "") => (
        <AlertCircle
          className={`text-muted-foreground ${className} ${extraClassName}`}
        />
      ),
    }
  );
};

export function OrderSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div className="font-semibold">{title}</div>
      <div className="text-sm space-y-1.5">{children}</div>
    </div>
  );
}

export function OrderInfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-2 items-center">
      <div className="w-32 font-medium">{label}</div>
      <div className="select-text">{value}</div>
    </div>
  );
}
