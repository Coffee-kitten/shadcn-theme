import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/views/svg/order";
import { useV2boardUserData } from "@/store/index";
export function Card1() {
  const store = useV2boardUserData();
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {store.orderFetchData.data.map((item: any, index: any) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <button className="p-6 flex bg-muted rounded-lg justify-between transition-all hover:px-[1.715rem]">
              <div className="mt-4 space-y-0.5 line-clamp-1">
                <div className="text-start flex gap-2 items-center text-base md:text-lg font-medium line-clamp-1">
                  <p className="line-clamp-1">{item.trade_no}</p>
                  <Order />
                </div>
                <div className="text-sm line-clamp-1 text-start flex gap-1 items-center text-muted-foreground">
                  <Badge className="line-clamp-1">已完成</Badge>
                  <div className="space-x-0.5 line-clamp-1">
                    <span className="font-medium">创建于</span>
                    <span>2025-02-07 03:39:30</span>
                  </div>
                </div>
              </div>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>订单详细 #{item.trade_no}</DialogTitle>
              <DialogDescription></DialogDescription>
              <div className="mt-2">
                <div className="h-24 flex flex-col gap-1 items-center justify-center bg-muted/25 rounded-lg border mt-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="tabler-icon tabler-icon-zoom-check size-8 text-green-600 dark:text-green-400 opacity-75"
                  >
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                    <path d="M21 21l-6 -6"></path>
                    <path d="M7 10l2 2l4 -4"></path>
                  </svg>
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    订单已开通
                  </div>
                </div>
                <hr className="h-px my-8 border-0 bg-muted-foreground/65" />
                <div className="space-y-6">
                  <div className="space-y-2.5">
                    <div className="font-semibold">产品信息</div>
                    <div className="text-sm space-y-1.5">
                      <div className="flex gap-2 items-center">
                        <div className="w-32 font-medium">产品名称</div>
                        <div className="select-text">{item.plan.name}</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="w-32 font-medium">订单类型/周期</div>
                        <div className="select-text">月度</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="w-32 font-medium">产品流量</div>
                        <div className="select-text">100.00 GiB</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <div className="font-semibold">订单信息</div>
                    <div className="text-sm space-y-1.5">
                      <div className="flex gap-2 items-center">
                        <div className="w-32 font-medium font-mono">订单号</div>
                        <div className="select-text">
                          2025020715023041207956223
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="w-32 font-medium font-mono">
                          回调单号
                        </div>
                        <div className="select-text">2025020715393458043</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="w-32 font-medium">需支付金额</div>
                        <div className="select-text">¥ 8.00 CNY</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="w-32 font-medium font-mono">
                          订单创建于
                        </div>
                        <div className="select-text">2025-02-07 03:39:30</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="w-32 font-medium font-mono">
                          订单支付于
                        </div>
                        <div className="select-text">2025-02-07 03:39:54</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="w-32 font-medium font-mono">
                          订单更新于
                        </div>
                        <div className="select-text">2025-02-07 03:39:54</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
