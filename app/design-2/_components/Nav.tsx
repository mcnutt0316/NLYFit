import Link from "next/link";

const links = ["Home", "Programs", "Coach", "Pricing", "Contact"] as const;

export default function Nav() {
  return (
    <nav
      className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-14 py-5"
      aria-label="Primary navigation"
    >
      <div className="flex items-center gap-3">
        <div
          className="font-volt-display flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-volt-volt text-[22px] text-volt-bg"
          aria-hidden="true"
        >
          N
        </div>
        <span className="font-volt-display text-[18px] tracking-[0.02em] text-volt-ink">
          NLY<span className="text-volt-volt">·</span>FIT
        </span>
      </div>

      <ul className="m-0 flex list-none gap-10 p-0" role="list">
        {links.map((label) => {
          const active = label === "Programs";
          return (
            <li key={label} className="relative">
              <Link
                href={`/${label.toLowerCase()}`}
                className={`text-sm font-medium no-underline ${active ? "text-volt-volt" : "text-volt-ink"}`}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
              {active && (
                <span
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-volt-volt"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ul>

      <Link
        href="/book"
        className="font-volt-body inline-flex items-center gap-2.5 rounded-full bg-volt-volt px-[22px] py-[13px] text-[12px] font-bold uppercase tracking-[0.1em] text-volt-bg transition-opacity hover:opacity-90"
      >
        Book Intro
        <span className="text-base leading-none" aria-hidden="true">→</span>
      </Link>
    </nav>
  );
}
