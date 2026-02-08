"use client";

import { addCategory } from "@/app/actions/category.actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AddCategoryButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="w-full px-3 py-2 text-left text-sm"
        >
          Add +
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[360px]"
        onOpenAutoFocus={(e) => e.preventDefault()} // 👈 critical for mobile
      >
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <form
          action={async (formData) => {
            await addCategory(formData);
          }}
          className="space-y-4"
        >
          <Input name="name" placeholder="Category name" required />

          <Button type="submit" className="w-full">
            Add
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
