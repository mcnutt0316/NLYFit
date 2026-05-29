const tiers = [
  {
    name: "Foundations",
    price: "149",
    tag: "BEGINNER FRIENDLY",
    featured: false,
    bullets: [
      "2× small-group sessions / wk",
      "Movement screen + plan",
      "Nutrition starter guide",
      "Private member chat",
    ],
  },
  {
    name: "Build",
    price: "249",
    tag: "⚡ MOST POPULAR",
    featured: true,
    bullets: [
      "3× coached sessions / wk",
      "Fully custom programming",
      "Monthly check-in call",
      "Nutrition tracking + coaching",
      "Open gym access",
    ],
  },
  {
    name: "Private",
    price: "499",
    tag: "ONE-ON-ONE",
    featured: false,
    bullets: [
      "4× 1:1 sessions / wk",
      "Personal program",
      "Weekly video review",
      "Full nutrition coaching",
      "7-day text access",
    ],
  },
] as const;

export default function Pricing() {
  return (
    <section
      className="px-14 pb-[110px] pt-[120px]"
      aria-labelledby="volt-pricing-heading"
    >
      <header className="mb-14 text-center">
        <p className="font-volt-mono mb-3.5 text-[11px] uppercase tracking-[0.18em] text-volt-volt">
          / 03 — Plans &amp; pricing
        </p>
        <h2
          id="volt-pricing-heading"
          className="font-volt-display m-0 text-[72px] leading-[0.95] text-volt-ink"
        >
          Simple plans.
          <br />
          <span className="text-volt-volt">No long contracts.</span>
        </h2>
      </header>

      <ul
        className="grid grid-cols-3 items-stretch gap-5 list-none m-0 p-0"
        role="list"
      >
        {tiers.map(({ name, price, tag, featured, bullets }) => (
          <li
            key={name}
            className={[
              "relative flex flex-col rounded-[24px] p-8",
              featured
                ? "-translate-y-4 border border-volt-volt bg-volt-volt text-volt-bg shadow-[0_24px_60px_#c8ff2e30]"
                : "border border-volt-line bg-volt-card text-volt-ink",
            ].join(" ")}
          >
            <span
              className={[
                "font-volt-mono self-start rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em]",
                featured
                  ? "bg-volt-bg text-volt-volt"
                  : "bg-volt-bg-alt text-volt-ink-dim",
              ].join(" ")}
            >
              {tag}
            </span>

            <h3 className="font-volt-display mt-6 text-[44px] leading-none">{name}</h3>

            <div
              className={[
                "mb-6 mt-4 flex items-baseline gap-1 border-b pb-6",
                featured ? "border-black/20" : "border-volt-line",
              ].join(" ")}
            >
              <span className="font-volt-mono text-[14px] opacity-60">$</span>
              <span className="font-volt-display text-[64px] leading-none">{price}</span>
              <span className="font-volt-mono text-[13px] opacity-60">/mo</span>
            </div>

            <ul className="m-0 flex-1 list-none p-0" role="list">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 py-2 text-[14px] leading-snug">
                  <span
                    className={[
                      "mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                      featured
                        ? "bg-volt-bg text-volt-volt"
                        : "bg-volt-volt text-volt-bg",
                    ].join(" ")}
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <button
              className={[
                "font-volt-display mt-7 w-full rounded-full py-4 text-[14px] tracking-[0.06em]",
                featured
                  ? "bg-volt-bg text-volt-volt"
                  : "bg-volt-volt text-volt-bg",
              ].join(" ")}
            >
              {featured ? "GET STARTED ↗" : "CHOOSE PLAN"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
