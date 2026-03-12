import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-transform duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 disabled:cursor-not-allowed disabled:opacity-50",
        {
          "bg-indigo-500 text-white hover:bg-indigo-600": variant === "primary",
          "bg-slate-100 text-slate-900 hover:bg-slate-200": variant === "secondary",
          "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50":
            variant === "outline",
        },
        className,
      )}
      {...props}
    />
  );
}
