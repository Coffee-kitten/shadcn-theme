import { useState, toast, useTranslation } from "@/utils/common-imports";

/**
 * 批量获取多个数据的 Hook
 * @param fetchActions 数据获取动作数组，每个元素包含获取函数和设置函数
 */
export const useFetchMultipleData = (
  fetchActions: Array<{
    fetchFn: () => Promise<any>;
    setDataFn?: (data: any) => void;
  }>
) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const fetchAllData = async (silent: boolean = false) => {
    try {
      if (!silent) {
        setIsLoading(true);
      }
      const results = await Promise.all(
        fetchActions.map(({ fetchFn }) => fetchFn())
      );

      fetchActions.forEach(({ setDataFn }, index) => {
        if (setDataFn) {
          setDataFn(results[index].data);
        }
      });
      if (!silent) {
        setIsLoading(false);
      }
    } catch (error: any) {
      handleError(error, t);
    }
  };

  return { fetchAllData, isLoading };
};

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
