import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useV2boardUserData } from "@/store/index";
import { Mail, Shield, Wallet, Hash } from "lucide-react";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { useTranslation } from "react-i18next";
export const Card1 = () => {
  const { t } = useTranslation();
  const store = useV2boardUserData();

  return (
    <div className="rounded-xl border text-card-foreground shadow bg-muted/30 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              {t("电子邮箱")}
            </h3>
            <Badge
              variant="secondary"
              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
            >
              {t("已验证")}
            </Badge>
          </div>
        </div>
        <Badge variant="outline">{store.infoData.data.email}</Badge>
      </div>
      <Separator />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <Hash className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">UUID</h3>
            <Badge
              variant="secondary"
              className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            >
              {t("唯一标识")}
            </Badge>
          </div>
        </div>
        <Badge variant="outline" className="w-fit">
          {store.infoData.data.uuid || "N/A"}
        </Badge>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              {t("钱包余额")}
            </h3>
            <Badge
              variant="secondary"
              className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
            >
              {t("可用")}
            </Badge>
          </div>
        </div>
        <Badge variant="outline">
          {" "}
          ¥{" "}
          {store.infoData.data?.balance
            ? (store.infoData.data.balance / 100).toFixed(2)
            : "0.00"}
        </Badge>
      </div>
      <Separator />
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-foreground">
              {t("账户安全")}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("定期更新密码以保护您的账户安全")}
            </p>
          </div>
        </div>

        <ChangePasswordDialog />
      </div>
    </div>
  );
};
