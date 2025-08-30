"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useV2boardUserData } from "@/store/index";
import dayjs from "dayjs";

const chartConfig = {
  views: {
    label: "PageView",
  },
  u: {
    label: "上传",
    color: "hsl(var(--chart-1))",
  },
  d: {
    label: "下载",
    color: "hsl(var(--chart-3))",
  },
  total: {
    label: "总计",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Card5() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("u");

  const store = useV2boardUserData();
  const chartData = Array.from(
    store.trafficLogData.data
      .reduce((map: any, item: any) => {
        const date = item.record_at;
        const { u, d } = item;
        if (!map.has(date)) {
          map.set(date, {
            date: dayjs.unix(date).format("YYYY-MM-DD"),
            u: 0,
            d: 0,
            total: 0,
          });
        }
        map.get(date).u += u;
        map.get(date).d += d;
        map.get(date).total = map.get(date).u + map.get(date).d;

        return map;
      }, new Map())
      .values()
  );

  const total = React.useMemo(
    () => ({
      u: chartData.reduce((acc, curr: any) => acc + curr.u, 0),
      d: chartData.reduce((acc, curr: any) => acc + curr.d, 0),
      total: chartData.reduce((acc, curr: any) => acc + curr.total, 0),
    }),
    []
  );
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>流量使用记录</CardTitle>
          <CardDescription>单位 / GB</CardDescription>
        </div>
        <div className="flex">
          {["u", "d", "total"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {(total as any)[key]
                    ? ((total as any)[key] / Math.pow(1024, 3)).toFixed(3)
                    : "N/A"}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={(item) => item[activeChart] / Math.pow(1024, 3)}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
