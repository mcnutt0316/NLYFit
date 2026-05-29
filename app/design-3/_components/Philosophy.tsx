export default function Philosophy() {
  return (
    <section className="border-b border-atl-divider px-14 py-[110px]">
      <div className="grid grid-cols-[1fr_2fr] items-start gap-14">
        {/* Left: section label + heading */}
        <div>
          <div className="font-atl-mono text-[11px] uppercase tracking-[0.18em] text-atl-rust">
            01 — Philosophy
          </div>
          <h2 className="font-atl-serif mt-5 text-[48px] leading-[1.05] text-atl-ink">
            What we
            <br />
            <span className="italic text-atl-rust">believe.</span>
          </h2>
        </div>

        {/* Right: drop-cap paragraph + follow-up */}
        <div>
          <p className="font-atl-serif m-0 text-[30px] leading-[1.35] text-atl-ink">
            {/* Drop cap: float left, 96px italic rust "W" */}
            <span className="font-atl-serif [float:left] mr-4 mt-2 text-[96px] italic leading-[0.85] text-atl-rust">
              W
            </span>
            e built the kind of gym we wished existed. Small enough that we know
            your name. Serious enough to get you stronger than you&rsquo;ve ever
            been. Welcoming enough that your first time under a barbell
            isn&rsquo;t your last.
          </p>
          <p className="font-atl-body mt-6 text-[16px] leading-[1.6] text-atl-ink-dim">
            We don&rsquo;t sell quick fixes or 30-day challenges. We coach real
            people — beginners, busy parents, weight-loss clients, business
            owners — and we stay with them long enough for the work to mean
            something. Six years in, that&rsquo;s still the whole point.
          </p>
        </div>
      </div>
    </section>
  );
}
