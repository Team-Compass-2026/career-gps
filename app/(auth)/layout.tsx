import Link from "next/link";
import { Compass } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="container-career flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Career GPS home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Career <span className="text-primary">GPS</span>
          </span>
        </Link>
        <ThemeToggle />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">{children}</main>
      <footer className="pb-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Career GPS · Team Compass 🧭
      </footer>
    </div>
  );
}