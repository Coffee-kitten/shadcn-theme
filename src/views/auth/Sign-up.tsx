import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import FormSignUp from "@/views/auth/forms/formSign-up";

import { signUpGet } from "@/api/auth";

import { useV2boardUserData } from "@/store/index";

import { SignUpLoading } from "@/views/auth/SignUpLoading";
import { Separator } from "@/components/ui/separator";
import { useFetchMultipleData } from "@/hooks/use-fetch-data";
export function SignUp() {
  //   const { id } = useParams();

  const store = useV2boardUserData();

  const { fetchAllData, isLoading } = useFetchMultipleData([
    {
      fetchFn: signUpGet,
      setDataFn: store.setRegisterData,
    },
  ]);
  useEffect(() => {
    fetchAllData();
  }, []);

  const { t } = useTranslation();
  if (isLoading) {
    return <SignUpLoading />;
  }
  return (
    <div className="mx-auto grid w-[350px] gap-6 px-2">
      <div className="grid gap-0.5 text-center">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
          {t("快速获取服务", { appName: import.meta.env.VITE_APP_NAME })}
        </h3>
        <p className="text-sm lg:text-base text-balance text-muted-foreground leading-7">
          Sign up in seconds!
        </p>
      </div>
      <Separator />
      <FormSignUp />
      <div className="-mt-2 space-x-1 text-center text-sm opacity-85">
        {t("已经拥有账户")}{" "}
        <a href="/#/login" className="opacity-75 underline">
          {t("登入")}
        </a>
      </div>
      <div className="text-center text-xs text-muted-foreground">
        <p>© 2021 {import.meta.env.VITE_APP_NAME}. All rights reserved.</p>
      </div>
    </div>
  );
}
