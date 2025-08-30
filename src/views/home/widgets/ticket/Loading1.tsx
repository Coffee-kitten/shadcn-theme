import { Skeleton } from "@/components/ui/skeleton";

export const Loading1 = () => {
  return (
    <>
      <Skeleton className="h-36 w-full rounded-md" />
      <div className="grid lg:grid-cols-2 gap-4">
        {/* 生成6个骨架屏卡片 */}
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton className="h-24 w-full rounded-md" key={index} />
        ))}
      </div>
    </>
  );
};
