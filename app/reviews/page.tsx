"use client";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/lib/i18n";

// SAMPLE REVIEWS — placeholders until real customer reviews arrive after launch.
// Never present these as real customers.
const REVIEWS = [
  { name: "রাহাত", game: "Free Fire • 115 Diamonds", text: { bn: "৫ মিনিটে ডায়মন্ড পেয়ে গেছি। UID দেওয়ার পর আর কিছু করা লাগেনি। সাপোর্টও ফাস্ট।", en: "Got my diamonds in 5 minutes. Nothing to do after giving my UID. Support was fast too." }, stars: 5 },
  { name: "তানভীর", game: "PUBG Mobile • 325 UC", text: { bn: "প্রথমে ভয় ছিল, কিন্তু WhatsApp-এ মেসেজ দিতেই রিপ্লাই পেয়েছি। UC ঠিকঠাক এসেছে।", en: "Was nervous at first, but got a reply on WhatsApp right away. UC arrived fine." }, stars: 5 },
  { name: "সাকিব", game: "MLBB • Weekly Pass", text: { bn: "দাম অন্য পেজের চেয়ে কম, ডেলিভারিও ফাস্ট। আবার নেব।", en: "Cheaper than other pages and fast delivery. Will order again." }, stars: 5 },
  { name: "নাঈম", game: "Free Fire • 50 Diamonds", text: { bn: "রাত ১০টায় অর্ডার করেছিলাম, ৮ মিনিটে ডেলিভারি। পাসওয়ার্ড চায়নি — এটাই ভালো লেগেছে।", en: "Ordered at 10pm, delivered in 8 minutes. They never asked for my password — loved that." }, stars: 4 },
  { name: "ফারিয়া", game: "CODM • 400 CP", text: { bn: "প্রথমবার ভুল UID দিয়েছিলাম, সাপোর্ট সাথে সাথে ধরে দিয়েছে। তারপর ঠিকঠাক ডেলিভারি।", en: "I entered the wrong UID first; support caught it immediately. Then smooth delivery." }, stars: 5 },
  { name: "ইমরান", game: "Free Fire • Weekly Membership", text: { bn: "সাপ্তাহিক মেম্বারশিপ নিয়েছি দুইবার। দুইবারই সময়মতো পেয়েছি।", en: "Bought the weekly membership twice. Both times on schedule." }, stars: 5 },
];

export default function ReviewsPage() {
  const { lang, t } = useLang();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeader
        eyebrow={t.reviews.eyebrow}
        title={t.reviews.title}
        sub={t.reviews.sub}
      />
      <p className="mb-8 rounded-2xl border-2 border-dashed border-ink/40 bg-sun/40 p-4 text-center text-sm font-bold text-ink/70">
        {t.reviews.sampleNote}
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <div key={r.name + r.game} className="card-macaly relative p-6">
            <span className="absolute -top-3 right-4 rounded-full border-2 border-ink bg-lilac px-2.5 py-0.5 text-[10px] font-extrabold uppercase">
              {t.reviews.sampleBadge}
            </span>
            <p className="text-sm font-bold text-pop">{r.game}</p>
            <p className="mt-1 text-sun">{"★".repeat(r.stars)}{"☆".repeat(5 - r.stars)}</p>
            <p className="mt-2 text-ink/80">“{r.text[lang]}”</p>
            <p className="mt-4 font-display font-black">— {r.name}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 rounded-2xl border-2 border-dashed border-ink/30 bg-card p-5 text-center text-sm text-ink/60">
        {t.reviews.bottomNote}
      </p>
    </div>
  );
}
