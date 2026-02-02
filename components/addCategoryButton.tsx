import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addCategory } from "@/app/actions/category.actions";

export default function AddCategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="icon"
        onClick={() => setOpen(true)}
        className="w-full px-3 py-2 text-left text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition"
      >
       Add+
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[360px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>

          <form
            action={async (formData) => {
              await addCategory(formData);
              setOpen(false);
            }}
            className="space-y-4"
          >
            <Input
              name="name"
              placeholder="Category name"
              required
              // autoFocus

            />

            <Button type="submit" className="w-full">
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
