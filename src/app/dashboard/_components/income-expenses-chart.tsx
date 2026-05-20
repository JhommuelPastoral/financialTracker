"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"

const chartData = [
  { month: "January", income: 42000, expenses: 28000 },
  { month: "February", income: 38000, expenses: 31000 },
  { month: "March", income: 45000, expenses: 26000 },
  { month: "April", income: 39000, expenses: 34000 },
  { month: "May", income: 52000, expenses: 30000 },
  { month: "June", income: 48000, expenses: 36000 },
  { month: "July", income: 61000, expenses: 42000 },
  { month: "August", income: 58000, expenses: 39000 },
  { month: "September", income: 54000, expenses: 41000 },
  { month: "October", income: 63000, expenses: 45000 },
  { month: "November", income: 70000, expenses: 48000 },
  { month: "December", income: 85000, expenses: 52000 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function IncomeExpenses() {
  return (
    <Card className="bg-[#1D1816] text-white">
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="w-full flex justify-start items-start">
        <ChartContainer config={chartConfig} className="min-h-50 max-h-80 w-full ">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#aaa", fontSize: 12 }}
              ticks={[0, 20000, 40000, 60000, 80000, 100000]}
              domain={[0, 100000]}
              tickFormatter={(value) => `₱${value / 1000}k`}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" labelClassName="text-black"/>}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
