import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ModeToggle } from "@/components/mode-toggle";
import I18n from "@/components/i18n";
import FormSignUp from "@/views/auth/forms/formSign-up";

import { signUpGet } from "@/api/auth";

import { useV2boardUserData } from "@/store/index";

import { toast } from "@/components/ui/use-toast";
import Loading from "@/views/Loading";

export default function SignUp() {
  //   const { id } = useParams();

  const store = useV2boardUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        store.setIsLoading(true);
        store.setRegisterData((await signUpGet()).data);
      } catch {
        toast({
          variant: "destructive",
          title: t("请求失败"),
          description: t("遇到了一些问题"),
        });
      } finally {
        store.setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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
            <h1 className="text-3xl font-bold">{t("快速获取OnePixel服务")}</h1>
            <p className="text-balance text-muted-foreground">
              Sign up in seconds!
            </p>
          </div>
          {store.registerData.data ? <FormSignUp /> : <Loading />}
          <div className="mt-4 text-center text-sm">
            {t("已经拥有账户")}{" "}
            <a href="/#/login" className="underline">
              {t("登入")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
