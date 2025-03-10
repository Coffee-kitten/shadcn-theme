import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useV2boardUserData } from "@/store/index";
import { Badge } from "@/components/ui/badge";

import { Signal1, Signal2 } from "@/views/svg/signal";
export function Card1() {
  const store = useV2boardUserData();
  return (
    <div className="grid lg:grid-cols-2 gap-4 lg:gap-5">
      {store.serverFetchData.data.map((item: any, index: any) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-4 flex bg-muted rounded-lg justify-between border transition-all hover:px-[1.125rem] hover:shadow hover:border-primary/50">
                <p className="font-medium line-clamp-1 transition-all text-start">
                  {item.name}
                </p>
                <div className="flex gap-1">
                  <Badge>{item.rate}x</Badge>
                  <Badge>{item.type}</Badge>
                  <Badge>{item.is_online ? <Signal2 /> : <Signal1 />}</Badge>
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {item.is_online ? <p>节点当前在线</p> : <p>节点当前离线</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
