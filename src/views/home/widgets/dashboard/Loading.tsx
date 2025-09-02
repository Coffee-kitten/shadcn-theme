import { Skeleton } from "@/components/ui/skeleton";

// 默认加载组件（有订阅且未到期）
// export function Loading() {
//   return (
//     <>
//       <Skeleton className="h-[262px] rounded-xl" />
//       <div className="grid auto-rows-min gap-4 2xl:grid-cols-3">
//         <Skeleton className="h-[190px] rounded-xl" />
//         <Skeleton className="h-[190px] rounded-xl" />
//         <Skeleton className="h-[190px] rounded-xl" />
//       </div>
//       <Skeleton className="h-[405px] rounded-xl" />
//     </>
//   );
// }

// 订阅已到期的加载组件
export function Loading() {
  return <Skeleton className="h-full rounded-xl" />;
}
