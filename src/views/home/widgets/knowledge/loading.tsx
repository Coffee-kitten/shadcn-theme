import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
export function Loading1() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <div className="flex flex-col gap-6 md:gap-8 md:col-span-1">
        <div className="space-y-3">
          <Skeleton className="h-[28px] rounded-xl" />

          <Skeleton className="h-[38px] rounded-xl" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-[28px] rounded-xl" />

          <Skeleton className="h-[38px] rounded-xl" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-[28px] rounded-xl" />

          <Skeleton className="h-[38px] rounded-xl" />
        </div>
      </div>

      <Skeleton className="w-full min-h-[65svh] p-6 bg-muted border rounded-lg hidden md:block md:col-span-3" />
    </div>
  );
}

export function Loading2() {
  return (
    <div className="flex flex-col gap-1 max-w-[90svw] w-full mx-auto overflow-y-scroll no-scrollbar">
      <div className="space-y-0.5">
        <Skeleton className="h-[32px] w-[300px] rounded-lg" />
        <div className="flex flex-row gap-0.5 md:gap-2">
          <Skeleton className="h-[20px] w-[128px] rounded-lg" />
          <Skeleton className="h-[20px] w-[128px] rounded-lg" />
        </div>
      </div>
      <Separator />
      <div className="flex gap-1 flex-col max-w-[90svw] my-4 select-text">
        <Skeleton className="h-[30px] w-[256px] rounded-lg" />
        <Skeleton className="h-[30px] w-[196px] rounded-lg" />
        <Skeleton className="h-[30px] w-[300px] rounded-lg" />
        <Skeleton className="h-[30px] w-[350px] rounded-lg" />
        <Skeleton className="h-[30px] w-[96px] rounded-lg" />
      </div>
    </div>
  );
}

export function Loading3() {
  return (
    <div className="flex flex-col gap-1">
      {/* <pre>{JSON.stringify(store.knowledgeFetchIDData, null, 2)}</pre> */}
      <div className="space-y-0.5">
        <Skeleton className="h-[32px] w-[300px] rounded-lg" />
        <div className="flex flex-row gap-0.5 md:gap-2">
          <Skeleton className="h-[20px] w-[128px] rounded-lg" />
          <Skeleton className="h-[20px] w-[128px] rounded-lg" />
        </div>
      </div>
      <Separator />
      <div className="flex gap-1 flex-col max-w-[90svw] my-4 select-text">
        <Skeleton className="h-[30px] w-[256px] rounded-lg" />
        <Skeleton className="h-[30px] w-[196px] rounded-lg" />
        <Skeleton className="h-[30px] w-[300px] rounded-lg" />
        <Skeleton className="h-[30px] w-[350px] rounded-lg" />
        <Skeleton className="h-[30px] w-[96px] rounded-lg" />
      </div>
    </div>
  );
}
