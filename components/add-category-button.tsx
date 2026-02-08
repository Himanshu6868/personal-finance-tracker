"use client";

import { addCategory } from "@/app/actions/category.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function AddCategoryButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          Add +
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="pb-safe">
        <SheetHeader>
          <SheetTitle>Add Category</SheetTitle>
        </SheetHeader>

        <form
          action={async (formData) => {
            await addCategory(formData);
          }}
          className="space-y-4 mt-4 ml-2 mr-2"
        >
          <Input
            name="name"
            placeholder="Category name"
            required
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            inputMode="text"
          />{" "}
          <Button type="submit" className="w-full">
            Add
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
