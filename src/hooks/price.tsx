import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export const usePeriodMap = () => {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      month_price: { short: t("月"), long: t("月度") },
      quarter_price: { short: t("季"), long: t("季度") },
      half_year_price: { short: t("半年"), long: t("半年度") },
      year_price: { short: t("年"), long: t("年度") },
      onetime_price: { short: t("一次性"), long: t("一次性") },
      reset_price: { short: t("重置包"), long: t("重置包") },
    }),
    [t]
  );
};

export const useAvailablePeriods = (plan: any) => {
  const periodMap = usePeriodMap();
  return Object.keys(plan)
    .filter((key) => key in periodMap && plan[key] && key != "reset_price")
    .map((key) => ({
      key,
      period: periodMap[key as keyof typeof periodMap],
      price: (plan[key] / 100).toFixed(2),
    }));
};
