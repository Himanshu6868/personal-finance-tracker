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
import { useState } from "react";
import {
  CreateBudgetForTheMonth,
  updateBudgetAction,
} from "../api/budget/route";
import { addExpense } from "../api/expenses/route";
import { DashboardTabs } from "./nav-tabs";

interface Expense {
  id: string;
  amount: number;
  description: string;
  expense_date: string;
  categories?: { name: string };
}

export default function DashboardUI({
  user,
  initialExpenses,
  initialBudget,
  categories,
}: {
  user: any;
  initialExpenses: Expense[];
  initialBudget: number;
  categories: { id: string; name: string }[];
}) {
  const [categoryId, setCategoryId] = useState("");

  const totalSpent = initialExpenses.reduce((s, e) => s + e.amount, 0);
  const remaining = initialBudget ? initialBudget - totalSpent : 0;

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">FinanceTracker</h1>

        <div className="flex items-center gap-4">
          Hey, {user?.user_metadata?.full_name}
          <LogoutButton />
        </div>
      </header>

      <DashboardTabs />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard title="Monthly Budget" value={`Rs. ${initialBudget}`} />
        <SummaryCard
          title="Total Expenses"
          value={`Rs. ${totalSpent}`}
          valueClass="text-red-500"
        />
        <SummaryCard
          title="Remaining"
          value={`Rs. ${remaining}`}
          valueClass="text-green-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form action={addExpense}>
          <Card>
            <CardHeader>
              <CardTitle>Add Expense</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Amount */}
              <Input
                name="amount"
                placeholder="Amount"
                type="number"
                required
              />

              {/* Category Select */}
              <input type="hidden" name="category_id" value={categoryId} />

              <Select onValueChange={setCategoryId} value={categoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Description */}
              <Input
                name="description"
                placeholder="Description"
                // value={description}
                // onChange={(e) => setDescription(e.target.value)}
              />

              <Button type="submit" disabled={!categoryId}>
                Add Expense
              </Button>
            </CardContent>
          </Card>
        </form>

        <form action={CreateBudgetForTheMonth}>
          <Card>
            <CardHeader>
              <CardTitle>Add Budget</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                placeholder="Monthly Budget"
                name="budget_amount"
                disabled={initialBudget ? true : false}
                defaultValue={initialBudget}
              />
              <Button
                variant="outline"
                type="submit"
                disabled={initialBudget ? true : false}
              >
                Add Budget
              </Button>
            </CardContent>
          </Card>
        </form>

        <form action={updateBudgetAction}>
          <Card>
            <CardHeader>
              <CardTitle>Update Budget</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input placeholder="Monthly Budget" name="budget_amount" />
              <Button variant="outline" type="submit">
                Update Budget
              </Button>
            </CardContent>
          </Card>
        </form>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>

          <CardContent>
            {initialExpenses.length === 0 ? (
              <p>No expenses yet</p>
            ) : (
              initialExpenses.map((e) => (
                <div key={e.id} className="flex justify-between py-2">
                  <span>
                    {e.categories?.name} — {e.description}
                  </span>
                  <span>Rs. {e.amount}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
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
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
      </CardContent>
    </Card>
  );
}
