"use client";
import Link from "next/link";
import Sticker from "@/components/Sticker";
import SectionHeader from "@/components/SectionHeader";
import { GAMES, FAQS } from "@/lib/data";
import { useLang } from "@/lib/i18n";

const PROOFS = [
  { name: "রাহাত", game: "Free Fire • 115 Diamonds", text: { bn: "৫ মিনিটে ডায়মন্ড পেয়ে গেছি। UID দেওয়ার পর আর কিছু করা লাগেনি।", en: "Got my diamonds in 5 minutes. Nothing to do after giving my UID." } },
  { name: "তানভীর", game: "PUBG Mobile • 325 UC", text: { bn: "প্রথমে ভয় ছিল, কিন্তু সাপোর্টে মেসেজ দিতেই রিপ্লাই পেয়েছি। UC ঠিকঠাক এসেছে।", en: "Was nervous at first, but support replied right away. UC arrived fine." } },
  { name: "সাকিব", game: "MLBB • Weekly Pass", text: { bn: "দাম অন্য পেজের চেয়ে কম, ডেলিভারিও ফাস্ট। আবার নেব।", en: "Cheaper than other pages and fast delivery. Will order again." } },
];

export default function Home() {
  const { lang, t } = useLang();
  return (
    <>
      {/* HERO */}
      <section className="border-b-2 border-ink">
        <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mb-6 flex flex-wrap gap-3">
            <Sticker color="bg-pop text-card" tilt="-3deg">{t.hero.badge1}</Sticker>
            <Sticker color="bg-sun" tilt="2deg">{t.hero.badge2}</Sticker>
            <Sticker color="bg-skyy" tilt="-2deg">{t.hero.badge3}</Sticker>
          </div>
          <h1 className="max-w-3xl font-display text-4xl font-black leading-tight md:text-6xl">
            {t.hero.l1a}
            <span className="bg-sun px-2">{t.hero.l1b}</span>
            {t.hero.l1c}
            <br />
            {t.hero.l2}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink/70">{t.hero.sub}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#games" className="btn-chunky bg-pop px-8 py-3.5 text-lg text-card">
              {t.hero.cta1}
            </a>
            <Link href="/uid-guide" className="btn-chunky bg-card px-8 py-3.5 text-lg text-ink">
              {t.hero.cta2}
            </Link>
          </div>
          <p className="mt-6 inline-block rounded-full border-2 border-ink bg-card px-4 py-1.5 text-sm font-bold shadow-hard-sm">
            {t.hero.promiseA}
            <span className="text-pop">{t.hero.promiseB}</span>
            {t.hero.promiseC}
          </p>
        </div>
      </section>

      {/* CATALOG */}
      <section id="games" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-14">
        <SectionHeader
          eyebrow={t.home.catalogEyebrow}
          title={t.home.catalogTitle}
          sub={t.home.catalogSub}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GAMES.map((g) => (
            <Link
              key={g.slug}
              href={`/game/${g.slug}`}
              className="card-macaly group relative block overflow-hidden transition-transform hover:-translate-y-1"
            >
              {g.paused && (
                <span className="absolute right-3 top-3 z-10 rounded-full border-2 border-ink bg-sun px-2.5 py-0.5 text-[10px] font-extrabold uppercase">
                  {t.game.pausedBadge}
                </span>
              )}
              <div className={`flex h-28 items-center justify-center border-b-2 border-ink ${g.tile}`}>
                <span className="font-display text-4xl font-black text-ink">{g.letter}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-black">{g.name}</h3>
                <p className="mt-1 text-sm text-ink/70">{g.blurb[lang]}</p>
                <p className="mt-3 text-sm font-extrabold text-pop group-hover:underline">
                  {t.home.viewPackages}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y-2 border-ink bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader eyebrow={t.home.howEyebrow} title={t.home.howTitle} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.home.steps.map((s) => (
              <div key={s.n} className="rounded-2xl border-2 border-ink bg-paper p-5 shadow-hard">
                <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-sun font-display text-lg font-black">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-lg font-black">{s.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS / PROOF */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeader
          eyebrow={t.home.proofEyebrow}
          title={t.home.proofTitle}
          sub={t.home.proofSub}
        />
        <p className="mb-6 inline-block rounded-full border-2 border-dashed border-ink/40 bg-sun/40 px-4 py-1.5 text-xs font-bold text-ink/70">
          {t.home.sampleNote}
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {PROOFS.map((r) => (
            <div key={r.name} className="card-macaly relative p-6">
              <span className="absolute -top-3 right-4 rounded-full border-2 border-ink bg-lilac px-2.5 py-0.5 text-[10px] font-extrabold uppercase">
                {t.reviews.sampleBadge}
              </span>
              <p className="text-sm font-bold text-pop">{r.game}</p>
              <p className="mt-2 text-ink/80">“{r.text[lang]}”</p>
              <p className="mt-4 font-display font-black">— {r.name}</p>
            </div>
          ))}
        </div>
        <Link href="/reviews" className="mt-6 inline-block font-extrabold text-pop hover:underline">
          {t.home.allReviews}
        </Link>
      </section>

      {/* FAQ TEASER */}
      <section className="border-t-2 border-ink bg-lilac/40">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <SectionHeader eyebrow={t.home.faqEyebrow} title={t.home.faqTitle} />
          <div className="grid gap-4 md:grid-cols-2">
            {FAQS.slice(0, 4).map((f) => (
              <div key={f.q[lang]} className="card-macaly p-5">
                <h3 className="font-display text-lg font-black">{f.q[lang]}</h3>
                <p className="mt-1 text-sm text-ink/70">{f.a[lang]}</p>
              </div>
            ))}
          </div>
          <Link href="/faq" className="mt-6 inline-block font-extrabold text-pop hover:underline">
            {t.home.allFaq}
          </Link>
        </div>
      </section>
    </>
  );
}
