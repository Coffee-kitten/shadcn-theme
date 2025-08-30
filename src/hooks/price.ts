export const periodMap: Record<string, string> = {
  month_price: "月",
  quarter_price: "季",
  half_year_price: "半年",
  year_price: "年",
  onetime_price: "一次性",
};
export const OrderperiodMap: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(periodMap).map(([key, value]) => [
      key,
      key === "onetime_price" ? value : value + "付",
    ])
  ),
  reset_price: "重置包",
};

// 获取可用的周期
export const availablePeriods = (plan: any) => {
  return Object.keys(plan)
    .filter((key) => key in periodMap && plan[key])
    .map((key) => ({
      key,
      period: periodMap[key],
      price: (plan[key] / 100).toFixed(2),
    }));
};
