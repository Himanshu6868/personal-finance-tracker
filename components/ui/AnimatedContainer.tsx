import clsx from "clsx";
import type { ComponentProps } from "react";

type AnimatedContainerProps = ComponentProps<"div"> & {
  delay?: number;
};

export function AnimatedContainer({
  className,
  delay = 0,
  style,
  ...props
}: AnimatedContainerProps) {
  return (
    <div
      className={clsx(
        "animate-in fade-in slide-in-from-bottom-2 duration-500",
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
