import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <>
      <Skeleton className="w-[192px] h-[36px] rounded-lg" />
      <div className="grid auto-rows-min gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[507px] rounded-xl" />
        ))}
      </div>
    </>
  );
}
