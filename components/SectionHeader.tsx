export default function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-ink/60">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-black text-ink md:text-4xl">{title}</h2>
      {sub && <p className="mt-2 max-w-xl text-ink/70">{sub}</p>}
    </div>
  );
}
