import Eyebrow from "./Eyebrow";

const IRON_TIERS = [
  {
    tag: "STARTER",
    name: "Foundations",
    blurb:
      "First 8 weeks. We teach the lifts, fix what hurts, and build the habit.",
    price: "149",
    cadence: "/mo",
    bullets: [
      "2× small group sessions / wk",
      "Movement screen + plan",
      "Nutrition starter guide",
      "Private member chat",
    ],
    featured: false,
  },
  {
    tag: "MOST POPULAR",
    name: "Build",
    blurb:
      "Three days a week of coached strength + conditioning. The core program.",
    price: "249",
    cadence: "/mo",
    bullets: [
      "3× coached sessions / wk",
      "Custom programming",
      "Monthly check-in call",
      "Open gym access",
      "Nutrition tracking",
    ],
    featured: true,
  },
  {
    tag: "1-ON-1",
    name: "Private",
    blurb:
      "Just you and a coach. Best for fast results, injury work, athletes.",
    price: "499",
    cadence: "/mo",
    bullets: [
      "4× 1:1 sessions / wk",
      "Fully personal program",
      "Weekly video review",
      "Nutrition coaching",
      "Text access 7d",
    ],
    featured: false,
  },
];

function cx(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Programs() {
  return (
    <section className="border-b border-iron-line px-6 py-16 lg:px-14 lg:py-[110px]">
      <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Eyebrow num="01" label="Programs" />
          <h2 className="mt-6 font-iron-display text-5xl leading-[0.95] tracking-tight lg:text-6xl">
            Pick the plan.
            <br />
            <span className="text-iron-text-muted">We handle the rest.</span>
          </h2>
        </div>

        <p className="max-w-xs font-iron-body text-base leading-relaxed text-iron-text-dim">
          Every program starts with a free 45-minute intro — no commitment, no
          upsell.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {IRON_TIERS.map((tier) => {
          const f = tier.featured;
          return (
            <article
              key={tier.name}
              aria-label={`${tier.name} pricing plan`}
              className={cx(
                "flex min-h-[480px] flex-col border p-8",
                f
                  ? "border-iron-orange bg-iron-orange text-iron-bg"
                  : "border-iron-line bg-iron-card text-iron-text",
              )}
            >
              <p
                className={cx(
                  "mb-5 font-iron-mono text-[11px] uppercase tracking-[0.16em]",
                  f ? "text-iron-bg" : "text-iron-orange",
                )}
              >
                {tier.tag}
              </p>

              <h3 className="mb-3 font-iron-display text-4xl leading-none">
                {tier.name}
              </h3>

              <p
                className={cx(
                  "mb-6 font-iron-body text-sm leading-relaxed",
                  f ? "text-iron-bg opacity-70" : "text-iron-text-dim",
                )}
              >
                {tier.blurb}
              </p>

              <div
                className={cx(
                  "mb-6 flex items-baseline gap-1 border-b pb-6",
                  f ? "border-iron-bg/25" : "border-iron-line",
                )}
              >
                <span className="font-iron-mono text-lg leading-none">$</span>
                <span className="font-iron-display text-5xl leading-none">
                  {tier.price}
                </span>
                <span
                  className={cx(
                    "font-iron-mono text-sm",
                    f ? "text-iron-bg opacity-60" : "text-iron-text-dim",
                  )}
                >
                  {tier.cadence}
                </span>
              </div>

              <ul className="mb-8" role="list">
                {tier.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className={cx(
                      "flex items-start gap-3 border-b py-3 font-iron-mono text-[13px]",
                      f ? "border-iron-bg/25" : "border-iron-line",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        "shrink-0",
                        f ? "text-iron-bg" : "text-iron-orange",
                      )}
                    >
                      +
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={cx(
                  "mt-auto w-full py-3.5 font-iron-mono text-sm uppercase tracking-[0.12em] transition-opacity hover:opacity-80",
                  f
                    ? "bg-iron-bg text-iron-paper"
                    : "bg-iron-orange text-iron-bg",
                )}
              >
                Get Started →
              </button>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 border border-iron-line bg-iron-panel px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-iron-mono text-[11px] uppercase tracking-[0.16em] text-iron-orange">
            FOR TEAMS
          </p>
          <p className="mt-1 font-iron-body text-sm text-iron-text-dim">
            Corporate wellness programs — bring NLY/Fit to your business.
          </p>
        </div>

        <a
          href="#"
          className="whitespace-nowrap font-iron-mono text-sm uppercase tracking-[0.12em] text-iron-text transition-colors hover:text-iron-orange"
        >
          Get Proposal →
        </a>
      </div>
    </section>
  );
}
