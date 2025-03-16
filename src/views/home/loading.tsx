import { Progress } from "@/components/ui/progress";
export function Loading() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <Progress value={50} className="h-8 w-8 animate-pulse text-primary" />
        <p className="text-muted-foreground text-sm">Please wait a moment...</p>
      </div>
    </div>
  );
}
