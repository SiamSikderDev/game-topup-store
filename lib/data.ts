// ---------------------------------------------------------------------------
// Catalog data — PRICES ARE PLACEHOLDERS.
// Indicative retail taken from the business plan §6 (gamesbd24.app, Oct 2026).
// Siam must confirm real prices with his supplier before launch.
// ---------------------------------------------------------------------------

export type GamePackage = {
  id: string;
  name: string;
  amount: string;
  priceBdt: number;
  tag?: "POPULAR" | "BEST VALUE" | "NEW";
  placeholder?: boolean;
};

export type Game = {
  slug: string;
  name: string;
  short: string;
  currency: string;
  tile: string; // tailwind bg for the game tile
  letter: string;
  blurb: { bn: string; en: string };
  packages: GamePackage[];
  // paused games show a "coming soon" notice and block checkout (reversible)
  paused?: boolean;
};

export const GAMES: Game[] = [
  {
    slug: "free-fire",
    name: "Free Fire",
    short: "FF",
    currency: "Diamonds",
    tile: "bg-pop",
    letter: "FF",
    blurb: { bn: "শুধু Player UID দিলেই ডায়মন্ড — পাসওয়ার্ড কখনো চাওয়া হয় না।", en: "Diamonds with just your Player UID — we never ask for passwords." },
    packages: [
      { id: "ff-25", name: "25 Diamonds", amount: "25", priceBdt: 25 },
      { id: "ff-50", name: "50 Diamonds", amount: "50", priceBdt: 40 },
      { id: "ff-115", name: "115 Diamonds", amount: "115", priceBdt: 77, tag: "POPULAR" },
      { id: "ff-240", name: "240 Diamonds", amount: "240", priceBdt: 152 },
      { id: "ff-310", name: "310 Diamonds", amount: "310", priceBdt: 195, placeholder: true },
      { id: "ff-520", name: "520 Diamonds", amount: "520", priceBdt: 330, placeholder: true },
      { id: "ff-645", name: "645 Diamonds", amount: "645", priceBdt: 420, placeholder: true },
      { id: "ff-1080", name: "1080 Diamonds", amount: "1080", priceBdt: 950, tag: "BEST VALUE" },
      { id: "ff-2180", name: "2180 Diamonds", amount: "2180", priceBdt: 1900, placeholder: true },
      { id: "ff-2830", name: "2830 Diamonds", amount: "2830", priceBdt: 2450, placeholder: true },
      { id: "ff-5600", name: "5600 Diamonds", amount: "5600", priceBdt: 4800, placeholder: true },
      { id: "ff-weekly-lite", name: "Weekly Lite Membership", amount: "Weekly Lite", priceBdt: 45, placeholder: true },
      { id: "ff-weekly", name: "Weekly Membership", amount: "Weekly", priceBdt: 160 },
      { id: "ff-monthly", name: "Monthly Membership", amount: "Monthly", priceBdt: 760 },
    ],
  },
  {
    slug: "pubg-mobile",
    name: "PUBG Mobile",
    short: "PUBG",
    currency: "UC",
    tile: "bg-skyy",
    letter: "UC",
    paused: true, // placeholder prices were ~35% below Codashop BD retail (Oct 9) — resume after supplier pricing is set
    blurb: { bn: "Unknown Cash (UC) — Character ID দিয়ে টপ-আপ, মিনিটেই ডেলিভারি।", en: "Unknown Cash (UC) — top up with Character ID, delivered in minutes." },
    packages: [
      { id: "pubg-60", name: "60 UC", amount: "60", priceBdt: 165, placeholder: true, tag: "POPULAR" },
      { id: "pubg-325", name: "325 UC", amount: "325", priceBdt: 825, placeholder: true },
      { id: "pubg-660", name: "660 UC", amount: "660", priceBdt: 1650, placeholder: true },
      { id: "pubg-1800", name: "1800 UC", amount: "1800", priceBdt: 4120, placeholder: true, tag: "BEST VALUE" },
    ],
  },
  {
    slug: "mlbb",
    name: "Mobile Legends (MLBB)",
    short: "MLBB",
    currency: "Diamonds",
    tile: "bg-lilac",
    letter: "ML",
    blurb: { bn: "MLBB ডায়মন্ড — Game ID + Zone ID দিয়ে দ্রুত টপ-আপ।", en: "MLBB diamonds — fast top-up with Game ID + Zone ID." },
    packages: [
      { id: "mlbb-86", name: "86 Diamonds", amount: "86", priceBdt: 130, placeholder: true, tag: "POPULAR" },
      { id: "mlbb-172", name: "172 Diamonds", amount: "172", priceBdt: 255, placeholder: true },
      { id: "mlbb-514", name: "514 Diamonds", amount: "514", priceBdt: 730, placeholder: true, tag: "BEST VALUE" },
      { id: "mlbb-weekly", name: "Weekly Diamond Pass", amount: "Weekly", priceBdt: 150, placeholder: true },
    ],
  },
  {
    slug: "codm",
    name: "Call of Duty: Mobile",
    short: "CODM",
    currency: "CP",
    tile: "bg-sun",
    letter: "CP",
    blurb: { bn: "COD Points (CP) — UID দিয়ে টপ-আপ, কোনো লগইন লাগে না।", en: "COD Points (CP) — top up with UID, no login needed." },
    packages: [
      { id: "codm-80", name: "80 CP", amount: "80", priceBdt: 120, placeholder: true, tag: "POPULAR" },
      { id: "codm-400", name: "400 CP", amount: "400", priceBdt: 580, placeholder: true },
      { id: "codm-800", name: "800 CP", amount: "800", priceBdt: 1120, placeholder: true, tag: "BEST VALUE" },
    ],
  },
];

export function getGame(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export const SUPPORT_WHATSAPP = "https://wa.me/8801XXXXXXXXX"; // TODO: Siam's real number
export const MERCHANT_BKASH = "01XXX-XXXXXX"; // TODO: Siam's merchant bKash number
export const MERCHANT_NAGAD = "01XXX-XXXXXX"; // TODO: Siam's merchant Nagad number

export const FAQS: { q: { bn: string; en: string }; a: { bn: string; en: string } }[] = [
  {
    q: { bn: "ডায়মন্ড পেতে কতক্ষণ লাগবে?", en: "How long does delivery take?" },
    a: { bn: "পেমেন্ট কনফার্ম হওয়ার পর সাধারণত ২–১০ মিনিটের মধ্যে ডেলিভারি হয়। সাপোর্ট আওয়ার: সকাল ৯টা – রাত ১১টা।", en: "Usually within 2–10 minutes after payment confirmation. Support hours: 9 AM – 11 PM." },
  },
  {
    q: { bn: "আমার গেমের পাসওয়ার্ড কি দিতে হবে?", en: "Do I need to share my game password?" },
    a: { bn: "না, কখনোই না। শুধু Player UID (সংখ্যার ID) দিলেই টপ-আপ হয়। পাসওয়ার্ড চাওয়া হয় না — এটাই আমাদের নিয়ম।", en: "No, never. Only your Player UID (numeric ID) is needed. We never ask for passwords — that's our rule." },
  },
  {
    q: { bn: "ভুল UID দিলে কী হবে?", en: "What if I enter the wrong UID?" },
    a: { bn: "ভুল UID-তে ডায়মন্ড গেলে তা ফেরত আনা যায় না। তাই অর্ডারের আগে UID দুইবার লিখে কনফার্ম করতে হয়। সাবধানে চেক করুন।", en: "Diamonds sent to a wrong UID can't be recovered. That's why you must type your UID twice to confirm. Check carefully." },
  },
  {
    q: { bn: "পেমেন্ট কীভাবে করব?", en: "How do I pay?" },
    a: { bn: "bKash / Nagad / Rocket / Upay দিয়ে আমাদের মার্চেন্ট নম্বরে Send Money করুন, তারপর sender নম্বর ও Transaction ID (TrxID) সাবমিট করুন।", en: "Send Money via bKash / Nagad / Rocket / Upay to our merchant number, then submit your sender number and Transaction ID (TrxID)." },
  },
  {
    q: { bn: "কোন সার্ভারের অ্যাকাউন্টে টপ-আপ হয়?", en: "Which server accounts are supported?" },
    a: { bn: "শুধু Bangladesh সার্ভারের অ্যাকাউন্টে। অন্য রিজিয়নের অ্যাকাউন্টে ডেলিভারি গ্যারান্টি দেওয়া হয় না।", en: "Bangladesh-server accounts only. Delivery to other regions isn't guaranteed." },
  },
  {
    q: { bn: "রিফান্ড পলিসি কী?", en: "What's the refund policy?" },
    a: { bn: "ডেলিভারি না হলে বা ভুল প্যাকেজ গেলে ৩ দিনের মধ্যে রিপোর্ট করলে রিফান্ড/রিপ্লেসমেন্ট দেওয়া হয়।", en: "If delivery fails or the wrong package arrives, report within 3 days for a refund/replacement." },
  },
];

export const UID_GUIDE_STEPS: { title: { bn: string; en: string }; desc: { bn: string; en: string } }[] = [
  { title: { bn: "গেম ওপেন করুন", en: "Open the game" }, desc: { bn: "Free Fire / PUBG / MLBB — যেকোনো একটা ওপেন করুন।", en: "Open Free Fire / PUBG / MLBB — whichever you play." } },
  { title: { bn: "প্রোফাইলে ট্যাপ করুন", en: "Tap your profile" }, desc: { bn: "উপরের বাম কোণায় আপনার avatar-এ ট্যাপ করুন।", en: "Tap your avatar in the top-left corner." } },
  { title: { bn: "সংখ্যার ID কপি করুন", en: "Copy the numeric ID" }, desc: { bn: "নামের নিচে যে সংখ্যার ID (UID) দেখাবে — সেটাই কপি করুন। এটাই আপনার Player ID।", en: "Copy the numeric ID (UID) shown under your name. That's your Player ID." } },
  { title: { bn: "অর্ডারে পেস্ট করুন", en: "Paste it in the order form" }, desc: { bn: "আমাদের অর্ডার ফর্মে UID দুইবার লিখে কনফার্ম করুন। পাসওয়ার্ড কোথাও লিখবেন না।", en: "Type your UID twice in our order form to confirm. Never type your password anywhere." } },
];
