import Image from "next/image";

const stats = [
  { n: "140+", label: "Clients coached" },
  { n: "4.9 / 5", label: "Across 92 reviews" },
  { n: "6 yrs", label: "Coaching · since 2019" },
  { n: "1,200", label: "Square feet · Akron" },
] as const;

export default function Hero() {
  return (
    <section>
      {/* Eyebrow strip */}
      <div className="flex items-center justify-between border-b border-atl-divider px-6 lg:px-14 py-5 font-atl-mono text-[11px] tracking-[0.16em] text-atl-muted">
        <span>Vol. 06 — Issue 04</span>
        <span className="hidden lg:block font-atl-serif text-[18px] italic tracking-[0] text-atl-ink">
          &ldquo;Train like you mean it. Live like you&rsquo;ve already won.&rdquo;
        </span>
        <span>Spring / Summer 2026</span>
      </div>

      {/* Two-column hero spread */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] lg:min-h-[720px]">
        {/* Left: text */}
        <div className="flex flex-col justify-between px-6 lg:px-14 pb-16 pt-20">
          {/* Eyebrow with rust rule */}
          <div className="flex items-center gap-3.5">
            <div className="h-px w-14 bg-atl-rust" />
            <span className="font-atl-mono text-[11px] uppercase tracking-[0.18em] text-atl-rust">
              On the cover · Strength
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-atl-serif m-0 text-[132px] leading-[0.94] tracking-[-0.015em] text-atl-ink">
            The body
            <br />
            you want.
            <br />
            The coach
            <br />
            <span className="italic text-atl-rust">who shows up.</span>
          </h1>

          {/* Bottom: description + CTAs */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] items-end gap-6">
            <p className="font-atl-serif m-0 text-[21px] leading-[1.4] text-atl-ink-dim">
              A coach-led strength studio in Akron. We coach beginners,
              weight-loss clients, and people building real muscle for the first
              time — in a 1,200&nbsp;sq&nbsp;ft garage where every person who
              walks in is known by name.
            </p>
            <div className="flex flex-col gap-2.5">
              <button className="font-atl-body flex items-center justify-between gap-4 bg-atl-ink px-[22px] py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-atl-paper">
                Book Free Intro <span>→</span>
              </button>
              <button className="font-atl-body flex items-center justify-between gap-4 border border-atl-ink bg-transparent px-[22px] py-4 text-[13px] font-semibold uppercase tracking-[0.16em] text-atl-ink">
                Browse Programs <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: full-bleed editorial photo */}
        <div className="relative h-[360px] lg:h-auto lg:min-h-[720px] lg:border-l lg:border-atl-divider">
          <Image
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1400&q=80&auto=format&fit=crop"
            alt="Editorial portrait of a coach or athlete in natural light"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
          <div className="absolute bottom-6 right-6 bg-black/60 px-3 py-2 font-atl-mono text-[10px] tracking-[0.14em] text-atl-paper">
            FIG. 01 — INSIDE THE GARAGE, MAY 2026
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-t border-atl-divider">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-6 lg:px-8 py-5 lg:py-7 border-atl-divider ${i < 2 ? "border-b lg:border-b-0" : ""} ${i < 3 ? "lg:border-r" : ""}`}
          >
            <div className="font-atl-serif text-[44px] leading-none text-atl-ink">
              {s.n}
            </div>
            <div className="font-atl-mono mt-2 text-[10px] uppercase tracking-[0.16em] text-atl-muted">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
