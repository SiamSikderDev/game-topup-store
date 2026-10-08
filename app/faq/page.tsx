"use client";
import SectionHeader from "@/components/SectionHeader";
import { FAQS } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function FaqPage() {
  const { lang, t } = useLang();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <SectionHeader
        eyebrow={t.faq.eyebrow}
        title={t.faq.title}
        sub={t.faq.sub}
      />
      <div className="space-y-4">
        {FAQS.map((f) => (
          <div key={f.q[lang]} className="card-macaly p-6">
            <h3 className="font-display text-lg font-black">{f.q[lang]}</h3>
            <p className="mt-2 text-ink/75">{f.a[lang]}</p>
          </div>
        ))}
      </div>
      <div className="card-macaly mt-6 p-6">
        <h3 className="font-display text-lg font-black">{t.faq.termsTitle}</h3>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink/75">
          {t.faq.terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
