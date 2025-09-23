import { useTranslation } from "react-i18next";
import { FormForgotPwd } from "@/views/auth/forms/FormForgot-pwd";
import { Separator } from "@/components/ui/separator";
export const ForgotPwd = () => {
  //   const { id } = useParams();

  const { t } = useTranslation();

  return (
    <div className="mx-auto grid w-[350px] gap-6 px-2">
      <div className="grid gap-2">
        <h1 className="text-2xl lg:text-3xl font-extrabold">{t("重置密码")}</h1>
        <p className="text-sm lg:text-base text-balance text-muted-foreground">
          {t("我们将往阁下邮箱发送验证码")}
        </p>
      </div>
      <Separator />
      <FormForgotPwd />
      <div className="-mt-1 text-center text-sm opacity-75">
        <a href="/#/login">{t("前往登录")}</a>
      </div>
      <div className="text-center text-xs text-muted-foreground">
        <p>© 2021 {import.meta.env.VITE_APP_NAME}. All rights reserved.</p>
      </div>
    </div>
  );
};
