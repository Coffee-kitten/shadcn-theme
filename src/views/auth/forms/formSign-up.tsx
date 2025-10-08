import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function FormSignUp() {
  const store = useV2boardUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [sendMailcode, setSendMailcode] = useState(false);
  const [tosAgreed, setTosAgreed] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(60);
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const codeFromQuery = searchParams.get("code");
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm({
    defaultValues: {
      email: "",
      email_domain: "",
      email_code: "",
      password: "",
      check_pwd: "",
      invite_code: codeFromQuery || "",
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
        toast({
          title: t("注册成功"),
          description: t("无声，却始终可靠"),
        });
        navigate("/dashboard", { replace: true });
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
        description: t("如果没有收到验证码请检查垃圾箱。"),
      });
    } catch (error: any) {
      const errorMessage =
        error?.data?.errors?.email?.[0] ||
        error?.data?.message ||
        error?.message;
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
        {currentStep === 1 && (
          <>
            {!!store.registerData.data.email_whitelist_suffix ? (
              <>
                <FormLabel>{t("邮箱地址")}</FormLabel>
                <div className="flex gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-[2_1_]">
                        <FormControl>
                          <Input type="text" {...field} autoComplete="email" />
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
                            <SelectTrigger>
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
                <FormDescription>
                  {t("阁下邮箱必须符合下拉框选项")}
                </FormDescription>
              </>
            ) : (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("邮箱地址")}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} autoComplete="email" />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="invite_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("邀请码") +
                      (store.registerData.data.is_invite_force
                        ? ""
                        : t("可选"))}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="off"
                      disabled={!!codeFromQuery}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {!!store.registerData.data.is_email_verify ? (
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={
                  !form.getValues("email") ||
                  (store.registerData.data.is_invite_force &&
                    !form.getValues("invite_code")) ||
                  !form.getValues("email_domain")
                }
              >
                {t("继续")}
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={
                  !form.getValues("email") ||
                  (store.registerData.data.is_invite_force &&
                    !form.getValues("invite_code")) ||
                  !form.getValues("email_domain")
                }
              >
                {t("继续")}
              </Button>
            )}
          </>
        )}

        {!!store.registerData.data.is_email_verify && currentStep == 2 && (
          <>
            <FormField
              control={form.control}
              name="email_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("邮箱验证码")}</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        {...field}
                        type="number"
                        autoComplete="one-time-code"
                      />
                      <Button
                        type="button"
                        onClick={handleSignUp_Mail}
                        disabled={sendMailcode}
                      >
                        {sendMailcode ? countdownSeconds : t("发送")}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-[1]"
                onClick={() => setCurrentStep(1)}
              >
                {t("返回")}
              </Button>
              <Button
                className="flex-[2]"
                onClick={() => setCurrentStep(3)}
                disabled={!form.getValues("email_code")}
              >
                {t("继续")}
              </Button>
            </div>
          </>
        )}

        {currentStep == 3 && (
          <>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("密码")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="check_pwd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("确认密码")}</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      autoComplete="new-password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {!!store.registerData.data.tos_url && (
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="tos"
                  checked={tosAgreed}
                  onCheckedChange={(checked) => setTosAgreed(checked === true)}
                />
                <label htmlFor="tos" className="text-sm text-muted-foreground">
                  {t("我已阅读并同意")}{" "}
                  <a
                    href={store.registerData.data.tos_url}
                    target="_blank"
                    className="font-medium text-primary hover:underline"
                  >
                    {t("服务条款")}
                  </a>
                </label>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-[1]"
                onClick={() => setCurrentStep(2)}
              >
                {t("返回")}
              </Button>
              <Button
                className="flex-[3]"
                type="submit"
                disabled={
                  isLoading ||
                  !form.getValues("password") ||
                  !form.getValues("check_pwd") ||
                  (!!store.registerData.data.tos_url && !tosAgreed)
                }
              >
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
            </div>
          </>
        )}
      </form>
    </Form>
  );
}
