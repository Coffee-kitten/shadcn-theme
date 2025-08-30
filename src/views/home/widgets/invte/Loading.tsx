import { Skeleton } from "@/components/ui/skeleton";

export const Loading = () => {
  return (
    <>
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      <Skeleton className="h-[625px] rounded-xl" />
      <Skeleton className="h-[138px] rounded-xl" />
    </>
  );
};
