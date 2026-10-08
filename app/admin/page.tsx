"use client";
import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import {
  listOrders, updateOrderStatus, fraudFlags, getFloat, setFloat,
  statusLabel, type Order, type OrderStatus,
} from "@/lib/orders";
import { useLang } from "@/lib/i18n";

const PIN_KEY = "topupghor_admin_pin";
// v1 demo gate — default PIN is 1234. Change before sharing the link.
// NOTE: PIN gate is demo-grade; real launch needs a DB + real admin auth.

export default function AdminPage() {
  const { lang, t } = useLang();
  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [float, setFloatState] = useState(0);
  const [floatInput, setFloatInput] = useState("");
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");

  useEffect(() => {
    if (unlocked) {
      setOrders(listOrders());
      setFloatState(getFloat());
    }
  }, [unlocked]);

  const tryUnlock = () => {
    if (pin === (localStorage.getItem(PIN_KEY) || "1234")) {
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  if (!unlocked) {
    return (
      <div className="mx-auto max-w-sm px-4 py-20">
        <div className="card-macaly p-8 text-center">
          <h1 className="font-display text-2xl font-black">{t.admin.title}</h1>
          <p className="mt-2 rounded-xl border-2 border-dashed border-ink/30 bg-paper px-3 py-2 text-xs font-bold text-ink/60">
            {t.admin.demoNote}
          </p>
          <label className="mt-4 block text-sm font-extrabold">{t.admin.pinLabel}</label>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
            type="password"
            inputMode="numeric"
            placeholder="PIN"
            className="input-macaly mt-2 text-center text-2xl tracking-widest"
          />
          {pinError && <p className="mt-2 text-sm font-bold text-pop">{t.admin.wrongPin}</p>}
          <button onClick={tryUnlock} className="btn-chunky mt-4 w-full bg-pop py-3 text-card">
            {t.admin.unlock}
          </button>
        </div>
      </div>
    );
  }

  const refresh = () => setOrders(listOrders());
  const visible = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const pending = orders.filter((o) => o.status === "pending");
  const revenue = orders.filter((o) => o.status === "delivered").reduce((s, o) => s + o.priceBdt, 0);

  const mark = (id: string, status: OrderStatus) => {
    if (status === "delivered") {
      const o = orders.find((x) => x.id === id);
      const cost = prompt(
        lang === "bn"
          ? `ডেলিভারি সম্পন্ন চিহ্নিত করছো।\n${o?.packageName}-এর wholesale cost (৳) লিখো (float থেকে কাটা হবে):`
          : `Marking as delivered.\nEnter wholesale cost (৳) for ${o?.packageName} (deducted from float):`,
        ""
      );
      if (cost === null) return;
      const c = Number(cost) || 0;
      const f = getFloat() - c;
      setFloat(f);
      setFloatState(f);
    }
    updateOrderStatus(id, status);
    refresh();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionHeader eyebrow={t.admin.title} title={t.admin.queueTitle} />
      <p className="mb-6 inline-block rounded-full border-2 border-dashed border-ink/40 bg-sun/40 px-4 py-1.5 text-xs font-bold text-ink/70">
        {t.admin.demoNote}
      </p>

      {/* stats */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="card-macaly p-4">
          <p className="text-xs font-extrabold uppercase text-ink/50">{statusLabel("pending", lang)}</p>
          <p className="font-display text-3xl font-black text-pop">{pending.length}</p>
        </div>
        <div className="card-macaly p-4">
          <p className="text-xs font-extrabold uppercase text-ink/50">{lang === "bn" ? "মোট অর্ডার" : "Total orders"}</p>
          <p className="font-display text-3xl font-black">{orders.length}</p>
        </div>
        <div className="card-macaly p-4">
          <p className="text-xs font-extrabold uppercase text-ink/50">{t.admin.totalRevenue}</p>
          <p className="font-display text-3xl font-black">৳{revenue}</p>
        </div>
        <div className="card-macaly p-4">
          <p className="text-xs font-extrabold uppercase text-ink/50">{t.admin.floatTitle}</p>
          <p className="font-display text-3xl font-black text-pop">৳{float}</p>
          <div className="mt-2 flex gap-2">
            <input value={floatInput} onChange={(e) => setFloatInput(e.target.value)} placeholder="৳" inputMode="numeric" className="input-macaly !py-1.5 text-sm" />
            <button
              onClick={() => { const v = float + (Number(floatInput) || 0); setFloat(v); setFloatState(v); setFloatInput(""); }}
              className="shrink-0 rounded-xl border-2 border-ink bg-sun px-3 text-sm font-extrabold"
            >
              + {t.admin.update}
            </button>
          </div>
          <p className="mt-1 text-[11px] text-ink/50">{t.admin.floatDesc}</p>
        </div>
      </div>

      {/* filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(["all", "pending", "paid", "delivered", "cancelled"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border-2 border-ink px-4 py-1.5 text-sm font-extrabold ${filter === f ? "bg-sun shadow-hard-sm" : "bg-card"}`}
          >
            {f === "all" ? (lang === "bn" ? "সব" : "All") : statusLabel(f, lang)}
          </button>
        ))}
      </div>

      {/* order queue */}
      <div className="mt-4 space-y-4">
        {visible.length === 0 && (
          <p className="card-macaly p-8 text-center font-bold text-ink/50">{t.admin.noOrders}</p>
        )}
        {visible.map((o) => {
          const flags = fraudFlags(o);
          return (
            <div key={o.id} className="card-macaly p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-sm font-extrabold">{o.id}</p>
                <span className={`rounded-full border-2 border-ink px-3 py-1 text-xs font-extrabold ${o.status === "delivered" ? "bg-sun" : o.status === "cancelled" ? "bg-pop text-card" : "bg-paper"}`}>
                  {statusLabel(o.status, lang)}
                </span>
              </div>
              <p className="mt-1 font-display text-lg font-black">{o.gameName} — {o.packageName} <span className="text-pop">৳{o.priceBdt}</span></p>
              <div className="mt-2 grid gap-1 text-sm sm:grid-cols-2">
                <p>UID: <span className="font-extrabold">{o.uid}</span></p>
                <p>{o.name} • {o.phone}</p>
                <p>{o.paymentMethod} — {t.admin.sender} {o.senderNumber}</p>
                <p>{t.admin.trx}: <span className="font-mono font-extrabold">{o.trxId}</span></p>
              </div>
              {flags.length > 0 && (
                <div className="mt-2 rounded-xl border-2 border-pop bg-pop/10 p-3">
                  <p className="text-sm font-extrabold text-pop">{t.admin.fraudTitle}:</p>
                  <ul className="list-disc pl-5 text-sm">{flags.map((f) => <li key={f}>{f}</li>)}</ul>
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => mark(o.id, "paid")} className="rounded-xl border-2 border-ink bg-skyy px-4 py-1.5 text-sm font-extrabold">{t.admin.markPaid}</button>
                <button onClick={() => mark(o.id, "delivered")} className="rounded-xl border-2 border-ink bg-sun px-4 py-1.5 text-sm font-extrabold">{t.admin.markDelivered}</button>
                <button onClick={() => mark(o.id, "cancelled")} className="rounded-xl border-2 border-ink bg-card px-4 py-1.5 text-sm font-extrabold">{t.admin.markCancelled}</button>
              </div>
              <p className="mt-2 text-xs text-ink/50">{new Date(o.createdAt).toLocaleString(lang === "bn" ? "bn-BD" : "en-US")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
