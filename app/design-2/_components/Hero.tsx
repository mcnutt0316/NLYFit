import Image from "next/image";

const stats = [
  { value: "140+", label: "Clients coached" },
  { value: "4.9★", label: "Avg rating" },
  { value: "6 yrs", label: "In the garage" },
];

const barHeights = [18, 32, 22, 40, 28, 36, 24];

export default function Hero() {
  return (
    <section
      className="relative min-h-[760px] overflow-hidden pt-[120px]"
      aria-labelledby="volt-hero-heading"
    >
      {/* volt-green diagonal slab */}
      <div
        className="absolute right-[-120px] top-[60px] z-[1] h-[720px] w-[760px] bg-volt-volt [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
        aria-hidden="true"
      />

      {/* dot texture */}
      <div
        className="absolute right-[60px] top-[100px] z-[2] h-[360px] w-[90px] opacity-40"
        style={{
          backgroundImage: `radial-gradient(#0a0d0a 1.5px, transparent 1.5px)`,
          backgroundSize: "14px 14px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-[3] grid grid-cols-2 items-center gap-8 px-14">
        {/* Left: text */}
        <div>
          <div className="font-volt-mono mb-7 inline-flex items-center gap-2.5 rounded-full border border-volt-line bg-volt-panel px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-volt-ink">
            <span
              className="h-2 w-2 rounded-full bg-volt-volt shadow-[0_0_12px_#c8ff2e]"
              aria-hidden="true"
            />
            Now open · Akron OH
          </div>

          <h1
            id="volt-hero-heading"
            className="font-volt-display m-0 text-[108px] leading-[0.92] text-volt-ink"
          >
            BUILD
            <br />
            YOUR{" "}
            <span className="text-volt-volt">BEST</span>
            <br />
            BODY YET.
          </h1>

          <p className="mt-7 max-w-[460px] text-[17px] leading-[1.55] text-volt-ink-dim">
            Coach-led strength &amp; conditioning in a 1,200&nbsp;sq&nbsp;ft
            garage gym. For beginners, weight loss, muscle building, and busy
            professionals who want a coach that actually shows up.
          </p>

          <div className="mt-9 flex gap-3.5">
            <button className="font-volt-body inline-flex items-center gap-2.5 rounded-full bg-volt-volt px-[30px] py-[18px] text-[14px] font-bold uppercase tracking-[0.1em] text-volt-bg">
              Start Free Intro
              <span aria-hidden="true">→</span>
            </button>
            <button className="font-volt-body inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-volt-ink-dim bg-transparent px-[30px] py-[18px] text-[14px] font-bold uppercase tracking-[0.1em] text-volt-ink">
              See Programs
            </button>
          </div>

          <dl className="mt-14 flex gap-12">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <dt className="font-volt-display text-[32px] leading-none text-volt-ink">
                  {value}
                </dt>
                <dd className="font-volt-mono mt-1.5 text-[11px] uppercase tracking-[0.1em] text-volt-ink-dim">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right: hero photo + floating badges */}
        <div className="relative h-[640px]">
          <div className="absolute inset-0 -translate-y-5">
            <Image
              src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1400&q=80&auto=format&fit=crop"
              alt="Athlete in training"
              fill
              sizes="50vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Result badge */}
          <div
            className="absolute left-[-30px] top-[100px] flex items-center gap-3 rounded-[14px] border border-volt-line bg-volt-bg px-[18px] py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            aria-label="Client result: Marcus lost 38 pounds in 8 months"
          >
            <div className="font-volt-display flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-volt-volt text-[18px] text-volt-bg">
              ↗
            </div>
            <div>
              <div className="font-volt-display text-[16px] text-volt-ink">+38 lbs lost</div>
              <div className="font-volt-mono mt-0.5 text-[10px] uppercase tracking-[0.1em] text-volt-ink-dim">
                Marcus · 8 mos
              </div>
            </div>
          </div>

          {/* Weekly volume badge */}
          <div
            className="absolute bottom-[60px] right-[-10px] w-[200px] rounded-[14px] border border-volt-line bg-volt-bg p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            aria-label="This week: 18 workouts, +12% volume"
          >
            <div className="font-volt-mono mb-2 text-[10px] uppercase tracking-[0.1em] text-volt-ink-dim">
              This week · 18 workouts
            </div>
            <div className="flex h-9 items-end gap-[3px]">
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${i === 6 ? "bg-volt-volt" : "bg-volt-line"}`}
                  style={{ height: h }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="font-volt-display mt-2.5 text-[18px] text-volt-ink">
              <span className="text-volt-volt">+12%</span> volume
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
