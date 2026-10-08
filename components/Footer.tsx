"use client";
import Link from "next/link";
import { SUPPORT_WHATSAPP } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t-2 border-ink bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-black">
            TopUp<span className="text-pop">Ghor</span>
          </p>
          <p className="mt-2 text-sm text-paper/70">{t.footer.desc}</p>
          <p className="mt-3 inline-block rounded-full border-2 border-sun px-3 py-1 text-xs font-extrabold text-sun">
            {t.footer.tagline}
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-paper/50">
            {t.footer.links}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/#games" className="hover:text-sun">{t.home.catalogTitle}</Link></li>
            <li><Link href="/track" className="hover:text-sun">{t.nav.track}</Link></li>
            <li><Link href="/uid-guide" className="hover:text-sun">{t.nav.uidGuide}</Link></li>
            <li><Link href="/reviews" className="hover:text-sun">{t.reviews.title}</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-paper/50">
            {t.nav.faq}
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-sun">{t.faq.title}</Link></li>
            <li><Link href="/faq" className="hover:text-sun">{t.faq.termsTitle}</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-paper/50">
            {t.footer.contact}
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={SUPPORT_WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-sun">
                {t.footer.whatsapp}
              </a>
            </li>
            <li className="text-paper/60">{t.footer.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/20 py-4 text-center text-xs text-paper/50">
        {t.footer.rights} {t.footer.pricesNote}
      </div>
    </footer>
  );
}
