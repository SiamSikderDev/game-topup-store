"use client";
import { SUPPORT_WHATSAPP } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export default function SupportFloat() {
  const { t } = useLang();
  return (
    <a
      href={SUPPORT_WHATSAPP}
      target="_blank"
      rel="noreferrer"
      aria-label={t.support.label}
      title={t.support.label}
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full border-2 border-ink bg-sun text-ink shadow-hard transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    </a>
  );
}
