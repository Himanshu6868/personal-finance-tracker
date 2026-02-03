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
import { CreateBudgetForTheMonth } from "@/app/actions/budget.actions";

import type { User } from "@supabase/supabase-js";
import { updateBudgetAction } from "@/app/actions/budget.actions";
import { addExpense, deleteExpense } from "@/app/actions/expenses.actions";
import { DashboardTabs } from "@/components/nav-tabs";
import AddCategoryButton from "@/components/add-category-button";
import type { DashboardExpense } from "@/types";
import Image from "next/image";

export default function DashboardUI({
  user,
  initialExpenses,
  initialBudget,
  categories,
}: {
  user: User;
  initialExpenses: DashboardExpense[];
  initialBudget: number;
  categories: { id: string; name: string }[];
}) {
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState<Date>(new Date());

  const addMoreExpense = async (formData: FormData) => {
    await addExpense(formData);
    setCategoryId("");
  };

  const totalSpent = initialExpenses.reduce((s, e) => s + e.amount, 0);
  const remaining = initialBudget ? initialBudget - totalSpent : 0;

  const getCategoryName = (expense: DashboardExpense) => {
    if (Array.isArray(expense.categories)) {
      return expense.categories[0]?.name;
    }

    return expense.categories?.name;
  };

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-semibold">
          Finance Tracker
        </h1>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="hidden sm:block text-sm sm:text-base truncate max-w-[180px]">
            Hey, {user?.user_metadata?.full_name}
          </span>

          {/* Mobile: show avatar */}
          <Image
            src={
              user?.user_metadata?.avatar_url ??
              "/avatar-placeholder.png"
            }
            width={32}
            height={32}
            alt="User avatar"
            className="sm:hidden w-8 h-8 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />

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
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {/* Scroll container */}
            <div className="max-h-[260px] overflow-y-auto divide-y divide-border">
              {initialExpenses.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">
                  No expenses yet
                </p>
              ) : (
                initialExpenses.map((e) => (
                  <div
                    key={e.id}
                    className="flex items-center justify-between px-4 py-3 group"
                  >
                    {/* Left */}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {getCategoryName(e) ?? "Uncategorized"}
                      </span>

                      <span>

                        <span className="text-xs font-medium mr-2">
                          {e.expense_date ?? "Uncategorized"}
                        </span>

                        {e.description && (
                          <span className="text-xs text-muted-foreground">
                            {e.description}
                          </span>
                        )}

                      </span>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold tabular-nums">
                        Rs. {e.amount}
                      </span>

                      <form action={deleteExpense}>
                        <input type="hidden" name="expense_id" value={e.id} />
                        <button
                          type="submit"
                          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition"
                          aria-label="Delete expense"
                        >
                          ✕
                        </button>
                      </form>
                    </div>
                  </div>
                ))
              )}
            </div>

          </CardContent>
        </Card>

        <form action={addMoreExpense}>
          <Card>
            <CardHeader>
              <CardTitle>Add Expense</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                name="amount"
                placeholder="Amount"
                type="number"
                required
              />

              {/* Category Select */}
              <input type="hidden" name="category_id" value={categoryId} required />

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
                  <AddCategoryButton />
                </SelectContent>

              </Select>

              <input
                type="date"
                name="expense_date"
                required
                placeholder="Expense Date"
                className="    
                  p-1
                  bg-[#fafafa]
                  text-gray-900
                  tex-md
                  border
                  border-gray-400
                  rounded-md
                  focus:outline-none
                  focus:ring-2
                  focus:ring-gray-400"
              />

              <Input
                name="description"
                placeholder="Description"
                type="text"
              // required
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
              <Input placeholder="Monthly Budget" name="budget_amount" required className="bg-white" />
              <Button variant="outline" type="submit" >
                Update Budget
              </Button>
            </CardContent>
          </Card>
        </form>
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
