import { ReactNode } from "react";

export default function Sticker({
  children,
  color = "bg-sun text-ink",
  tilt = "-3deg",
}: {
  children: ReactNode;
  color?: string;
  tilt?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-ink ${color} px-4 py-1 text-xs font-extrabold uppercase tracking-wider shadow-hard-sm`}
      style={{ transform: `rotate(${tilt})` }}
    >
      {children}
    </span>
  );
}
