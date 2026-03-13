import clsx from "clsx";
import type { ComponentProps } from "react";

type AnimatedContainerProps = ComponentProps<"div"> & {
  delay?: number;
  hoverLift?: boolean;
};

export function AnimatedContainer({
  className,
  delay = 0,
  style,
  hoverLift = false,
  ...props
}: AnimatedContainerProps) {
  return (
    <div
      className={clsx(
        "animate-in fade-in slide-in-from-bottom-2 duration-500",
        hoverLift && "transition-transform duration-200 hover:-translate-y-1",
        className,
      )}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
        ...style,
      }}
      {...props}
    />
  );
}
