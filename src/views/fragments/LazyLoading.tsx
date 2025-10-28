import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";

export function LazyLoading({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6 pt-0 max-w-[1380px] mx-auto w-full">
      <Skeleton className="h-[180px] rounded-xl" />
      {children}
    </div>
  );
}
