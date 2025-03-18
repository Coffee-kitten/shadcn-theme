import { useState, toast, useTranslation } from "@/utils/common-imports";
type FetchFunction<T> = () => Promise<{ data: T }>;
type SetDataFunction<T> = (data: T) => void;

/**
 * 批量获取多个数据的 Hook
 * @param fetchActions 数据获取动作数组，每个元素包含获取函数和设置函数
 */
export const useFetchMultipleData = (
  fetchActions: Array<{
    fetchFn: FetchFunction<any>;
    setDataFn: SetDataFunction<any>;
  }>
) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const fetchAllData = async () => {
    try {
      setIsLoading(true);
      const results = await Promise.all(
        fetchActions.map(({ fetchFn }) => fetchFn())
      );

      fetchActions.forEach(({ setDataFn }, index) => {
        setDataFn(results[index].data);
      });
      setIsLoading(false);
    } catch (error: any) {
      // 根据错误类型设置不同的提示信息
      const isTimeout = error.includes("timeout");
      toast({
        variant: "destructive",
        title: isTimeout ? t("请求超时") : t("请求失败"),
        description: isTimeout
          ? t("请尝试重新请求")
          : error.data.message || t("遇到了一些问题"),
      });
    }
  };

  return { fetchAllData, isLoading };
};
