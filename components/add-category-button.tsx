// "use client";

// import { addCategory } from "@/app/actions/category.actions";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { useState, useTransition } from "react";

// export default function AddCategoryButton() {
//   const [open, setOpen] = useState(false);
//   const [isPending, startTransition] = useTransition();

//   return (
//     <Sheet
//       open={open}
//       onOpenChange={(next) => {
//         // 🚨 IGNORE auto-close attempts from Android
//         if (!next) return;
//         setOpen(true);
//       }}
//     >
//       <SheetTrigger asChild>
//         <Button variant="outline" className="w-full justify-start">
//           + Add Category
//         </Button>
//       </SheetTrigger>

//       <SheetContent
//         side="right"
//         className="pb-safe"
//         onPointerDownOutside={(e) => e.preventDefault()}
//         onInteractOutside={(e) => e.preventDefault()}
//       >
//         <SheetHeader className="border-b pb-4">
//           <SheetTitle>Add Category</SheetTitle>
//         </SheetHeader>

//         <form
//           className="space-y-4 mt-4 ml-2 mr-2"
//           action={(formData) => {
//             startTransition(async () => {
//               await addCategory(formData);
//               setOpen(false); // ✅ only WE close it
//             });
//           }}
//         >
//           <Input
//             name="name"
//             placeholder="Category name"
//             required
//             autoComplete="off"
//             autoCorrect="off"
//             spellCheck={false}
//           />

//           <div className="mt-auto flex">
//             <Button type="button" variant="ghost" className="w-36">
//               Cancel
//             </Button>

//             <Button type="submit" disabled={isPending} className="w-36">
//               {isPending ? "Adding..." : "Add"}
//             </Button>
//           </div>
//         </form>
//       </SheetContent>
//     </Sheet>
//   );
// }

"use client";

import { addCategory } from "@/app/actions/category.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";

export default function AddCategoryInline() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await addCategory(formData);
          // optional: reset handled by browser
        });
      }}
      className="flex gap-2 items-center"
    >
      <Input
        name="name"
        placeholder="Category name"
        required
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        className="flex-1"
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add"}
      </Button>
    </form>
  );
}
