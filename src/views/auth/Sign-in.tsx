import { useTranslation } from "react-i18next";

import { ModeToggle } from "@/components/mode-toggle";
import I18n from "@/components/i18n";
import { FormSignIn } from "@/views/auth/forms/formSign-in";

export function SignIn() {
  //   const { id } = useParams();

  const { t } = useTranslation();

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-screen">
      <div className="hidden bg-muted lg:block">
        <img
          src="/bg.jpeg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center py-12 h-full">
        <div className="absolute top-10 w-full flex justify-between lg:w-1/2">
          <div className="pl-10">
            <I18n />
          </div>
          <div className="pr-10">
            <ModeToggle />
          </div>
        </div>
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">{t("欢迎回来")}</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <FormSignIn />
          <div className="mt-4 text-center text-sm">
            {t("没有账户")}{" "}
            <a href="/#/register" className="underline">
              {t("立即注册")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
