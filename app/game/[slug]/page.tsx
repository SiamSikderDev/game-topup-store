"use client";
import { useState } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import Sticker from "@/components/Sticker";
import SectionHeader from "@/components/SectionHeader";
import { getGame, type GamePackage } from "@/lib/data";
import { useLang } from "@/lib/i18n";

function PackageCard({
  pkg,
  selected,
  onSelect,
  pendingLabel,
}: {
  pkg: GamePackage;
  selected: boolean;
  onSelect: () => void;
  pendingLabel: string;
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative rounded-2xl border-2 border-ink p-4 text-left transition-transform hover:-translate-y-0.5 ${
        selected ? "bg-sun shadow-hard" : "bg-card shadow-hard-sm"
      }`}
    >
      {pkg.tag && (
        <span className="absolute -top-3 left-3 rounded-full border-2 border-ink bg-pop px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-card">
          {pkg.tag}
        </span>
      )}
      <p className="font-display text-lg font-black">{pkg.name}</p>
      <p className="mt-1 font-display text-2xl font-black text-pop">৳{pkg.priceBdt}</p>
      {pkg.placeholder && (
        <p className="mt-1 text-[11px] text-ink/50">{pendingLabel}</p>
      )}
    </button>
  );
}

export default function GamePage() {
  const { lang, t } = useLang();
  const routeParams = useParams<{ slug: string }>();
  const game = getGame(routeParams.slug);
  const router = useRouter();
  const [pkgId, setPkgId] = useState<string | null>(null);
  const [uid, setUid] = useState("");
  const [uid2, setUid2] = useState("");
  const [error, setError] = useState("");

  if (!game) notFound();

  if (game.paused) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link href="/#games" className="text-sm font-bold text-ink/60 hover:text-ink">
          {t.game.back}
        </Link>
        <div className="mt-10 mx-auto max-w-xl">
          <div className="card-macaly p-8 text-center">
            <span className="inline-block rounded-full border-2 border-ink bg-sun px-4 py-1 text-xs font-extrabold uppercase">
              {t.game.pausedBadge}
            </span>
            <h1 className="mt-4 font-display text-3xl font-black">{game.name} — {t.game.pausedTitle}</h1>
            <p className="mt-3 text-ink/70">{t.game.pausedDesc}</p>
          </div>
        </div>
      </div>
    );
  }

  const pkg = game.packages.find((p) => p.id === pkgId);

  const proceed = () => {
    if (!pkg) return setError(t.game.errPkg);
    if (!uid.trim() || !uid2.trim()) return setError(t.game.errUid);
    if (uid.trim() !== uid2.trim()) return setError(t.game.errMismatch);
    if (!/^\d{4,}$/.test(uid.trim())) return setError(t.game.errNumeric);
    setError("");
    router.push(
      `/checkout?game=${game.slug}&pkg=${pkg.id}&uid=${encodeURIComponent(uid.trim())}`
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/#games" className="text-sm font-bold text-ink/60 hover:text-ink">
        {t.game.back}
      </Link>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <span className={`grid h-16 w-16 place-items-center rounded-2xl border-2 border-ink ${game.tile} font-display text-xl font-black shadow-hard-sm`}>
          {game.letter}
        </span>
        <div>
          <h1 className="font-display text-3xl font-black md:text-4xl">{game.name}</h1>
          <p className="text-ink/70">{game.blurb[lang]}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Sticker color="bg-sun" tilt="-2deg">{t.game.sticker1}</Sticker>
        <Sticker color="bg-skyy" tilt="2deg">{t.game.sticker2}</Sticker>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeader eyebrow={t.game.pkgEyebrow} title={t.game.pkgTitle(game.currency)} />
          <div className="grid gap-4 sm:grid-cols-2">
            {game.packages.map((p) => (
              <PackageCard key={p.id} pkg={p} selected={pkgId === p.id} onSelect={() => { setPkgId(p.id); setError(""); }} pendingLabel={t.game.pricePending} />
            ))}
          </div>
          <p className="mt-4 text-xs text-ink/50">{t.game.priceNote}</p>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-macaly p-6">
            <h2 className="font-display text-xl font-black">{t.game.orderTitle}</h2>
            <div className="mt-4 rounded-xl border-2 border-dashed border-ink/30 bg-paper p-4">
              {pkg ? (
                <>
                  <p className="font-bold">{pkg.name}</p>
                  <p className="font-display text-3xl font-black text-pop">৳{pkg.priceBdt}</p>
                </>
              ) : (
                <p className="text-sm text-ink/50">{t.game.noPkg}</p>
              )}
            </div>

            <label className="mt-5 block text-sm font-extrabold">{t.game.uidLabel}</label>
            <input
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder={t.game.uidPh}
              inputMode="numeric"
              className="input-macaly mt-1"
            />
            <label className="mt-3 block text-sm font-extrabold">{t.game.uid2Label}</label>
            <input
              value={uid2}
              onChange={(e) => setUid2(e.target.value)}
              placeholder={t.game.uid2Ph}
              inputMode="numeric"
              className="input-macaly mt-1"
            />
            <Link href="/uid-guide" className="mt-2 inline-block text-xs font-bold text-pop hover:underline">
              {t.game.uidGuide}
            </Link>

            {error && (
              <p className="mt-3 rounded-xl border-2 border-ink bg-pop/15 px-3 py-2 text-sm font-bold text-pop">
                {error}
              </p>
            )}
            <button onClick={proceed} className="btn-chunky mt-4 w-full bg-pop py-3.5 text-lg text-card">
              {t.game.orderBtn}
            </button>
            <p className="mt-3 text-center text-xs text-ink/50">{t.game.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
