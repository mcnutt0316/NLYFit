const days: { label: string; date: string; active?: true }[] = [
  { label: "MON", date: "25" },
  { label: "TUE", date: "26" },
  { label: "WED", date: "27", active: true },
  { label: "THU", date: "28" },
  { label: "FRI", date: "29" },
  { label: "SAT", date: "30" },
];

const slots = ["6:00A", "7:30A", "12:00P", "4:30P", "6:00P"] as const;
const ACTIVE_SLOT = "12:00P";

const contactInfo = [
  { icon: "📍", top: "2487 Industrial Pkwy", bottom: "Akron, OH 44310" },
  { icon: "☎", top: "(234) 555-0119", bottom: "Call or text" },
  { icon: "✉", top: "hello@nlyfit.com", bottom: "Get a reply in 24h" },
] as const;

export default function Booking() {
  return (
    <section className="px-14 py-[110px]" aria-labelledby="volt-booking-heading">
      <div className="grid grid-cols-[1fr_1.3fr] overflow-hidden rounded-[28px] border border-volt-line bg-volt-bg">
        {/* Left: info panel */}
        <div
          className="relative overflow-hidden border-r border-volt-line p-10"
          style={{ background: "linear-gradient(135deg, #0f1310, #0a0d0a)" }}
        >
          {/* radial glow */}
          <div
            className="pointer-events-none absolute -left-[100px] -top-[100px] h-[300px] w-[300px]"
            style={{
              background: "radial-gradient(circle, #c8ff2e22, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative">
            <p className="font-volt-mono mb-3.5 text-[11px] uppercase tracking-[0.18em] text-volt-volt">
              / 05 — Book free intro
            </p>
            <h2
              id="volt-booking-heading"
              className="font-volt-display m-0 text-[52px] leading-[0.95] text-volt-ink"
            >
              45 minutes.
              <br />
              <span className="text-volt-volt">Zero pressure.</span>
            </h2>
            <p className="mt-5 text-[15px] leading-[1.55] text-volt-ink-dim">
              Walk the room, run a movement screen, talk about what you want. You leave
              with a plan — even if you decide it&apos;s not for you.
            </p>

            <ul className="mt-8 flex flex-col gap-3.5 list-none m-0 p-0" role="list">
              {contactInfo.map(({ icon, top, bottom }) => (
                <li key={top} className="flex items-center gap-3.5">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-volt-line bg-volt-card text-base"
                    aria-hidden="true"
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-volt-ink">{top}</div>
                    <div className="font-volt-mono mt-0.5 text-[11px] uppercase tracking-[0.06em] text-volt-ink-dim">
                      {bottom}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: calendar picker */}
        <div className="p-10">
          <div className="mb-[18px] flex items-center justify-between">
            <span className="font-volt-display text-[22px] text-volt-ink">
              Pick a time
            </span>
            <span className="font-volt-mono text-[11px] uppercase tracking-[0.12em] text-volt-ink-dim">
              Week 21 · May 2026
            </span>
          </div>

          <div
            className="grid grid-cols-6 gap-2"
            role="group"
            aria-label="Select a day"
          >
            {days.map(({ label, date, active }) => (
              <button
                key={label}
                className={[
                  "rounded-[12px] border py-3 text-center",
                  active
                    ? "border-volt-volt bg-volt-volt text-volt-bg"
                    : "border-volt-line bg-volt-card text-volt-ink",
                ].join(" ")}
                aria-pressed={active ?? false}
              >
                <div className="font-volt-mono text-[10px] uppercase tracking-[0.1em] opacity-70">
                  {label}
                </div>
                <div className="font-volt-display mt-1 text-[22px]">{date}</div>
              </button>
            ))}
          </div>

          <p className="font-volt-mono my-6 text-[11px] uppercase tracking-[0.12em] text-volt-ink-dim">
            Wednesday · May 27 · 5 slots
          </p>

          <div
            className="grid grid-cols-5 gap-2"
            role="group"
            aria-label="Select a time"
          >
            {slots.map((s) => {
              const active = s === ACTIVE_SLOT;
              return (
                <button
                  key={s}
                  className={[
                    "font-volt-mono rounded-[12px] border py-4 text-[13px] font-bold tracking-[0.04em]",
                    active
                      ? "border-volt-volt bg-volt-volt text-volt-bg"
                      : "border-volt-line bg-transparent text-volt-ink",
                  ].join(" ")}
                  aria-pressed={active}
                >
                  {s}
                </button>
              );
            })}
          </div>

          <button className="font-volt-display mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-volt-volt py-5 text-[16px] tracking-[0.06em] text-volt-bg">
            Confirm 12:00P · May 27{" "}
            <span aria-hidden="true" className="text-lg">↗</span>
          </button>
        </div>
      </div>
    </section>
  );
}
