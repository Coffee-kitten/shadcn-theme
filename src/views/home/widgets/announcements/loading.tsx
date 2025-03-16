import { Skeleton } from "@/components/ui/skeleton";
export function Loading() {
  return (
    <>
      <Skeleton className="h-[92px] rounded-xl" />
      <Skeleton className="h-[92px] rounded-xl" />
    </>
  );
}
