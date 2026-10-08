"use client";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { UID_GUIDE_STEPS } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function UidGuide() {
  const { lang, t } = useLang();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <SectionHeader
        eyebrow={t.uidGuide.eyebrow}
        title={t.uidGuide.title}
        sub={t.uidGuide.sub}
      />
      <div className="space-y-4">
        {UID_GUIDE_STEPS.map((s, i) => (
          <div key={s.title[lang]} className="card-macaly flex gap-4 p-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun font-display text-lg font-black">
              {i + 1}
            </span>
            <div>
              <h3 className="font-display text-lg font-black">{s.title[lang]}</h3>
              <p className="mt-1 text-sm text-ink/70">{s.desc[lang]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="card-macaly mt-6 border-pop bg-pop/10 p-5">
        <p className="font-extrabold text-pop">{t.uidGuide.remember}</p>
        <p className="mt-1 text-sm text-ink/80">{t.uidGuide.rememberText}</p>
      </div>
      <Link href="/#games" className="btn-chunky mt-8 inline-block bg-pop px-8 py-3 text-card">
        {t.uidGuide.cta}
      </Link>
    </div>
  );
}
