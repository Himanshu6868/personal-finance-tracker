"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    LineChart,
    Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { LineChart } from "lucide-react";

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
                <ResponsiveContainer width="50%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />

                        {/* X-axis: category */}
                        <XAxis
                            dataKey="category"
                            tick={{ fontSize: 12 }}
                            interval={0}
                            padding={{ left: 24, right: 24 }}

                        />

                        {/* Y-axis: amount */}
                        <YAxis />

                        {/* Calm tooltip */}
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
                            dot={{ r: 3 }}
                            activeDot={{ r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

    );

}
