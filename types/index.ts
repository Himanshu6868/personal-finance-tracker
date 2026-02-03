// src/types/index.ts

export interface Category {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

export interface Expense {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  description: string | null;
  expense_date: string;
  created_at: string;

  // joined relation (optional)
  categories?: Pick<Category, "id" | "name">;
}

export interface Budget {
  id: string;
  user_id: string;
  budget_amount: number;
  month: string; // e.g. "2026-02"
  created_at: string;
}

export type DashboardExpense = Pick<
  Expense,
  "id" | "amount" | "description" | "expense_date"
> & {
  categories?: { name: string } | { name: string }[] | null;
};
