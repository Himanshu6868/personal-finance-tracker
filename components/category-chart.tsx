"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CategoryChart({
  data,
}: {
  data: { category: string; total: number }[];
}) {
  if (!data.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-sm text-muted-foreground">
          No category data available
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses by Category</CardTitle>
      </CardHeader>

      <CardContent className="h-[320px]">
        {/* Scroll wrapper */}
        <div className="relative -mx-2 sm:mx-0">
          <div className="overflow-x-auto">
            <div className="min-w-[600px] h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="category"
                    interval={0}
                    // angle={-35}
                    textAnchor="end"
                    height={70}
                    tick={{ fontSize: 12 }}
                    padding={{ left: 24, right: 24 }}
                  />

                  <YAxis tick={{ fontSize: 12 }} />

                  <Tooltip
                    cursor={{ stroke: "transparent" }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      fontSize: "12px",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#9ca3af"
                    strokeWidth={3}
                    dot={{ r: 2 }}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
