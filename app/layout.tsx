import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { GlobalTopLoader } from "@/components/global-top-loader";
import "./globals.css";

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Personal Finance Tracker",
  description: "Track budgets, expenses, and analytics in one dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans bg-slate-50 text-slate-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalTopLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
