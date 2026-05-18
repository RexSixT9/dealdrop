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
import { useTheme } from "next-themes";

type PriceChartProps = {
  productId: string;
};

type PriceChartPoint = {
  date: string;
  price: number;
};

type PriceHistoryResponse = {
  history: Array<{
    checked_at: string;
    price: number | string;
  }>;
};

const HISTORY_CACHE_TTL = 30_000;

const priceHistoryCache = new Map<
  string,
  {
    fetchedAt: number;
    promise: Promise<PriceChartPoint[]>;
  }
>();

async function fetchPriceHistory(productId: string) {
  const cached = priceHistoryCache.get(productId);

  if (cached && Date.now() - cached.fetchedAt < HISTORY_CACHE_TTL) {
    return cached.promise;
  }

  const request = fetch(`/api/products/${encodeURIComponent(productId)}/history`, {
    method: "GET",
    credentials: "include",
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to load chart data (${response.status})`);
      }

      const payload = (await response.json()) as PriceHistoryResponse;

      return payload.history.map((item) => ({
        date: new Date(item.checked_at).toLocaleDateString(),
        price: Number(item.price),
      }));
    })
    .catch((error) => {
      if (priceHistoryCache.get(productId)?.promise === request) {
        priceHistoryCache.delete(productId);
      }

      throw error;
    });

  priceHistoryCache.set(productId, {
    fetchedAt: Date.now(),
    promise: request,
  });

  return request;
}

export default function PriceChart({ productId }: PriceChartProps) {
  const [data, setData] = useState<PriceChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === "dark";
  const gridColor = isDark ? "#3f3f46" : "#e5e7eb";
  const axisColor = isDark ? "#a1a1aa" : "#9ca3af";
  const tooltipBg = isDark ? "#18181b" : "#ffffff";
  const tooltipBorder = isDark ? "#3f3f46" : "#e5e7eb";
  const accentColor = "#FA5D19";

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const chartData = await fetchPriceHistory(productId);

        if (!cancelled) {
          setData(chartData);
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(
            fetchError instanceof Error
              ? fetchError.message
              : "Failed to load chart data.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center py-8 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading chart...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 text-center text-sm text-muted-foreground">
        {error}
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