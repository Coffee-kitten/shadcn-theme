import { Info } from "lucide-react";

export function Card2() {
  return (
    <div className="rounded-lg border border-dashed border-muted-foreground/25 bg-muted/30 p-4">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground">节点状态说明</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            每个节点运行多台服务器，因此状态显示可能不完全准确
          </p>
        </div>
      </div>
    </div>
  );
}
