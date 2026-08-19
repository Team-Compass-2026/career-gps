"use client";

import Link from "next/link";
import { Compass, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "Mentors", href: "/mentors" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container-career flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90 active:scale-95"
          aria-label="Career GPS home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-12">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Career <span className="text-primary">GPS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative inline-flex py-2 text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/sign-in" className="hidden sm:inline-flex">
            <Button variant="ghost" className="rounded-full active:scale-95">
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up" className="hidden sm:inline-flex">
            <Button className="rounded-full active:scale-95">Get Started</Button>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="rounded-full md:hidden active:scale-95" aria-label="Open menu" />}
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-lg font-bold">Career GPS</SheetTitle>
              <nav className="mt-8 flex flex-col gap-4" aria-label="Mobile">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/sign-in" onClick={() => setOpen(false)} className="mt-2">
                  <Button variant="outline" className="w-full rounded-full active:scale-[0.98]">
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up" onClick={() => setOpen(false)}>
                  <Button className="w-full rounded-full active:scale-[0.98]">Get Started</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}