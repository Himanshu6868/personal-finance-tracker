import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

type InputFieldProps = ComponentProps<"input"> & {
  icon?: ReactNode;
  label?: string;
};

export function InputField({ icon, className, label, id, ...props }: InputFieldProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          className={clsx(
            "h-11 w-full rounded-lg border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200",
            icon ? "pl-10 pr-3" : "px-3",
            className,
          )}
          {...props}
        />
      </div>
    </div>
  );
}
