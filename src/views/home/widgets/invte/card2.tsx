import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Receipt, CheckCircle } from "lucide-react";
import { useV2boardUserData } from "@/utils/common-imports";
import dayjs from "dayjs";

const CommissionRecordItem = ({ record }: any) => {
  const formatDate = (timestamp: number) => {
    return dayjs.unix(timestamp).format("YYYY-MM-DD HH:mm");
  };

  const getStatusBadge = () => {
    return (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 hover:bg-green-100 hover:text-green-800 dark:hover:bg-green-900 dark:hover:text-green-200"
      >
        <CheckCircle className="w-3 h-3 mr-1" />
        已发放
      </Badge>
    );
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/50 rounded-lg flex items-center justify-center">
            <Receipt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 break-all">
            订单 #{record.trade_no}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(record.created_at)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-green-600 dark:text-green-400">
            +¥{(record.get_amount / 100).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            订单金额: ¥{(record.order_amount / 100).toFixed(2)}
          </p>
        </div>
        {getStatusBadge()}
      </div>
    </div>
  );
};

export const Card2 = () => {
  const store = useV2boardUserData();
  const commissionRecords = store.inviteDetailsData?.data || [];
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Receipt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          佣金发放记录
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {commissionRecords.length > 0 ? (
          <ScrollArea className="max-h-[400px]">
            <div className="space-y-0">
              {commissionRecords.map((record: any) => (
                <CommissionRecordItem key={record.id} record={record} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Receipt className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              暂无佣金发放记录
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
