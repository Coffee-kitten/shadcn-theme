import { toast, useTranslation } from "@/utils/common-imports";
/**
 * 单个数据获取的 Hook
 * @returns 返回一个可以获取数据的函数
 */
export const useFetchData = () => {
  const { t } = useTranslation();

  return async (fetchFn: () => Promise<any>) => {
    try {
      const results = await fetchFn();
      return results.data;
    } catch (error) {
      handleError(error, t);
      return null;
    }
  };
};

// 错误处理辅助函数
const handleError = (error: any, t: (key: string) => string) => {
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
};
