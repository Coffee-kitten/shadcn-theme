import { useTranslation } from "react-i18next";

import { ModeToggle } from "@/components/mode-toggle";
import { I18n } from "@/components/i18n";
import { FormForgotPwd } from "@/views/auth/forms/FormForgot-pwd";

export const ForgotPwd = () => {
  //   const { id } = useParams();

  const { t } = useTranslation();

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2">
        <h1 className="text-2xl lg:text-3xl font-bold">重置密码</h1>
        <p className="text-sm lg:text-base text-balance text-muted-foreground">
          我们将往阁下邮箱发送验证码
        </p>
      </div>
      <FormForgotPwd />
      <div className="-mt-1 text-center text-sm opacity-75">
        <a href="/#/login">{t("前往登录")}</a>
      </div>
    </div>
  );
};
