"use client";

import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DashboardTabs } from "./nav-tabs";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold flex items-center gap-2">
          FinanceTracker
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            Welcome, Himanshu
          </span>
          <LogoutButton />
        </div>
      </header>

      {/* Tabs */}
      <DashboardTabs />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Monthly Budget"
          value="$25000.00"
          valueClass="text-foreground"
        />
        <SummaryCard
          title="Total Expenses"
          value="$0.00"
          valueClass="text-red-500"
        />
        <SummaryCard
          title="Remaining"
          value="$25000.00"
          valueClass="text-green-500"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Expense */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
            <p className="text-sm text-muted-foreground">
              Record a new expense
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input placeholder="0.00" type="number" />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="petrol">Petrol</SelectItem>
                  <SelectItem value="misc">Miscellaneous</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Description</label>
              <Input placeholder="What did you buy?" />
            </div>

            <Button className="w-full">+ Add Expense</Button>

            <Separator />

            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium">
                  Update Monthly Budget
                </label>
                <Input placeholder="25000" />
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
            <p className="text-sm text-muted-foreground">
              Your latest transactions
            </p>
          </CardHeader>

          <CardContent className="flex items-center justify-center h-[240px]">
            <p className="text-sm text-muted-foreground">
              No expenses yet. Add your first expense!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense by Category</CardTitle>
          <p className="text-sm text-muted-foreground">
            See where your money goes
          </p>
        </CardHeader>

        <CardContent className="flex items-center justify-center h-[200px]">
          <p className="text-sm text-muted-foreground">No category data yet</p>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  valueClass,
}: {
  title: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
