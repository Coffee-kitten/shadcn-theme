import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  title: string;
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  };
  content: React.ReactNode;
  action?: React.ReactNode;
}

export const InfoCard = ({
  icon: Icon,
  iconBgColor,
  iconColor,
  title,
  badge,
  content,
  action,
}: InfoCardProps) => {
  return (
    <div className="flex items-center justify-between py-1">
      <div className="flex items-center gap-3">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-lg ${iconBgColor} flex items-center justify-center`}
        >
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          {badge && (
            <Badge
              variant={badge.variant || "secondary"}
              className={badge.className}
            >
              {badge.text}
            </Badge>
          )}
          <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {content}
        {action}
      </div>
    </div>
  );
};
