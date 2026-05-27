import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen bg-iron-bg flex flex-col">
      <header>
        <nav
          className="flex items-center justify-between px-6 py-5 lg:px-16 lg:py-6"
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            aria-label="NLYFit — return to homepage"
            className="font-iron-display text-white uppercase tracking-[0.18em] text-xl lg:text-2xl"
          >
            NLY<span className="text-iron-orange">FIT</span>
          </Link>

          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            <li>
              <Link
                href="/about"
                className="font-iron-body text-[11px] uppercase tracking-[0.12em] text-white/60 hover:text-white transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/programs"
                className="font-iron-body text-[11px] uppercase tracking-[0.12em] text-white/60 hover:text-white transition-colors duration-200"
              >
                Programs
              </Link>
            </li>
            <li>
              <Link
                href="/results"
                className="font-iron-body text-[11px] uppercase tracking-[0.12em] text-white/60 hover:text-white transition-colors duration-200"
              >
                Results
              </Link>
            </li>
            <li>
              <Link
                href="/book"
                className="font-iron-body text-[11px] uppercase tracking-[0.12em] text-white bg-iron-orange px-5 py-3 hover:opacity-90 active:opacity-95 transition-opacity duration-200"
              >
                Book a Call
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <section
        className="flex-1 relative grid lg:grid-cols-[3fr_2fr] overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="relative z-10 flex flex-col justify-center gap-7 px-6 py-16 lg:px-16 lg:py-20">
          <p
            className="font-iron-mono text-iron-orange text-[10px] uppercase tracking-[0.22em] flex items-center gap-3"
            aria-label="Coaching service details"
          >
            <span
              className="block h-px w-8 bg-iron-orange shrink-0"
              aria-hidden="true"
            />
            EST. 2024 — IN-PERSON COACHING
          </p>

          <h1
            id="hero-heading"
            className="font-iron-display text-white uppercase leading-[0.9] tracking-tight text-[clamp(2.8rem,7.5vw,7rem)]"
          >
            Outwork<br />
            Yesterday.<br />
            <span className="text-iron-orange">Every</span> Day.
          </h1>

          <p className="font-iron-body text-white/55 text-[15px] lg:text-base leading-[1.75] max-w-sm">
            Elite in-person coaching for athletes and lifters who are serious
            about progress. Structured programming. Relentless accountability.
            Measurable results.
          </p>

          <div className="pt-1">
            <Link
              href="/book"
              className="inline-block font-iron-body text-[11px] uppercase tracking-[0.14em] text-white bg-iron-orange px-8 py-4 hover:opacity-90 transition-opacity duration-200"
              aria-label="Book your first coaching session at NLYFit"
            >
              Start Training
            </Link>
          </div>
        </div>

        <div className="relative min-h-[45vh] lg:min-h-0">
          <div
            className="absolute inset-0 z-10 bg-gradient-to-r from-iron-bg via-iron-bg/50 to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-iron-bg to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
            alt="An athlete gripping a loaded barbell, focused and primed to lift"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </section>
    </div>
  );
}
