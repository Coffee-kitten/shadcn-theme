import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { changePasswordPost } from "@/api/user";
import { toast } from "sonner";
import { useState } from "react";

// 密码输入字段通用组件
const PasswordField = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  showToggle = true,
  showPassword = false,
  onTogglePassword,
}: any) => {
  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative group">
        <Input
          id={id}
          name={name}
          type={showToggle && showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={name === "oldPassword-1" ? "current-password" : "new-password"}
          className={`${
            showToggle ? "pr-12" : ""
          } h-11 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200`}
        />
        {showToggle && onTogglePassword && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-9 w-9 p-0 hover:bg-muted/80 transition-colors"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export const ChangePasswordDialog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="group/btn relative overflow-hidden border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
        >
          <Lock className="transition-transform group-hover/btn:scale-110" />
          修改密码
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 border-b">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">
                  修改密码
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground mt-1">
                  为了您的账户安全，请设置一个强密码
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-6">
          <PasswordField
            id="oldPassword"
            name="oldPassword-1"
            label="当前密码"
            value={formData.oldPassword}
            onChange={(value: string) =>
              setFormData({ ...formData, oldPassword: value })
            }
            placeholder="请输入当前密码"
            showPassword={showOldPassword}
            onTogglePassword={() => setShowOldPassword(!showOldPassword)}
          />
          <PasswordField
            id="newPassword"
            name="newPassword"
            label="新密码"
            value={formData.newPassword}
            onChange={(value: string) =>
              setFormData({ ...formData, newPassword: value })
            }
            placeholder="请输入新密码（至少8位）"
            showPassword={showNewPassword}
            onTogglePassword={() => setShowNewPassword(!showNewPassword)}
          />
          <PasswordField
            id="confirmPassword"
            label="确认新密码"
            value={formData.confirmPassword}
            onChange={(value: string) =>
              setFormData({ ...formData, confirmPassword: value })
            }
            placeholder="请再次输入新密码"
            showToggle={false}
          />
        </div>

        <div className="border-t bg-muted/30 p-6">
          <DialogFooter className="gap-3">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="flex-1 h-11">
                取消
              </Button>
            </DialogClose>
            <Button
              type="button"
              onClick={handlePasswordChange}
              disabled={isLoading}
              className="flex-1 h-11"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Please wait
                </>
              ) : (
                "确认修改"
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
