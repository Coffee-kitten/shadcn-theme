import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
interface PageContainerProps {
  children: React.ReactNode;
  loading?: boolean;
  LoadingComponent?: React.ComponentType;
}

export function PageContainer({
  children,
  loading,
  LoadingComponent,
}: PageContainerProps) {
  if (loading && LoadingComponent) {
    return (
      <div className="flex flex-1 flex-col gap-4 p-6 pt-0 max-w-[1380px] mx-auto w-full">
        <Skeleton className="h-[180px] rounded-xl" />
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-6 pt-0 max-w-[1380px] mx-auto w-full">
      {children}
    </div>
  );
}
