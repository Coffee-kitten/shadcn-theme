import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-[1500px] mx-auto w-full">
      <Skeleton className="h-[180px] rounded-xl" />

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
    </div>
  );
}
