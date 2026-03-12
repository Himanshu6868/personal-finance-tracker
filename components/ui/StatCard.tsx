import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Card } from "@/components/ui/Card";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  accent?: "blue" | "red" | "green";
  delay?: number;
};

const accentClasses = {
  blue: "bg-indigo-50 text-indigo-600",
  red: "bg-red-50 text-red-600",
  green: "bg-green-50 text-green-600",
};

export function StatCard({
  title,
  value,
  icon: Icon,
  accent = "blue",
  delay = 0,
}: StatCardProps) {
  return (
    <AnimatedContainer delay={delay}>
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900 animate-in fade-in zoom-in-95 duration-500">{value}</p>
          </div>
          <div className={clsx("rounded-lg p-2.5", accentClasses[accent])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </Card>
    </AnimatedContainer>
  );
}
