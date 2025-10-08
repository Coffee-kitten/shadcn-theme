import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegendContent,
  ChartLegend,
} from "@/components/ui/chart";
import { useV2boardUserData } from "@/store/index";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { ChartArea } from "lucide-react";
export function Card5() {
  const { t } = useTranslation();
  const formatBytesAuto = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k)); // 计算单位索引
    const value = bytes / Math.pow(k, i);

    return `${value.toFixed(decimals)} ${sizes[i]}`;
  };

  // const formatGB = (bytes: number, decimals = 2) => {
  //   return (bytes / 1024 ** 3).toFixed(decimals);
  // };
  const chartConfig = {
    views: {
      label: "PageView",
    },
    u: {
      label: t("实际上行流量"),
      color: "hsl(var(--chart-1))",
    },
    d: {
      label: t("实际下行流量"),
      color: "hsl(var(--chart-2))",
    },
    // total: {
    //   label: t("总计"),
    //   color: "hsl(var(--chart-2))",
    // },
  } satisfies ChartConfig;

  const store = useV2boardUserData();
  // const chartData = Array.from(
  //   store.trafficLogData.data
  //     .reduce((map: any, item: any) => {
  //       const date = item.record_at;
  //       const { u, d } = item;
  //       // if (!map.has(date)) {
  //       map.set(date, {
  //         date: dayjs.unix(date).format("YYYY-MM-DD"),
  //         u: 0,
  //         d: 0,
  //       });
  //       // }
  //       map.get(date).u += u;
  //       map.get(date).d += d;
  //       // map.get(date).total = map.get(date).u + map.get(date).d;

  //       return map;
  //     }, new Map())
  //     .values()
  // ).reverse();
  const chartData = store.trafficLogData.data
    .map((item: any) => ({
      date: dayjs.unix(item.record_at).format("YYYY-MM-DD"),
      u: item.u,
      d: item.d,
    }))
    .reverse();
  // 调试输出数据结构
  // const chartDataGB = chartData.map((item) => ({
  //   ...item,
  //   u: item.u / 1024 ** 3,
  //   d: item.d / 1024 ** 3,
  // }));
  return (
    <div className="rounded-xl border text-card-foreground shadow bg-muted/25 p-4 md:p-6 overflow-clip group transition-all duration-300 hover:shadow-lg hover:bg-muted/40 flex items-start justify-between">
      <div className="shrink-0 mt-auto">
        <div className="text-sm md:text-xl font-medium line-clamp-1">
          {t("流量记录")}
        </div>
      </div>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[238px] w-full px-4"
      >
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-d)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-d)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-u)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-u)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={true} horizontal={false} />
          <XAxis
            dataKey="date"
            tickLine={true}
            axisLine={false}
            tickMargin={8}
            minTickGap={16}
            // tickFormatter={(value) => {
            //   // 如果是时间戳，需要转换为毫秒
            //   const date = new Date(value);
            //   return date.toLocaleDateString("en-US", {
            //     month: "short",
            //     day: "numeric",
            //     year: "numeric",
            //   });
            // }}
          />
          <YAxis
            hide={true}
            domain={[0, (dataMax: number) => dataMax * 3]} // 数据最大值显示为Y轴的1/3
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value, name) => {
                  return (
                    <div className="flex gap-2 items-center">
                      <span className="flex gap-1 items-center">
                        <span
                          className="size-3 shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]"
                          style={
                            {
                              "--color-bg": `var(--color-${name})`,
                              "--color-border": `var(--color-${name})`,
                            } as React.CSSProperties
                          }
                        />
                        <span className="font-medium">
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label || name}
                        </span>
                      </span>
                      <span>{formatBytesAuto(Number(value))}</span>
                    </div>
                  );
                }}
              />
            }
            cursor={false}
            defaultIndex={1}
          />

          <Area
            dataKey="u"
            type="natural"
            fill="url(#fillMobile)"
            stroke="var(--color-u)"
            stackId="a"
          />
          <Area
            dataKey="d"
            type="natural"
            fill="url(#fillDesktop)"
            stroke="var(--color-d)"
            stackId="a"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
      <ChartArea className="primary/75" />
    </div>
  );
}
