import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signInPost } from "@/api/auth";
import { useTranslation } from "react-i18next";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LogIn } from "lucide-react";
export function FormSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const form = useForm({
    defaultValues: {
      email: "test@com",
      password: "1234567899",
    },
  });

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInPost(form.getValues("email"), form.getValues("password"));
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
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignIn)} className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} autoComplete="email" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Password{" "}
                <a
                  href="/#/forgot-password"
                  className="ml-auto inline-block text-xs sm:text-sm underline opacity-75"
                >
                  {t("忘记密码")}
                </a>
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <ReloadIcon className="mr-2 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <LogIn className="mr-2" />
              {t("登入")}
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
