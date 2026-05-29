const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;
const slots = ["6:00A", "7:30A", "12:00P", "4:30P", "6:00P"] as const;

export default function Booking() {
  return (
    <section className="border-b border-atl-divider px-14 py-[110px]">
      <div className="font-atl-mono text-[11px] uppercase tracking-[0.18em] text-atl-rust">
        07 — Pay a Visit
      </div>
      <h2 className="font-atl-serif mb-14 mt-4 text-[96px] leading-[0.95] text-atl-ink">
        Book your{" "}
        <span className="italic text-atl-rust">free intro</span>.
      </h2>

      {/* Two-column bordered cream panel */}
      <div className="grid grid-cols-[1fr_1.4fr] border border-atl-ink bg-atl-cream">
        {/* Left: info copy */}
        <div className="border-r border-atl-ink p-10">
          <div className="font-atl-serif text-[40px] leading-[1.0] text-atl-ink">
            45 minutes.
            <br />
            <span className="italic text-atl-rust">Zero pressure.</span>
          </div>
          <p className="font-atl-serif mt-5 text-[19px] italic leading-[1.4] text-atl-ink-dim">
            Walk the space. Run a movement screen. Talk about what you want.
            Leave with a plan — even if you decide we&rsquo;re not for you.
          </p>

          {/* Address block */}
          <div className="mt-9 border-t border-atl-divider pt-6">
            <div className="font-atl-mono mb-3.5 text-[10px] uppercase tracking-[0.18em] text-atl-muted">
              Find us
            </div>
            <div className="font-atl-serif text-[22px] leading-[1.35] text-atl-ink">
              2487 Industrial Pkwy
              <br />
              Akron, OH 44310
            </div>
            <div className="font-atl-mono mt-4 text-[12px] leading-[1.8] tracking-[0.06em] text-atl-muted">
              (234) 555-0119
              <br />
              hello@nlyfit.com
            </div>
          </div>
        </div>

        {/* Right: calendar picker */}
        <div className="p-10">
          <div className="mb-4 flex items-baseline justify-between">
            <div className="font-atl-serif text-[28px] text-atl-ink">
              Pick a time
            </div>
            <div className="font-atl-mono text-[11px] tracking-[0.14em] text-atl-muted">
              WEEK 21 · MAY 2026
            </div>
          </div>

          {/* Day strip */}
          <div className="grid grid-cols-6 border border-atl-divider">
            {days.map((d, i) => (
              <div
                key={d}
                className={`py-3.5 text-center ${i === 2 ? "bg-atl-ink text-atl-paper" : "text-atl-ink"} ${i < 5 ? "border-r border-atl-divider" : ""}`}
              >
                <div className="font-atl-mono text-[10px] tracking-[0.12em] opacity-60">
                  {d}
                </div>
                <div className="font-atl-serif mt-1 text-[24px]">
                  {String(25 + i).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>

          <div className="font-atl-mono mb-2.5 mt-[22px] text-[11px] uppercase tracking-[0.14em] text-atl-muted">
            Wednesday · May 27
          </div>

          {/* Time slots */}
          <div className="grid grid-cols-5 gap-2.5">
            {slots.map((s, i) => (
              <button
                key={s}
                className={`font-atl-serif py-4 text-[18px] ${i === 2 ? "border border-atl-rust bg-atl-rust text-atl-paper" : "border border-atl-divider bg-transparent text-atl-ink"}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Confirm CTA */}
          <button className="font-atl-body mt-[22px] w-full bg-atl-ink py-5 text-[14px] font-semibold uppercase tracking-[0.16em] text-atl-paper">
            Confirm Wednesday 12:00P →
          </button>
        </div>
      </div>
    </section>
  );
}
