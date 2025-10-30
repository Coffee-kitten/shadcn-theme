import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getOrderStatus } from "@/views/home/widgets/order/card2";
import { useTranslation } from "react-i18next";
import { paymentDetailGet } from "@/api/v1/payment";
export function Card5({ id }: any) {
  const { t } = useTranslation();
  const { data } = paymentDetailGet(id);
  const paymentData = data?.data.data;
  const orderStatus = getOrderStatus(data?.data.data.status, t);
  // 获取标题和描述文本
  const statusMap: Record<number, { title: string; description: string }> = {
    0: { title: t("等待支付"), description: t("请及时付款，避免订单被取消") },
    1: { title: t("处理中"), description: t("支付正在处理中，请稍候") },
    2: { title: t("已取消"), description: t("订单由于超时支付已被取消") },
    3: { title: t("已完成"), description: t("订单已支付并开通") },
    4: { title: t("已折抵"), description: t("订单已被折抵") },
  };

  const { title, description } = statusMap[paymentData.status] ?? {
    title: t("订单状态未知"),
    description: t("请联系我们进行处理"),
  };
  return (
    <Card
      className="
      bg-gradient-to-br from-background to-muted/30
      shadow-lg
    "
    >
      {/* 装饰性渐变 */}

      <div className="flex items-center justify-between px-6">
        <div className="flex items-center">
          <div
            className={`
                p-3 rounded-xl
                ${
                  paymentData.status === 0
                    ? "bg-orange-100 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400"
                    : ""
                }
                ${
                  paymentData.status === 1
                    ? "bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                    : ""
                }
                ${
                  paymentData.status === 2
                    ? "bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400"
                    : ""
                }
                ${
                  paymentData.status === 3
                    ? "bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400"
                    : ""
                }
                ${
                  paymentData.status === 4
                    ? "bg-purple-100 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400"
                    : ""
                }
              `}
          >
            {orderStatus.icon("h-6 w-6")}
          </div>

          {/* <div className="space-y-1">
              <h3 className="font-semibold text-foreground leading-none"></h3>
              <p className="text-sm text-muted-foreground leading-relaxed"></p>
            </div>
            <CardHeader></CardHeader> */}

          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </div>

        {/* 状态指示器 */}

        <div
          className={`
              w-3 h-3 rounded-full
              ${
                paymentData.status === 0
                  ? "bg-orange-400 shadow-lg shadow-orange-400/50"
                  : ""
              }
              ${
                paymentData.status === 1
                  ? "bg-blue-400 shadow-lg shadow-blue-400/50"
                  : ""
              }
              ${
                paymentData.status === 2
                  ? "bg-red-400 shadow-lg shadow-red-400/50"
                  : ""
              }
              ${
                paymentData.status === 3
                  ? "bg-green-400 shadow-lg shadow-green-400/50"
                  : ""
              }
              ${
                paymentData.status === 4
                  ? "bg-purple-400 shadow-lg shadow-purple-400/50"
                  : ""
              }
            `}
        />
      </div>
    </Card>
  );
}
