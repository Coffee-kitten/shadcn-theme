import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <>
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-[190px] rounded-xl" />
        <Skeleton className="h-[190px] rounded-xl" />
        <Skeleton className="h-[190px] rounded-xl" />
      </div>
      <Skeleton className="h-[405px] rounded-xl" />
    </>
  );
}
