"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Map,
  MessagesSquare,
  Route,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { OnboardingProvider } from "@/lib/onboarding-store";

const NAV_ITEMS = [
  { label: "My Profile", href: "/profile", icon: UserRound },
  { label: "Recommendations", href: "/recommend", icon: Sparkles },
  { label: "Skill Gaps", href: "/gaps", icon: Target },
  { label: "Roadmap", href: "/roadmap", icon: Route },
  { label: "Progress", href: "/progress", icon: TrendingUp },
  { label: "Career Coach", href: "/coach", icon: MessagesSquare },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const nav = (
    <nav className="flex flex-col gap-1" aria-label="Dashboard">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary-soft text-primary"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card p-4 lg:block">
        <div className="flex items-center gap-2 px-2 py-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-base font-bold tracking-tight text-foreground">
            Career <span className="text-primary">GPS</span>
          </span>
        </div>
        <div className="mt-8">{nav}</div>
        <div className="mt-auto pt-8">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start rounded-xl text-muted-foreground">
              <Map className="h-5 w-5" aria-hidden="true" />
              Back to Home
            </Button>
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="rounded-full" aria-label="Open dashboard menu">
                    <Compass className="h-5 w-5" />
                  </Button>
                }
              />
              <SheetContent side="left" className="w-64">
                <SheetTitle className="sr-only">Dashboard menu</SheetTitle>
                <div className="mt-4">{nav}</div>
              </SheetContent>
            </Sheet>
            <span className="text-base font-bold tracking-tight text-foreground lg:hidden">
              Career GPS
            </span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1">
          <OnboardingProvider>{children}</OnboardingProvider>
        </main>
      </div>
    </div>
  );
}