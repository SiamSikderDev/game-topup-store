"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

export default function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();
  const LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/track", label: t.nav.track },
    { href: "/uid-guide", label: t.nav.uidGuide },
    { href: "/reviews", label: t.nav.reviews },
    { href: "/faq", label: t.nav.faq },
  ];
  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-ink bg-pop font-display text-sm font-black text-card shadow-hard-sm">
            TG
          </span>
          <span className="font-display text-xl font-black text-ink">
            TopUp<span className="text-pop">Ghor</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-1.5 text-sm font-bold ${
                pathname === l.href
                  ? "border-2 border-ink bg-sun text-ink shadow-hard-sm"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border-2 border-ink bg-card p-0.5 shadow-hard-sm" role="group" aria-label="Language">
            {(["bn", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 text-xs font-extrabold uppercase ${
                  lang === l ? "bg-ink text-card" : "text-ink/60 hover:text-ink"
                }`}
              >
                {l === "bn" ? "বাং" : "EN"}
              </button>
            ))}
          </div>
          <Link
            href="/#games"
            className="rounded-full border-2 border-ink bg-pop px-5 py-2 text-sm font-extrabold text-card shadow-hard transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm"
          >
            {t.nav.cta}
          </Link>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t-2 border-ink/10 px-4 py-2 md:hidden">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${
              pathname === l.href ? "border-2 border-ink bg-sun text-ink" : "text-ink/70"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
