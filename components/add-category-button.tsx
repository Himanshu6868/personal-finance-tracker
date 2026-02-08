"use client";

import { addCategory } from "@/app/actions/category.actions";
import { Button } from "@/components/ui/button";
import { useRef, useState, useTransition } from "react";

export default function AddCategoryAndroidSafe() {
  const [value, setValue] = useState("");
  const isComposing = useRef(false);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();

        const fd = new FormData();
        fd.append("name", value);

        startTransition(async () => {
          await addCategory(fd);
          setValue("");
        });
      }}
    >
      <input
        value={value}
        onChange={(e) => {
          if (!isComposing.current) {
            setValue(e.target.value);
          }
        }}
        onCompositionStart={() => {
          isComposing.current = true;
        }}
        onCompositionEnd={(e) => {
          isComposing.current = false;
          setValue(e.currentTarget.value);
        }}
        placeholder="Category name"
        required
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        inputMode="text"
        className="flex-1 bg-slate-300 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />

      <Button type="submit" disabled={isPending}>
        Add
      </Button>
    </form>
  );
}
