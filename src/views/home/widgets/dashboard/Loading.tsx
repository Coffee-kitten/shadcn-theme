import { Skeleton } from "@/components/ui/skeleton";

export function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 max-w-[1380px] mx-auto w-full">
      <Skeleton className="h-[180px] rounded-xl" />
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="h-[190px] rounded-xl" />
        <Skeleton className="h-[190px] rounded-xl" />
        <Skeleton className="h-[190px] rounded-xl" />
      </div>
      <Skeleton className="h-[405px] rounded-xl" />
    </div>
  );
}
