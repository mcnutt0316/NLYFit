const plans = [
  { name: "Foundations", price: "149", tag: "Beginner", featured: false },
  { name: "Build", price: "249", tag: "★ Most Picked", featured: true },
  { name: "Private", price: "499", tag: "1-on-1", featured: false },
] as const;

const rows = [
  ["Coached sessions / week", "2", "3", "4"],
  ["Group size", "Small group", "Small group", "1-on-1"],
  ["Custom programming", "Templated", "Yes", "Fully personal"],
  ["Nutrition coaching", "Starter guide", "Tracking + check-in", "Full coaching"],
  ["Coach access", "Member chat", "Monthly call", "7-day text"],
  ["Open gym access", "—", "Yes", "Yes"],
] as const;

export default function Pricing() {
  return (
    <section className="border-b border-atl-divider px-14 py-[110px]">
      {/* Header */}
      <div className="mb-12">
        <div className="font-atl-mono text-[11px] uppercase tracking-[0.18em] text-atl-rust">
          04 — Pricing
        </div>
        <h2 className="font-atl-serif m-0 mt-4 text-[88px] leading-[0.98] text-atl-ink">
          Choose your{" "}
          <span className="italic text-atl-rust">pace.</span>
        </h2>
      </div>

      {/* Table panel */}
      <div className="border border-atl-ink bg-atl-cream">
        {/* Header row */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-atl-ink">
          <div className="p-8">
            <div className="font-atl-mono text-[11px] uppercase tracking-[0.14em] text-atl-muted">
              Plan / Feature
            </div>
          </div>
          {plans.map((t) => (
            <div
              key={t.name}
              className={`border-l border-atl-ink p-8 text-center ${t.featured ? "bg-atl-ink text-atl-paper" : "text-atl-ink"}`}
            >
              <div
                className={`font-atl-mono mb-2.5 text-[10px] uppercase tracking-[0.14em] ${t.featured ? "text-atl-gold" : "text-atl-rust"}`}
              >
                {t.tag}
              </div>
              <div className="font-atl-serif text-[44px] leading-none">
                {t.name}
              </div>
              <div className="font-atl-serif mt-3 text-[28px]">
                ${t.price}
                <span
                  className={`font-atl-mono text-[12px] tracking-[0.06em] ${t.featured ? "text-[#a8a294]" : "text-atl-muted"}`}
                >
                  /mo
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Feature rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] ${i < rows.length - 1 ? "border-b border-atl-divider" : ""}`}
          >
            <div className="font-atl-serif px-6 py-[18px] text-[18px] italic text-atl-ink">
              {row[0]}
            </div>
            {row.slice(1).map((val, j) => (
              <div
                key={j}
                className={`border-l border-atl-divider px-6 py-[18px] text-center font-atl-body text-[15px] font-medium text-atl-ink ${j === 1 ? "bg-atl-paper-alt" : ""}`}
              >
                {val}
              </div>
            ))}
          </div>
        ))}

        {/* CTA row */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-t border-atl-ink">
          <div className="p-6" />
          {plans.map((t, i) => (
            <div
              key={t.name}
              className={`border-l border-atl-ink p-5 ${i === 1 ? "bg-atl-paper-alt" : ""}`}
            >
              <button
                className={`font-atl-body w-full border border-atl-ink py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] ${t.featured ? "bg-atl-ink text-atl-paper" : "bg-transparent text-atl-ink"}`}
              >
                Choose Plan →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
