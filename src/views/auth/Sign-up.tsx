import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ModeToggle } from "@/components/mode-toggle";
import { I18n } from "@/components/i18n";
import FormSignUp from "@/views/auth/forms/formSign-up";

import { signUpGet } from "@/api/auth";

import { useV2boardUserData } from "@/store/index";

import { toast } from "@/components/ui/use-toast";
import { SignUpLoading } from "@/views/auth/SignUpLoading";

export function SignUp() {
  //   const { id } = useParams();

  const store = useV2boardUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setRegisterData((await signUpGet()).data);
      } catch {
        toast({
          variant: "destructive",
          title: t("请求失败"),
          description: t("遇到了一些问题"),
        });
      }
    };

    fetchData();
  }, []);

  const { t } = useTranslation();
  if (!store.registerData.data) {
    return <SignUpLoading />;
  }
  return (
    <div className="m-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {t("快速获取OnePixel服务")}
        </h3>
        <p className="text-sm lg:text-base text-balance text-muted-foreground leading-7">
          Sign up in seconds!
        </p>
      </div>
      <FormSignUp />
      <div className="-mt-2 space-x-1 text-center text-sm opacity-85">
        {t("已经拥有账户")}{" "}
        <a href="/#/login" className="opacity-75 underline">
          {t("登入")}
        </a>
      </div>
    </div>
  );
}
