import { getOrderStatus } from "@/views/home/widgets/order/card2";
import { useV2boardUserData } from "@/store";
export function Card4() {
  const store = useV2boardUserData();
  const paymentData = store.paymentDetailData.data;
  const orderStatus = getOrderStatus(store.paymentDetailData.data.status);
  // 获取标题和描述文本
  const getTitleAndDescription = () => {
    switch (paymentData.status) {
      case 0:
        return {
          title: "等待支付",
          description: "请尽快完成支付以激活您的服务",
        };
      case 1:
        return {
          title: "处理中",
          description: "支付正在处理中，请稍候",
        };
      case 2:
        return {
          title: "已取消",
          description: "订单由于超时支付已被取消",
        };
      case 3:
        return {
          title: "已完成",
          description: "订单已支付并开通",
        };
      case 4:
        return {
          title: "已折抵",
          description: "订单已被折抵",
        };
      default:
        return {
          title: "订单状态未知",
          description: "请联系我们进行处理",
        };
    }
  };
  const { title, description } = getTitleAndDescription();
  return (
    <div className="flex bg-muted/60 rounded-xl flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 h-full">
      <div className="mx-auto text-center">
        {orderStatus.icon("mx-auto h-12 w-12")}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-muted-foreground">{description}</p>
        <div className="mt-6 grid gap-4">
          <div className="bg-muted rounded-md p-4 sm:min-w-96">
            <h2 className="text-lg font-semibold">Order Details</h2>
            <div className="mt-2 grid gap-2 text-sm text-left">
              <div className="flex items-center justify-between gap-2">
                <span>订阅名称:</span>
                <span>{paymentData.plan.name}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span>订单号:</span>
                <span>{paymentData.trade_no}</span>
              </div>
              {paymentData.callback_no && (
                <div className="flex items-center justify-between gap-2">
                  <span>支付单号:</span>
                  <span>{paymentData.callback_no}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
