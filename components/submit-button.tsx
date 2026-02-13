"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  disabled,
  ...props
}: Props) {
  const { pending } = useFormStatus();
  const isDisabled = pending || Boolean(disabled);

  return (
    <Button disabled={isDisabled} type="submit" aria-disabled={isDisabled} {...props}>
      {pending ? pendingText : children}
    </Button>
  );
}
