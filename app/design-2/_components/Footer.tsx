import Link from "next/link";

const programLinks = ["Foundations", "Build", "Private", "Corporate"] as const;
const companyLinks = ["About", "Gallery", "Pricing", "Contact"] as const;
const socialLinks = [
  { label: "Instagram ↗", href: "https://instagram.com" },
  { label: "TikTok ↗", href: "https://tiktok.com" },
  { label: "YouTube ↗", href: "https://youtube.com" },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-volt-line bg-volt-bg-alt px-14 pb-7 pt-16">
      <div className="mb-14 grid grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10">
        {/* Brand column */}
        <div>
          <div className="font-volt-display mb-3 text-[36px] text-volt-ink">
            NLY<span className="text-volt-volt">·</span>FIT
          </div>
          <p className="max-w-[320px] text-[14px] leading-[1.55] text-volt-ink-dim">
            Coach-led strength &amp; conditioning in a 1,200&nbsp;sq&nbsp;ft Akron
            garage. Beginners welcome.
          </p>
        </div>

        {/* Programs */}
        <nav aria-label="Programs">
          <div className="font-volt-mono mb-4 text-[11px] uppercase tracking-[0.16em] text-volt-volt">
            Programs
          </div>
          <ul className="flex flex-col gap-2 list-none m-0 p-0" role="list">
            {programLinks.map((item) => (
              <li key={item}>
                <Link
                  href={`/programs/${item.toLowerCase()}`}
                  className="text-[14px] text-volt-ink no-underline hover:text-volt-volt transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Company */}
        <nav aria-label="Company">
          <div className="font-volt-mono mb-4 text-[11px] uppercase tracking-[0.16em] text-volt-volt">
            Company
          </div>
          <ul className="flex flex-col gap-2 list-none m-0 p-0" role="list">
            {companyLinks.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className="text-[14px] text-volt-ink no-underline hover:text-volt-volt transition-colors"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Newsletter */}
        <div>
          <div className="font-volt-mono mb-4 text-[11px] uppercase tracking-[0.16em] text-volt-volt">
            Newsletter
          </div>
          <p className="mt-0 text-[13px] leading-[1.5] text-volt-ink-dim">
            Get one email a month — training tips, member stories, no spam.
          </p>
          <div className="mt-3.5 flex rounded-full border border-volt-line bg-volt-card p-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="you@email.com"
              className="flex-1 bg-transparent px-3.5 py-2 text-[13px] text-volt-ink outline-none placeholder:text-volt-ink-dim"
            />
            <button className="font-volt-display rounded-full bg-volt-volt px-4 py-2 text-[12px] tracking-[0.06em] text-volt-bg">
              Join ↗
            </button>
          </div>
        </div>
      </div>

      <div className="font-volt-mono flex justify-between border-t border-volt-line pt-[22px] text-[11px] uppercase tracking-[0.08em] text-volt-muted">
        <p className="m-0">© 2026 Next Level You Fitness · Akron OH · Est 2019</p>
        <ul className="flex gap-[18px] list-none m-0 p-0" role="list">
          {socialLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="text-volt-ink-dim no-underline hover:text-volt-volt transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
