import { Skeleton } from "@/components/ui/skeleton";
export function Loading() {
  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-5">
      <Skeleton className="h-[58px] rounded-xl" />
      <Skeleton className="h-[58px] rounded-xl" />
      <Skeleton className="h-[58px] rounded-xl" />
      <Skeleton className="h-[58px] rounded-xl" />
      <Skeleton className="h-[58px] rounded-xl" />
      <Skeleton className="h-[58px] rounded-xl" />
    </div>
  );
}
