import Link from "next/link";

type Props = {
  eyebrow?: string;
  title: string;
  desc: string;
  href: string;
  label: string;
  altHref?: string;
  altLabel?: string;
};

export default function NextStep({
  eyebrow = "下一步",
  title,
  desc,
  href,
  label,
  altHref,
  altLabel,
}: Props) {
  return (
    <section className="mt-16 mb-6">
      <div className="relative overflow-hidden rounded-2xl border border-blue/15 bg-gradient-to-r from-blue-pale via-white to-white px-7 py-8 md:px-10 md:py-9 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 justify-between">
        <div className="absolute -right-14 -top-16 w-56 h-56 rounded-full bg-blue/[0.05] pointer-events-none" />
        <div className="absolute -right-4 bottom-0 w-32 h-32 rounded-full bg-gold/[0.06] pointer-events-none" />
        <div className="relative">
          <p className="text-[11px] tracking-[0.3em] text-blue/60 mb-2">{eyebrow}</p>
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          <p className="mt-2 text-sm text-ink/60 leading-relaxed max-w-xl">{desc}</p>
        </div>
        <div className="relative flex items-center gap-3 shrink-0 flex-wrap">
          {altHref && altLabel && (
            <Link
              href={altHref}
              className="px-5 py-3 rounded-full border border-ink/12 text-sm text-ink/70 hover:border-blue/50 hover:text-blue transition-colors"
            >
              {altLabel}
            </Link>
          )}
          <Link
            href={href}
            className="btn-blue text-white px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap"
          >
            {label} →
          </Link>
        </div>
      </div>
    </section>
  );
}
