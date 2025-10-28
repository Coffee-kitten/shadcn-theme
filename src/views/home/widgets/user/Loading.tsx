import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <>
      <Skeleton className="h-[312px] rounded-xl" />
      <Skeleton className="h-[104px] rounded-xl" />
      <Skeleton className="h-[272px] rounded-xl" />
    </>
  );
}
