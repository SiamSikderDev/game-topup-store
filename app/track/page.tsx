"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { findOrders, statusLabel, type Order } from "@/lib/orders";
import { useLang } from "@/lib/i18n";

const STEPS = ["pending", "paid", "delivered"] as const;

function Tracker() {
  const { lang, t } = useLang();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("id") || "");
  const [results, setResults] = useState<Order[] | null>(
    params.get("id") ? findOrders(params.get("id") || "") : null
  );

  const search = () => setResults(findOrders(query));

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <SectionHeader
        eyebrow={t.track.eyebrow}
        title={t.track.title}
        sub={t.track.sub}
      />
      <div className="card-macaly p-6">
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder={t.track.placeholder}
            className="input-macaly"
          />
          <button onClick={search} className="btn-chunky shrink-0 bg-pop px-6 text-card">
            {t.track.search}
          </button>
        </div>

        {results !== null && (
          <div className="mt-6 space-y-4">
            {results.length === 0 && (
              <p className="rounded-xl border-2 border-dashed border-ink/30 bg-paper p-4 text-center text-sm font-bold text-ink/60">
                {t.track.none}
              </p>
            )}
            {results.map((o) => {
              const stepIdx = o.status === "cancelled" ? -1 : STEPS.indexOf(o.status);
              return (
                <div key={o.id} className="rounded-2xl border-2 border-ink bg-paper p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-sm font-extrabold">{o.id}</p>
                    <span className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-extrabold ${o.status === "delivered" ? "bg-sun" : o.status === "cancelled" ? "bg-pop text-card" : "bg-card"}`}>
                      {statusLabel(o.status, lang)}
                    </span>
                  </div>
                  <p className="mt-2 font-display text-lg font-black">
                    {o.gameName} — {o.packageName}
                  </p>
                  <p className="text-sm text-ink/60">
                    UID: <span className="font-bold text-ink">{o.uid}</span> • ৳{o.priceBdt}
                  </p>
                  {stepIdx >= 0 && (
                    <div className="mt-4 flex items-center gap-1">
                      {STEPS.map((s, i) => (
                        <div key={s} className="flex flex-1 items-center gap-1">
                          <div className="flex flex-col items-center gap-1">
                            <span className={`grid h-7 w-7 place-items-center rounded-full border-2 border-ink text-xs font-black ${i <= stepIdx ? "bg-sun" : "bg-card"}`}>
                              {i + 1}
                            </span>
                            <span className="text-[10px] font-bold">{statusLabel(s, lang)}</span>
                          </div>
                          {i < STEPS.length - 1 && <span className={`h-0.5 flex-1 ${i < stepIdx ? "bg-ink" : "bg-ink/20"}`} /> }
                        </div>
                      ))}
                    </div>
                  )}
                  {o.note && <p className="mt-3 text-sm text-ink/70">{t.track.note} {o.note}</p>}
                  <p className="mt-2 text-xs text-ink/50">
                    {t.track.orderedAt} {new Date(o.createdAt).toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  const { t } = useLang();
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold">{t.track.loading}</div>}>
      <Tracker />
    </Suspense>
  );
}
