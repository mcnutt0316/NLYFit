import Image from "next/image";

type Program = {
  no: string;
  name: string;
  sub: string;
  desc: string;
  price: string;
  featured?: boolean;
  src: string;
};

const programs: Program[] = [
  {
    no: "I",
    name: "Foundations",
    sub: "For first-timers and returners",
    desc: "Eight weeks. We teach the lifts, fix what hurts, build the habit that makes the rest possible.",
    price: "149",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80&auto=format&fit=crop",
  },
  {
    no: "II",
    name: "Build",
    sub: "The core program",
    desc: "Three coached sessions a week. Custom programming for strength, conditioning, and the body you actually want.",
    price: "249",
    featured: true,
    src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1400&q=80&auto=format&fit=crop",
  },
  {
    no: "III",
    name: "Reshape",
    sub: "For sustained weight loss",
    desc: "Strength + conditioning paired with real nutrition coaching. Slow, sustainable, no crash dieting.",
    price: "249",
    src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1400&q=80&auto=format&fit=crop",
  },
  {
    no: "IV",
    name: "Private",
    sub: "One-on-one",
    desc: "Just you and a coach. Athletes, rehab work, fastest progress. We meet you where you are.",
    price: "499",
    src: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?w=1400&q=80&auto=format&fit=crop",
  },
];

export default function Programs() {
  return (
    <section className="border-b border-atl-divider px-6 lg:px-14 py-[110px]">
      {/* Section header */}
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="font-atl-mono text-[11px] uppercase tracking-[0.18em] text-atl-rust">
            02 — The Programs
          </div>
          <h2 className="font-atl-serif m-0 mt-4 text-[88px] leading-[0.98] text-atl-ink">
            Four ways
            <br />
            to{" "}
            <span className="italic text-atl-rust">get to work.</span>
          </h2>
        </div>
        <p className="max-w-[280px] text-[15px] leading-[1.6] text-atl-ink-dim">
          Each program starts with a free intro session. Cancel any month —
          there are no long contracts.
        </p>
      </div>

      {/* Mobile card list — hidden on lg+ */}
      <div className="flex flex-col border-t border-atl-divider lg:hidden">
        {programs.map((p) => (
          <div key={p.name} className="border-b border-atl-divider py-8">
            <div className="relative h-[200px] overflow-hidden mb-5">
              <Image
                src={p.src}
                alt={p.name}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="font-atl-mono text-[11px] uppercase tracking-[0.14em] text-atl-muted">
              {p.sub}
            </div>
            <div className="font-atl-serif mt-1.5 text-[36px] leading-none text-atl-ink">
              {p.no}. {p.name}
              {p.featured && (
                <span className="font-atl-mono ml-2 align-middle text-[10px] tracking-[0.16em] text-atl-rust">
                  ★ MOST PICKED
                </span>
              )}
            </div>
            <p className="font-atl-serif m-0 mt-3 text-[17px] leading-[1.4] text-atl-ink-dim">
              {p.desc}
            </p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <div className="font-atl-mono text-[10px] tracking-[0.14em] text-atl-muted">FROM</div>
                <div className="font-atl-serif text-[40px] leading-none text-atl-ink">
                  ${p.price}
                  <span className="font-atl-mono text-[13px] tracking-[0.06em] text-atl-muted">/mo</span>
                </div>
              </div>
              <a className="font-atl-body cursor-pointer border-b border-atl-ink pb-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-atl-ink">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop indexed row list — hidden below lg */}
      <div className="hidden lg:flex flex-col border-t border-atl-divider">
        {programs.map((p) => (
          <div
            key={p.name}
            className="grid grid-cols-[60px_200px_1.4fr_1fr_200px] items-center gap-8 border-b border-atl-divider py-8"
          >
            {/* Roman numeral */}
            <div className="font-atl-serif text-[48px] italic leading-none text-atl-rust">
              {p.no}
            </div>

            {/* Photo */}
            <div className="relative h-[140px] overflow-hidden">
              <Image
                src={p.src}
                alt={p.name}
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>

            {/* Name block */}
            <div>
              <div className="font-atl-mono text-[11px] uppercase tracking-[0.14em] text-atl-muted">
                {p.sub}
              </div>
              <div className="font-atl-serif mt-1.5 text-[48px] leading-none text-atl-ink">
                {p.name}
                {p.featured && (
                  <span className="font-atl-mono ml-3 align-middle text-[11px] tracking-[0.16em] text-atl-rust">
                    ★ MOST PICKED
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="font-atl-serif m-0 text-[19px] leading-[1.35] text-atl-ink-dim">
              {p.desc}
            </p>

            {/* Price + link */}
            <div className="text-right">
              <div className="font-atl-mono text-[10px] tracking-[0.14em] text-atl-muted">
                FROM
              </div>
              <div className="font-atl-serif text-[56px] leading-none text-atl-ink">
                ${p.price}
                <span className="font-atl-mono text-[14px] tracking-[0.06em] text-atl-muted">
                  /mo
                </span>
              </div>
              <a className="font-atl-body mt-2.5 inline-block cursor-pointer border-b border-atl-ink pb-0.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-atl-ink">
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate teaser */}
      <div className="mt-8 flex items-center justify-between border border-atl-divider bg-atl-paper-alt px-7 py-5">
        <div className="font-atl-serif text-[22px] italic text-atl-ink">
          Looking for corporate wellness? Programs for teams of 4+.
        </div>
        <a className="font-atl-body cursor-pointer text-[13px] font-semibold uppercase tracking-[0.14em] text-atl-rust">
          Get a Proposal →
        </a>
      </div>
    </section>
  );
}
