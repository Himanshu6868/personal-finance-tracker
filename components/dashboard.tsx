"use client";

import { CreateBudgetForTheMonth, updateBudgetAction } from "@/app/actions/budget.actions";
import { addExpense, deleteExpense } from "@/app/actions/expenses.actions";
import AddCategoryButton from "@/components/add-category-button";
import { DashboardTabs } from "@/components/nav-tabs";
import { LogoutButton } from "@/components/logout-button";
import { SubmitButton } from "@/components/submit-button";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
import { InputField } from "@/components/ui/InputField";
import { StatCard } from "@/components/ui/StatCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DashboardExpense } from "@/types";
import type { User } from "@supabase/supabase-js";
import {
  CalendarDays,
  CircleDollarSign,
  FileText,
  Plus,
  Trash2,
  TrendingDown,
  TrendingUp,
  UserCircle2,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

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

  const addMoreExpense = async (formData: FormData) => {
    await addExpense(formData);
    setCategoryId("");
  };

  const totalSpent = useMemo(
    () => initialExpenses.reduce((s, e) => s + e.amount, 0),
    [initialExpenses],
  );
  const remaining = initialBudget ? initialBudget - totalSpent : 0;

  const getCategoryName = (expense: DashboardExpense) => {
    if (Array.isArray(expense.categories)) {
      return expense.categories[0]?.name;
    }

    return expense.categories?.name;
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Finance Tracker</h1>
            <p className="text-sm text-slate-500">Your personal spending command center</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1 text-sm font-medium text-slate-600 sm:inline-flex">
              <UserCircle2 className="h-4 w-4" />
              Hey, {user?.user_metadata?.full_name}
            </span>
            <Image
              src={user?.user_metadata?.avatar_url ?? "/avatar-placeholder.png"}
              width={36}
              height={36}
              alt="User avatar"
              className="h-9 w-9 rounded-full border border-slate-200 object-cover"
              referrerPolicy="no-referrer"
            />
            <LogoutButton />
          </div>
        </header>

        <DashboardTabs />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <StatCard
              title="Monthly Budget"
              value={formatCurrency(initialBudget)}
              icon={Wallet}
              accent="blue"
              delay={50}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <StatCard
              title="Total Expenses"
              value={formatCurrency(totalSpent)}
              icon={TrendingDown}
              accent="red"
              delay={100}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <StatCard
              title="Remaining"
              value={formatCurrency(remaining)}
              icon={TrendingUp}
              accent="green"
              delay={150}
            />
          </div>

          <AnimatedContainer delay={200} className="col-span-12 lg:col-span-8">
            <Card className="p-0">
              <div className="border-b border-slate-100 px-5 py-4">
                <h2 className="text-base font-semibold text-slate-900">Recent Expenses</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-5 py-3">Category</th>
                      <th className="px-5 py-3">Description</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3 text-right">Amount</th>
                      <th className="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initialExpenses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-5 py-10 text-center text-slate-500">
                          No expenses yet
                        </td>
                      </tr>
                    ) : (
                      initialExpenses.map((e) => (
                        <tr key={e.id} className="border-t border-slate-100 transition-colors hover:bg-slate-50/80">
                          <td className="px-5 py-3 font-medium text-slate-800">
                            {getCategoryName(e) ?? "Uncategorized"}
                          </td>
                          <td className="px-5 py-3 text-slate-600">{e.description || "—"}</td>
                          <td className="px-5 py-3 text-slate-600">{e.expense_date ?? "—"}</td>
                          <td className="px-5 py-3 text-right font-semibold text-slate-900">
                            {formatCurrency(e.amount)}
                          </td>
                          <td className="px-5 py-3 text-right">
                            <form action={deleteExpense}>
                              <input type="hidden" name="expense_id" value={e.id} />
                              <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                aria-label="Delete expense"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </form>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </AnimatedContainer>

          <AnimatedContainer delay={260} className="col-span-12 lg:col-span-4">
            <form action={addMoreExpense}>
              <Card className="space-y-4">
                <h2 className="text-base font-semibold text-slate-900">Add Expense</h2>

                <InputField
                  name="amount"
                  label="Amount"
                  placeholder="Enter amount"
                  type="number"
                  required
                  icon={<CircleDollarSign className="h-4 w-4" />}
                />

                <input type="hidden" name="category_id" value={categoryId} required />

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Category
                  </label>
                  <Select onValueChange={setCategoryId} value={categoryId}>
                    <SelectTrigger className="h-11 rounded-lg border-slate-200">
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
                </div>

                <InputField
                  type="date"
                  name="expense_date"
                  required
                  label="Expense Date"
                  icon={<CalendarDays className="h-4 w-4" />}
                />

                <InputField
                  name="description"
                  placeholder="What was this for?"
                  type="text"
                  label="Description"
                  icon={<FileText className="h-4 w-4" />}
                />

                <SubmitButton
                  type="submit"
                  disabled={!categoryId}
                  pendingText="Adding Expense..."
                  className="h-11 w-full rounded-lg bg-indigo-500 font-semibold text-white transition hover:bg-indigo-600"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Expense
                </SubmitButton>
              </Card>
            </form>
          </AnimatedContainer>

          <AnimatedContainer delay={320} className="col-span-12 md:col-span-6">
            <form action={CreateBudgetForTheMonth}>
              <Card className="space-y-4">
                <h2 className="text-base font-semibold text-slate-900">Add Budget</h2>
                <InputField
                  placeholder="Monthly Budget"
                  name="budget_amount"
                  disabled={Boolean(initialBudget)}
                  defaultValue={initialBudget}
                  icon={<Wallet className="h-4 w-4" />}
                />
                <Button variant="outline" type="submit" disabled={Boolean(initialBudget)}>
                  Add Budget
                </Button>
              </Card>
            </form>
          </AnimatedContainer>

          <AnimatedContainer delay={380} className="col-span-12 md:col-span-6">
            <form action={updateBudgetAction}>
              <Card className="space-y-4">
                <h2 className="text-base font-semibold text-slate-900">Update Budget</h2>
                <InputField
                  placeholder="Monthly Budget"
                  name="budget_amount"
                  required
                  icon={<Wallet className="h-4 w-4" />}
                />
                <Button variant="secondary" type="submit">
                  Update Budget
                </Button>
              </Card>
            </form>
          </AnimatedContainer>
        </div>
      </div>
    </div>
  );
}
