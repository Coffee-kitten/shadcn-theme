import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Skeleton className="h-[116px] rounded-xl" />
      <Skeleton className="h-[116px] rounded-xl" />
      <Skeleton className="h-[116px] rounded-xl" />
      <Skeleton className="h-[116px] rounded-xl" />
      <Skeleton className="h-[116px] rounded-xl" />
      <Skeleton className="h-[116px] rounded-xl" />
    </div>
  );
}
