import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Server } from "lucide-react";
export function Card2() {
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle>Notice:</AlertTitle>
      <AlertDescription>
        Each node runs multiple servers, so the status may not be fully
        accurate.
      </AlertDescription>
    </Alert>
  );
}
