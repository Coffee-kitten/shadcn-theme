import { Skeleton } from "@/components/ui/skeleton";

export const Loading2 = () => {
  return (
    <div className="space-y-4">
      {/* 标题栏 */}
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="bg-card border rounded-lg p-6 space-y-6">
        {/* 标题区域 */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* 状态信息 */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <Skeleton className="h-5 w-24" />
        </div>

        {/* 基本信息 */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-36" />
        </div>

        {/* 消息区域 */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-20" />
          <div className="border rounded-lg p-4 space-y-3">
            <Skeleton className="h-16 w-1/3" />
            <Skeleton className="h-12 w-1/3 ml-auto" />
            <Skeleton className="h-14 w-1/3" />
          </div>
        </div>
      </div>
    </div>
  );
};
