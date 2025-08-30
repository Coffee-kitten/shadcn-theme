import { Skeleton } from "@/components/ui/skeleton";

export const Loading = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="grid gap-6">
        <Skeleton className="h-[192px] rounded-xl" />
        <Skeleton className="h-[202px] rounded-xl" />
      </div>
      <div className="grid gap-6">
        <Skeleton className="h-[333px] rounded-xl" />
        <Skeleton className="h-[40px] rounded-md" />
      </div>
    </div>
  );
};
