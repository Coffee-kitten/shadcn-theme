import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { passwrodMailPost, passwrodPost } from "@/api/auth";
import { useTranslation } from "react-i18next";
import { ReloadIcon } from "@radix-ui/react-icons";
import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FormForgotPwd = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sendMailcode, setSendMailcode] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(60);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: "",
      email_code: "",
      password: "",
      check_pwd: "",
    },
  });

  const handleForgotPwd = async () => {
    try {
      setIsLoading(true);
      if (form.getValues("password") == form.getValues("check_pwd")) {
        await passwrodPost(
          form.getValues("email"),
          form.getValues("password"),
          form.getValues("email_code")
        );
        toast({
          title: t("密码重置成功"),
          description: t("请使用新凭据登录"),
        });
        navigate("/login");
      } else {
        toast({
          variant: "destructive",
          title: t("请求失败"),
          description: t("两次密码输入不同"),
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.data?.errors?.email?.[0] ||
        error?.data?.errors?.password?.[0] ||
        error?.data?.message ||
        t("遇到了一些问题");
      toast({
        variant: "destructive",
        title: t("请求失败"),
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 定时器
  const startCountdown = () => {
    setSendMailcode(true);
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => {
        if (prev == 1) {
          clearInterval(timer);
          setSendMailcode(false);
          return 60; // 重置倒计时
        }
        return prev - 1; // 每秒减 1
      });
    }, 1000);

    return timer; // 返回定时器以便清理
  };
  const handleSendMailcode = async () => {
    try {
      await passwrodMailPost(form.getValues("email"));
      startCountdown();
      toast({
        title: t("发送成功"),
        description: "如果没有收到验证码请检查垃圾箱。",
      });
    } catch (error: any) {
      const errorMessage =
        error?.data?.errors?.email?.[0] || error?.data?.message;
      toast({
        variant: "destructive",
        title: t("请求失败"),
        description: errorMessage,
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleForgotPwd)}
        className="grid gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} autoComplete="email" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification code</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input {...field} autoComplete="one-time-code" />
                  <Button
                    type="button"
                    onClick={handleSendMailcode}
                    disabled={sendMailcode}
                  >
                    {sendMailcode ? countdownSeconds : t("发送")}
                  </Button>
                </div>
              </FormControl>

              <FormDescription className="text-xs sm:text-sm">
                {t("请输入发送到您邮箱的一次性验证码")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" autoComplete="new-password" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="check_pwd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>

              <FormControl>
                <Input {...field} type="password" autoComplete="new-password" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <KeyRound className="mr-2 h-4 w-4" />
              {t("重置密码")}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
