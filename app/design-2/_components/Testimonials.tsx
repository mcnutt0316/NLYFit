import Image from "next/image";

const quotes = [
  {
    q: "I lost 38 pounds in eight months. More than that — I learned how to actually train. First time it stuck.",
    name: "Marcus T.",
    detail: "Build · 8 mos",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1400&q=80&auto=format&fit=crop",
  },
  {
    q: "I came in scared of barbells. Now I deadlift 235. The coaching is no-ego and the room feels like a team.",
    name: "Jenna R.",
    detail: "Foundations → Build · 1 yr",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1400&q=80&auto=format&fit=crop",
  },
  {
    q: "We sent six employees through corporate. Energy, morale, retention — all measurably up.",
    name: "David K.",
    detail: "Corporate · 12 mos",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1400&q=80&auto=format&fit=crop",
  },
] as const;

export default function Testimonials() {
  return (
    <section
      className="bg-volt-bg-alt px-6 lg:px-14 py-[110px]"
      aria-labelledby="volt-testimonials-heading"
    >
      <header className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
        <div>
          <p className="font-volt-mono mb-3.5 text-[11px] uppercase tracking-[0.18em] text-volt-volt">
            / 04 — Real results
          </p>
          <h2
            id="volt-testimonials-heading"
            className="font-volt-display m-0 text-[72px] leading-[0.95] text-volt-ink"
          >
            People who
            <br />
            <span className="text-volt-volt">show up</span> get results.
          </h2>
        </div>
        <div className="font-volt-mono text-right text-[13px] tracking-[0.1em] text-volt-ink-dim">
          <div className="font-volt-display text-[36px] tracking-normal text-volt-ink">4.9★</div>
          92 verified reviews
        </div>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none m-0 p-0" role="list">
        {quotes.map(({ q, name, detail, src }) => (
          <li
            key={name}
            className="flex flex-col rounded-[20px] border border-volt-line bg-volt-card p-7"
          >
            <blockquote className="m-0 flex flex-col flex-1">
              <span
                className="font-volt-display text-[48px] leading-[0.7] text-volt-volt"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="mt-2 flex-1 text-[16px] leading-[1.5] text-volt-ink">{q}</p>
              <footer className="mt-[22px] flex items-center gap-3.5 border-t border-volt-line pt-5">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-volt-volt">
                  <Image
                    src={src}
                    alt={`Photo of ${name}`}
                    fill
                    sizes="48px"
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <div className="text-[14px] font-bold text-volt-ink">{name}</div>
                  <div className="font-volt-mono mt-0.5 text-[11px] uppercase tracking-[0.08em] text-volt-ink-dim">
                    {detail}
                  </div>
                </div>
                <div className="ml-auto text-[14px] text-volt-volt" aria-label="5 stars">
                  ★★★★★
                </div>
              </footer>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
