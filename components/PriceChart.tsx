"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Loader2 } from "lucide-react";
import { getPriceHistory } from "@/app/auth/actions";
import { useTheme } from "next-themes";

type PriceChartProps = {
  productId: string;
};

type PriceChartPoint = {
  date: string;
  price: number;
};

export default function PriceChart({ productId }: PriceChartProps) {
  const [data, setData] = useState<PriceChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const gridColor = isDark ? "#3f3f46" : "#e5e7eb";
  const axisColor = isDark ? "#a1a1aa" : "#9ca3af";
  const tooltipBg = isDark ? "#18181b" : "#ffffff";
  const tooltipBorder = isDark ? "#3f3f46" : "#e5e7eb";
  const accentColor = "#FA5D19";

  useEffect(() => {
    async function loadData() {
      const history = await getPriceHistory(productId);

      const chartData = history.map((item) => ({
        date: new Date(item.checked_at).toLocaleDateString(),
        price: parseFloat(item.price),
      }));

      setData(chartData);
      setLoading(false);
    }

    loadData();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center py-8 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading chart...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full py-8 text-center text-muted-foreground">
        No price history yet. Check back after the first daily update!
      </div>
    );
  }

  return (
    <div className="w-full">
      <h4 className="mb-4 text-sm font-semibold text-muted-foreground">
        Price History
      </h4>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke={axisColor} />
          <YAxis tick={{ fontSize: 12 }} stroke={axisColor} width={42} />
          <Tooltip
            contentStyle={{
              backgroundColor: tooltipBg,
              border: `1px solid ${tooltipBorder}`,
              borderRadius: "6px",
              color: axisColor,
            }}
            labelStyle={{ color: axisColor }}
            itemStyle={{ color: accentColor }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={accentColor}
            strokeWidth={2}
            dot={{ fill: accentColor, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}