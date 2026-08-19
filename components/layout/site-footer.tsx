import Link from "next/link";
import { Compass } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "My Pathway", href: "/profile" },
      { label: "Recommendations", href: "/recommend" },
      { label: "Skill Gaps", href: "/gaps" },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Career Coach", href: "/coach" },
      { label: "Mentors", href: "/mentors" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="container-career grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Compass className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Career <span className="text-primary">GPS</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A personal career companion that stays with you until you do it.
            Built by Team Compass 🧭.
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-career flex flex-col items-center justify-between gap-4 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Career GPS · Team Compass 🧭</p>
          <p>Real people. Real conversations. Real career direction.</p>
        </div>
      </div>
    </footer>
  );
}