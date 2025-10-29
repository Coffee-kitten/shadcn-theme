//
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as ToastContainer } from "@/components/ui/sonner";

//
import { Routers } from "@/routers/index.tsx";

import { SWRConfig } from "swr";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

export function App() {
  const { t } = useTranslation();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SWRConfig
        value={{
          onError: (error) => {
            const isTimeout = error?.message?.includes("timeout");
            toast({
              variant: "destructive",
              title: isTimeout ? t("请求超时") : t("请求失败"),
              description: isTimeout
                ? t("请尝试重新请求")
                : error.data?.errors?.period?.[0] ||
                  error.data?.message ||
                  error.message ||
                  t("遇到了一些问题"),
            });
          },
        }}
      >
        <Routers />
      </SWRConfig>
      <Toaster />

      <ToastContainer
        position="top-center"
        closeButton
        richColors
        expand={true}
      />
    </ThemeProvider>
  );
}
