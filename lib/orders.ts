// ---------------------------------------------------------------------------
// v1 order store — localStorage-backed (manual bKash flow).
// Before real launch this must move to a database + authenticated admin.
// ---------------------------------------------------------------------------

export type OrderStatus = "pending" | "paid" | "delivered" | "cancelled";

export type Order = {
  id: string;
  createdAt: string;
  gameSlug: string;
  gameName: string;
  packageName: string;
  amount: string;
  priceBdt: number;
  uid: string;
  name: string;
  phone: string;
  paymentMethod: "bKash" | "Nagad" | "Rocket" | "Upay";
  senderNumber: string;
  trxId: string;
  status: OrderStatus;
  note?: string;
};

const KEY = "topupghor_orders_v1";
const FLOAT_KEY = "topupghor_float_v1";

function read(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(orders: Order[]) {
  localStorage.setItem(KEY, JSON.stringify(orders));
}

export function saveOrder(order: Order) {
  const orders = read();
  orders.unshift(order);
  write(orders);
}

export function listOrders(): Order[] {
  return read();
}

export function findOrders(query: string): Order[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return read().filter(
    (o) =>
      o.id.toLowerCase() === q ||
      o.phone.replace(/\D/g, "").endsWith(q.replace(/\D/g, "")) ||
      o.trxId.toLowerCase() === q
  );
}

export function updateOrderStatus(id: string, status: OrderStatus, note?: string) {
  const orders = read().map((o) => (o.id === id ? { ...o, status, note } : o));
  write(orders);
}

export function makeOrderId(): string {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `TG-${stamp}-${rand}`;
}

// Same sender-number + repeated TrxID pattern check (fake-screenshot fraud helper)
export function fraudFlags(order: Order): string[] {
  const orders = read();
  const flags: string[] = [];
  const sameTrx = orders.filter(
    (o) => o.id !== order.id && o.trxId.toLowerCase() === order.trxId.toLowerCase()
  );
  if (sameTrx.length > 0) flags.push(`এই TrxID আগেও ব্যবহার হয়েছে (${sameTrx.length} বার)`);
  const sameSenderCount = orders.filter(
    (o) => o.id !== order.id && o.senderNumber.replace(/\D/g, "") === order.senderNumber.replace(/\D/g, "")
  ).length;
  if (sameSenderCount >= 3) flags.push(`একই sender নম্বর থেকে ${sameSenderCount + 1}টি অর্ডার`);
  return flags;
}

export function getFloat(): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(FLOAT_KEY) || "0");
}

export function setFloat(v: number) {
  localStorage.setItem(FLOAT_KEY, String(v));
}

export const STATUS_BN: Record<OrderStatus, string> = {
  pending: "অপেক্ষমাণ",
  paid: "পেমেন্ট পেয়েছি",
  delivered: "ডেলিভারি সম্পন্ন",
  cancelled: "বাতিল",
};

export const STATUS_EN: Record<OrderStatus, string> = {
  pending: "Pending",
  paid: "Payment received",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function statusLabel(status: OrderStatus, lang: "bn" | "en"): string {
  return lang === "en" ? STATUS_EN[status] : STATUS_BN[status];
}
