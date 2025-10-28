import { useTranslation } from "react-i18next";

import { FormSignIn } from "@/views/auth/forms/formSign-in";
import { Separator } from "@/components/ui/separator";

import { Link } from "react-router-dom";
export default function SignIn() {
  //   const { id } = useParams();

  const { t } = useTranslation();

  return (
    <div className="mx-auto grid w-[350px] gap-6 px-2">
      <div className="grid gap-2 text-center">
        <h1 className="text-2xl lg:text-3xl font-bold">{t("欢迎回来")}</h1>
        <p className="text-sm lg:text-base text-balance text-muted-foreground">
          Type your email to continue.
        </p>
      </div>
      <Separator />
      <FormSignIn />
      <div className="-mt-2 space-x-1 text-center text-sm opacity-85">
        <span>{t("没有账户")} </span>
        <Link to="/register" className="underline opacity-75">
          {t("立即注册")}
        </Link>
      </div>
      <div className="text-center text-xs text-muted-foreground">
        <p>© 2021 {import.meta.env.VITE_APP_NAME}. All rights reserved.</p>
      </div>
    </div>
  );
}
