import Link from "next/link";

export default function PaginationControls({
  total,
  page,
}: {
  total: number;
  page: number;
}) {
  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <span className="text-xs text-muted-foreground">
        Page {page} of {totalPages}
      </span>

      <div className="flex gap-2">
        <Link
          href={`/dashboard?page=${page - 1}`}
          className={`text-sm ${
            page <= 1
              ? "pointer-events-none text-muted-foreground"
              : "hover:underline"
          }`}
        >
          Previous
        </Link>

        <Link
          href={`/dashboard?page=${page + 1}`}
          className={`text-sm ${
            page >= totalPages
              ? "pointer-events-none text-muted-foreground"
              : "hover:underline"
          }`}
        >
          Next
        </Link>
      </div>
    </div>
  );
}
