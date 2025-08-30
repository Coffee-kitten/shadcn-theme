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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { signUpPost, signUpMailPost } from "@/api/auth";
import { useTranslation } from "react-i18next";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LogIn } from "lucide-react";
import { useV2boardUserData } from "@/store/index";
export default function FormSignUp() {
  const store = useV2boardUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [sendMailcode, setSendMailcode] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(60);
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      email: "",
      email_domain: "",
      email_code: "",
      password: "",
      check_pwd: "",
      invite_code: "",
    },
  });

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      if (form.getValues("password") == form.getValues("check_pwd")) {
        await signUpPost(
          form.getValues("email") + form.getValues("email_domain"),
          form.getValues("password"),
          form.getValues("email_code"),
          form.getValues("invite_code")
        );
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
  const handleSignUp_Mail = async () => {
    try {
      await signUpMailPost(
        form.getValues("email") + form.getValues("email_domain")
      );
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
      <form onSubmit={form.handleSubmit(handleSignUp)} className="grid gap-4">
        {!!store.registerData.data.email_whitelist_suffix ? (
          <>
            <FormLabel>Email</FormLabel>
            <div className="flex">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-[2_1_]">
                    <FormControl>
                      <Input
                        type="text"
                        className="rounded-r-none"
                        {...field}
                        autoComplete="email"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email_domain"
                render={({ field }) => (
                  <FormItem className="flex-[1_1]">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-l-none">
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {store.registerData.data.email_whitelist_suffix.map(
                          (suffix: any, index: any) => (
                            <SelectItem key={index} value={"@" + suffix}>
                              {"@" + suffix}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormDescription className="text-xs sm:text-sm">
              {t("你的邮箱必须符合下拉框中的选项")}
            </FormDescription>
          </>
        ) : (
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
        )}

        {!!store.registerData.data.is_email_verify && (
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
                      onClick={handleSignUp_Mail}
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
        )}

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
        <FormField
          control={form.control}
          name="invite_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invitation code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={
                    t("邀请码") +
                    (store.registerData.data.is_invite_force ? "" : t("选填"))
                  }
                  autoComplete="off"
                />
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
              <LogIn className="mr-2 h-4 w-4" />
              {t("注册")}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
