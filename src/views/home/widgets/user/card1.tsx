import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useV2boardUserData } from "@/store/index";
import { Eye, EyeOff, Mail, Lock, Shield, Wallet } from "lucide-react";
import { changePasswordPost } from "@/api/user";
import { toast } from "sonner";

import { useState } from "react";
export const Card1 = () => {
  const store = useV2boardUserData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("两次新密码输入不同");
      return;
    }

    setIsLoading(true);
    try {
      await changePasswordPost(formData.oldPassword, formData.newPassword);
      toast.success("修改成功");
      setIsDialogOpen(false);
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast.error(
        error.data?.errors?.old_password?.[0] ||
          error.data?.errors?.new_password?.[0] ||
          error.data?.message ||
          "密码修改失败"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-xl border text-card-foreground shadow bg-muted/30 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">电子邮箱</h3>
            <Badge
              variant="secondary"
              className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30"
            >
              已验证
            </Badge>
          </div>
        </div>
        <Badge variant="outline">{store.infoData.data.email}</Badge>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">钱包余额</h3>
            <Badge
              variant="secondary"
              className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
            >
              可用
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
            <h4 className="text-sm font-semibold text-foreground">账户安全</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              定期更新密码以保护您的账户安全
            </p>
          </div>
        </div>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="group/btn relative overflow-hidden border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
            >
              <Lock className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              修改密码
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 border-b">
              <AlertDialogHeader className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <AlertDialogTitle className="text-lg font-semibold">
                      修改密码
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground mt-1">
                      为了您的账户安全，请设置一个强密码
                    </AlertDialogDescription>
                  </div>
                </div>
              </AlertDialogHeader>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <Label
                  htmlFor="oldPassword"
                  className="text-sm font-medium text-foreground"
                >
                  当前密码
                </Label>
                <div className="relative group">
                  <Input
                    id="oldPassword"
                    type={showOldPassword ? "text" : "password"}
                    value={formData.oldPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        oldPassword: e.target.value,
                      })
                    }
                    placeholder="请输入当前密码"
                    className="pr-12 h-11 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-muted/80 transition-colors"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="newPassword"
                  className="text-sm font-medium text-foreground"
                >
                  新密码
                </Label>
                <div className="relative group">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newPassword: e.target.value,
                      })
                    }
                    placeholder="请输入新密码（至少8位）"
                    className="pr-12 h-11 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-muted/80 transition-colors"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-foreground"
                >
                  确认新密码
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="请再次输入新密码"
                  className="h-11 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </div>

            <div className="border-t bg-muted/30 p-6">
              <AlertDialogFooter className="gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setFormData({
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className="flex-1 h-11"
                >
                  取消
                </Button>
                <Button
                  type="button"
                  onClick={handlePasswordChange}
                  disabled={isLoading}
                  className="flex-1 h-11"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Please wait</span>
                    </div>
                  ) : (
                    "确认修改"
                  )}
                </Button>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
