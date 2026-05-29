const navLinks = ["Programs", "Philosophy", "Pricing", "Gallery"] as const;

export default function Nav() {
  return (
    <nav
      className="relative z-[5] grid grid-cols-[1fr_auto_1fr] items-center border-b border-atl-divider px-14 py-6"
      aria-label="Primary navigation"
    >
      {/* Left: italic serif nav links */}
      <ul className="m-0 flex list-none items-center gap-[22px] p-0" role="list">
        {navLinks.map((label) => (
          <li key={label}>
            <a
              href={`#${label.toLowerCase()}`}
              className="font-atl-serif text-[20px] italic text-atl-ink no-underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>

      {/* Center: wordmark */}
      <div className="text-center">
        <div className="font-atl-serif text-[30px] leading-none tracking-[0]">
          Next Level{" "}
          <span className="italic text-atl-rust">You</span>
        </div>
        <div className="font-atl-mono mt-[3px] text-[10px] tracking-[0.2em] text-atl-muted">
          F I T N E S S · A K R O N · 2 0 1 9
        </div>
      </div>

      {/* Right: phone + CTA */}
      <div className="flex items-center justify-end gap-[18px]">
        <span className="font-atl-mono text-[11px] tracking-[0.1em] text-atl-muted">
          (234) 555-0119
        </span>
        <button className="font-atl-body rounded-[2px] bg-atl-ink px-[22px] py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-atl-paper">
          Book a Visit
        </button>
      </div>
    </nav>
  );
}
