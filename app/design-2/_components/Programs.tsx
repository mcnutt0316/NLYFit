import Image from "next/image";
import Link from "next/link";

const programs = [
  {
    tag: "BEGINNER",
    name: "Foundations",
    desc: "First 8 weeks. Teach the lifts, fix what hurts, build the habit.",
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1400&q=80&auto=format&fit=crop",
  },
  {
    tag: "STRENGTH",
    name: "Build",
    desc: "Three coached days a week — the core program. Custom programming.",
    src: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1400&q=80&auto=format&fit=crop",
  },
  {
    tag: "WEIGHT LOSS",
    name: "Reshape",
    desc: "Strength + conditioning + nutrition. Sustainable, no crash dieting.",
    src: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1400&q=80&auto=format&fit=crop",
  },
  {
    tag: "ATHLETIC",
    name: "Performance",
    desc: "Olympic lifting, plyo, sport-specific. For athletes or those chasing PRs.",
    src: "https://images.unsplash.com/photo-1583500178690-f7fd39962dba?w=1400&q=80&auto=format&fit=crop",
  },
  {
    tag: "1-ON-1",
    name: "Private",
    desc: "Just you and a coach. Rehab work, fast progress, accountability.",
    src: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?w=1400&q=80&auto=format&fit=crop",
  },
  {
    tag: "TEAMS",
    name: "Corporate",
    desc: "Wellness programs for businesses 4–40 employees. On-site or in-gym.",
    src: "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=1400&q=80&auto=format&fit=crop",
  },
] as const;

export default function Programs() {
  return (
    <section className="px-14 py-[110px]" aria-labelledby="volt-programs-heading">
      <header className="mb-12 flex items-end justify-between">
        <div>
          <p className="font-volt-mono mb-3.5 text-[11px] uppercase tracking-[0.18em] text-volt-volt">
            / 01 — What we do
          </p>
          <h2
            id="volt-programs-heading"
            className="font-volt-display m-0 text-[72px] leading-[0.95] text-volt-ink"
          >
            Real programs.
            <br />
            <span className="text-volt-volt">Real coaching.</span>
          </h2>
        </div>
        <p className="max-w-[360px] text-[15px] leading-[1.55] text-volt-ink-dim">
          Six coached programs from total-beginner to chasing-PRs. Every one starts with a
          free intro session so we land on the right fit.
        </p>
      </header>

      <ul
        className="grid grid-cols-3 gap-5 list-none m-0 p-0"
        role="list"
      >
        {programs.map(({ tag, name, desc, src }) => (
          <li
            key={name}
            className="relative flex flex-col overflow-hidden rounded-[18px] border border-volt-line bg-volt-card"
          >
            <div className="relative h-[200px] bg-volt-panel">
              <Image
                src={src}
                alt={`${name} program`}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center"
              />
              <span className="font-volt-mono absolute left-3.5 top-3.5 rounded-full bg-volt-volt px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-volt-bg">
                {tag}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-volt-display m-0 text-[30px] text-volt-ink">{name}</h3>
              <p className="mt-2.5 flex-1 text-[14px] leading-[1.55] text-volt-ink-dim">
                {desc}
              </p>
              <Link
                href={`/programs/${name.toLowerCase()}`}
                className="mt-[18px] flex items-center justify-between text-[13px] font-bold uppercase tracking-[0.06em] text-volt-ink no-underline"
              >
                <span>Learn More</span>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-volt-volt text-[14px] text-volt-bg"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
