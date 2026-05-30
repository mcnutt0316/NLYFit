import Image from "next/image";

const certs = [
  { key: "NSCA-CPT", label: "Strength & Conditioning" },
  { key: "PN-1", label: "Precision Nutrition" },
  { key: "USAW-L1", label: "Sports Performance" },
] as const;

export default function About() {
  return (
    <section
      className="relative overflow-hidden bg-volt-bg-alt px-6 lg:px-14 py-[110px]"
      aria-labelledby="volt-about-heading"
    >
      {/* volt-green accent bar top-right */}
      <div
        className="absolute right-0 top-0 h-3.5 w-[280px] bg-volt-volt"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] items-center gap-14">
        {/* Left: coach photo with offset volt-green outline frame */}
        <figure className="relative m-0">
          <div
            className="absolute -left-6 bottom-[-24px] right-6 top-6 rounded-[24px] border-2 border-volt-volt"
            aria-hidden="true"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]">
            <Image
              src="https://images.unsplash.com/photo-1517438476312-10d79c077509?w=1400&q=80&auto=format&fit=crop"
              alt="Coach in action on the training floor"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>
        </figure>

        {/* Right: copy + certs */}
        <div>
          <p className="font-volt-mono mb-3.5 text-[11px] uppercase tracking-[0.18em] text-volt-volt">
            / 02 — Meet the coach
          </p>
          <h2
            id="volt-about-heading"
            className="font-volt-display m-0 text-[64px] leading-[0.95] text-volt-ink"
          >
            Built by a coach
            <br />
            who{" "}
            <span className="text-volt-volt">actually shows up.</span>
          </h2>
          <p className="mt-6 text-[17px] leading-[1.6] text-volt-ink-dim">
            I opened NLY/Fit in a two-car garage in 2019 because the big gyms felt like
            factories. We do this differently — small groups, real coaching, real
            progressions. Six years in, every person who walks in is somebody I know by
            name.
          </p>

          <ul
            className="mt-9 grid grid-cols-3 gap-4 list-none m-0 p-0"
            role="list"
          >
            {certs.map(({ key, label }) => (
              <li
                key={key}
                className="rounded-[14px] border border-volt-line bg-volt-card p-[18px]"
              >
                <div className="font-volt-display text-[20px] text-volt-volt">{key}</div>
                <div className="font-volt-mono mt-1.5 text-[10px] uppercase tracking-[0.08em] text-volt-ink-dim">
                  {label}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
