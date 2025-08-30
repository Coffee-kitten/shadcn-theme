import { useTranslation } from "react-i18next";

import { ModeToggle } from "@/components/mode-toggle";
import { I18n } from "@/components/i18n";
import { FormSignIn } from "@/views/auth/forms/formSign-in";

export function SignIn() {
  //   const { id } = useParams();

  const { t } = useTranslation();

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-2xl lg:text-3xl font-bold">{t("欢迎回来")}</h1>
        <p className="text-sm lg:text-base text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <FormSignIn />
      <div className="-mt-2 space-x-1 text-center text-sm opacity-85">
        <span>{t("没有账户")} </span>
        <a href="/#/register" className="underline opacity-75">
          {t("立即注册")}
        </a>
      </div>
    </div>
  );
}
