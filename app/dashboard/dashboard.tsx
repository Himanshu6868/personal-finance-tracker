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
import { useState } from "react";
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
}: {
  user: any;
  initialExpenses: Expense[];
  initialBudget: number;
}) {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [budget, setBudget] = useState(initialBudget);

  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [budgetInput, setBudgetInput] = useState("");

  const totalSpent = expenses.reduce((s, e) => s + e.amount, 0);
  const remaining = budget - totalSpent;

  // ---------- ADD EXPENSE ----------
  const addExpense = async () => {
    if (!amount || !categoryId) return;

    await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify({
        amount: Number(amount),
        category_id: categoryId,
        description,
      }),
    });

    const res = await fetch("/api/expenses");
    setExpenses(await res.json());

    setAmount("");
    setDescription("");
  };

  // ---------- UPDATE BUDGET ----------
  const updateBudget = async () => {
    await fetch("/api/budget", {
      method: "POST",
      body: JSON.stringify({
        budget_amount: Number(budgetInput),
      }),
    });

    const res = await fetch("/api/budget");
    const data = await res.json();
    setBudget(data?.budget_amount || 0);

    setBudgetInput("");
  };

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
        <SummaryCard title="Monthly Budget" value={`$${budget}`} />
        <SummaryCard title="Total Expenses" value={`$${totalSpent}`} valueClass="text-red-500" />
        <SummaryCard title="Remaining" value={`$${remaining}`} valueClass="text-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Input
              placeholder="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <Select onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food-id">Food</SelectItem>
                <SelectItem value="petrol-id">Petrol</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button onClick={addExpense}>Add Expense</Button>

            <Separator />

            <Input
              placeholder="Monthly Budget"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
            />
            <Button variant="outline" onClick={updateBudget}>
              Update Budget
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>

          <CardContent>
            {expenses.length === 0 ? (
              <p>No expenses yet</p>
            ) : (
              expenses.map((e) => (
                <div key={e.id} className="flex justify-between py-2">
                  <span>{e.categories?.name} — {e.description}</span>
                  <span>${e.amount}</span>
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
