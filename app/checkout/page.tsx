"use client";
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SectionHeader from "@/components/SectionHeader";
import { getGame, MERCHANT_BKASH, MERCHANT_NAGAD } from "@/lib/data";
import { saveOrder, makeOrderId } from "@/lib/orders";
import { useLang } from "@/lib/i18n";

const METHODS = ["bKash", "Nagad", "Rocket", "Upay"] as const;

function CheckoutInner() {
  const { t } = useLang();
  const params = useSearchParams();
  const router = useRouter();
  const game = getGame(params.get("game") || "");
  const pkg = game?.packages.find((p) => p.id === params.get("pkg"));
  const uid = params.get("uid") || "";

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<(typeof METHODS)[number]>("bKash");
  const [sender, setSender] = useState("");
  const [trxId, setTrxId] = useState("");
  const [error, setError] = useState("");

  const merchantNumber = useMemo(
    () => (method === "Nagad" ? MERCHANT_NAGAD : MERCHANT_BKASH),
    [method]
  );

  if (!game || !pkg || game.paused) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-black">{t.checkout.noInfo}</h1>
        <Link href="/#games" className="btn-chunky mt-6 inline-block bg-pop px-8 py-3 text-card">
          {t.checkout.pickGame}
        </Link>
      </div>
    );
  }

  const nextFromBilling = () => {
    if (!name.trim()) return setError(t.checkout.errName);
    if (!/^01\d{9}$/.test(phone.replace(/[\s-]/g, "")))
      return setError(t.checkout.errPhone);
    setError("");
    setStep(3);
  };

  const placeOrder = () => {
    if (!/^01\d{9}$/.test(sender.replace(/[\s-]/g, "")))
      return setError(t.checkout.errSender);
    if (trxId.trim().length < 6) return setError(t.checkout.errTrx);
    setError("");
    const order = {
      id: makeOrderId(),
      createdAt: new Date().toISOString(),
      gameSlug: game.slug,
      gameName: game.name,
      packageName: pkg.name,
      amount: pkg.amount,
      priceBdt: pkg.priceBdt,
      uid,
      name: name.trim(),
      phone: phone.replace(/[\s-]/g, ""),
      paymentMethod: method,
      senderNumber: sender.replace(/[\s-]/g, ""),
      trxId: trxId.trim().toUpperCase(),
      status: "pending" as const,
    };
    saveOrder(order);
    router.push(`/track?id=${order.id}`);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <SectionHeader eyebrow={t.checkout.eyebrow} title={t.checkout.title} />

      {/* stepper */}
      <div className="mb-8 flex items-center gap-2">
        {t.checkout.steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink text-sm font-black ${
                step >= i + 1 ? "bg-sun" : "bg-card"
              }`}
            >
              {i + 1}
            </span>
            <span className="text-sm font-bold">{label}</span>
            {i < 2 && <span className="h-0.5 flex-1 bg-ink/20" />}
          </div>
        ))}
      </div>

      <div className="card-macaly p-6">
        {step === 1 && (
          <>
            <div className="rounded-xl border-2 border-dashed border-ink/30 bg-paper p-4">
              <p className="text-sm text-ink/60">{game.name}</p>
              <p className="font-display text-xl font-black">{pkg.name}</p>
              <p className="font-display text-3xl font-black text-pop">৳{pkg.priceBdt}</p>
              <p className="mt-2 text-sm">
                {t.checkout.playerUid}: <span className="font-extrabold">{uid}</span>
              </p>
            </div>
            <button onClick={() => setStep(2)} className="btn-chunky mt-5 w-full bg-pop py-3.5 text-lg text-card">
              {t.checkout.okNext}
            </button>
            <Link href={`/game/${game.slug}`} className="mt-3 block text-center text-sm font-bold text-ink/60 hover:text-ink">
              {t.checkout.changePkg}
            </Link>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-sm font-extrabold">{t.checkout.nameLabel}</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t.checkout.namePh} className="input-macaly mt-1" />
            <label className="mt-4 block text-sm font-extrabold">{t.checkout.phoneLabel}</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={t.checkout.phonePh} inputMode="tel" className="input-macaly mt-1" />
            <p className="mt-2 text-xs text-ink/50">{t.checkout.phoneNote}</p>
            {error && <p className="mt-3 rounded-xl border-2 border-ink bg-pop/15 px-3 py-2 text-sm font-bold text-pop">{error}</p>}
            <button onClick={nextFromBilling} className="btn-chunky mt-5 w-full bg-pop py-3.5 text-lg text-card">
              {t.checkout.toPayment}
            </button>
            <button onClick={() => setStep(1)} className="mt-3 w-full text-center text-sm font-bold text-ink/60 hover:text-ink">
              {t.checkout.back}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-sm font-extrabold">{t.checkout.payMethod}</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {METHODS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`rounded-xl border-2 border-ink px-2 py-2.5 text-sm font-extrabold ${
                    method === m ? "bg-sun shadow-hard-sm" : "bg-card"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-xl border-2 border-ink bg-paper p-4">
              <p className="text-sm text-ink/60">{t.checkout.sendMoneyTo}</p>
              <p className="mt-1 font-display text-3xl font-black tracking-wide">{merchantNumber}</p>
              <p className="mt-1 font-display text-xl font-black text-pop">৳{pkg.priceBdt}</p>
              <p className="mt-2 text-xs text-ink/60">{t.checkout.instr}</p>
            </div>

            <label className="mt-5 block text-sm font-extrabold">{t.checkout.senderLabel}</label>
            <input value={sender} onChange={(e) => setSender(e.target.value)} placeholder={t.checkout.phonePh} inputMode="tel" className="input-macaly mt-1" />
            <label className="mt-4 block text-sm font-extrabold">{t.checkout.trxLabel}</label>
            <input value={trxId} onChange={(e) => setTrxId(e.target.value)} placeholder={t.checkout.trxPh} className="input-macaly mt-1 uppercase" />
            <p className="mt-2 text-xs text-ink/50">{t.checkout.fraudNote}</p>

            {error && <p className="mt-3 rounded-xl border-2 border-ink bg-pop/15 px-3 py-2 text-sm font-bold text-pop">{error}</p>}
            <button onClick={placeOrder} className="btn-chunky mt-5 w-full bg-pop py-3.5 text-lg text-card">
              {t.checkout.confirmBtn}
            </button>
            <button onClick={() => setStep(2)} className="mt-3 w-full text-center text-sm font-bold text-ink/60 hover:text-ink">
              {t.checkout.back}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { t } = useLang();
  return (
    <Suspense fallback={<div className="p-10 text-center font-bold">{t.checkout.loading}</div>}>
      <CheckoutInner />
    </Suspense>
  );
}
