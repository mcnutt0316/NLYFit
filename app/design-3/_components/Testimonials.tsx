import Image from "next/image";

const quotes = [
  {
    q: "I lost 38 pounds in eight months. More than that — I learned how to actually train. First time it ever stuck.",
    name: "Marcus T.",
    detail: "Build · 8 months",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1400&q=80&auto=format&fit=crop",
  },
  {
    q: "I walked in scared of barbells. Now I deadlift 235 pounds. The coaching is patient, the room is no-ego, and I feel like part of a team.",
    name: "Jenna R.",
    detail: "Foundations → Build · 1 year",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1400&q=80&auto=format&fit=crop",
  },
] as const;

export default function Testimonials() {
  return (
    <section className="border-b border-atl-divider px-14 py-[110px]">
      {/* Header */}
      <div className="mb-14 flex items-end justify-between">
        <div>
          <div className="font-atl-mono text-[11px] uppercase tracking-[0.18em] text-atl-rust">
            05 — From the Members
          </div>
          <h2 className="font-atl-serif m-0 mt-4 text-[88px] leading-[0.98] text-atl-ink">
            What they
            <br />
            <span className="italic text-atl-rust">are saying.</span>
          </h2>
        </div>
        <div className="text-right">
          <div className="font-atl-serif text-[48px] leading-none text-atl-ink">
            4.9 / 5
          </div>
          <div className="font-atl-mono mt-1.5 text-[11px] tracking-[0.14em] text-atl-muted">
            ★ ★ ★ ★ ★ · 92 REVIEWS
          </div>
        </div>
      </div>

      {/* Two-column quote grid */}
      <div className="grid grid-cols-2 gap-14">
        {quotes.map((t) => (
          <div key={t.name} className="relative">
            {/* Large decorative quote mark */}
            <div
              className="font-atl-serif pointer-events-none absolute -left-2 -top-2.5 text-[120px] italic leading-[0.6] text-atl-rust opacity-40"
              aria-hidden="true"
            >
              &ldquo;
            </div>
            <p className="font-atl-serif relative m-0 pl-10 text-[30px] leading-[1.32] text-atl-ink">
              {t.q}
            </p>
            <div className="mt-7 flex items-center gap-4 pl-10">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-atl-divider">
                <Image
                  src={t.src}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <div className="font-atl-serif text-[22px] text-atl-ink">
                  {t.name}
                </div>
                <div className="font-atl-mono mt-1 text-[11px] uppercase tracking-[0.12em] text-atl-muted">
                  {t.detail}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
