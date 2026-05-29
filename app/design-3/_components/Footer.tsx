const footerColumns = [
  {
    heading: "Programs",
    links: ["Foundations", "Build", "Reshape", "Private"],
  },
  {
    heading: "Studio",
    links: ["Philosophy", "The Coach", "Gallery", "Visit"],
  },
  {
    heading: "Follow",
    links: ["Instagram", "TikTok", "YouTube", "Newsletter"],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-atl-bg-dark px-14 pb-7 pt-16 text-atl-paper">
      {/* Giant wordmark */}
      <div className="font-atl-serif mb-8 text-[160px] leading-[0.88]">
        Next Level{" "}
        <span className="italic text-atl-gold">You</span>.
      </div>

      {/* 4-col footer grid */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-8 border-t border-[#3a342d] pt-7">
        {/* Brand column */}
        <div>
          <div className="font-atl-serif text-[22px] italic text-atl-paper">
            A garage gym for people who are done playing around.
          </div>
          <div className="font-atl-mono mt-3.5 text-[11px] leading-[1.7] tracking-[0.08em] text-[#a8a294]">
            2487 Industrial Pkwy
            <br />
            Akron, Ohio 44310
            <br />
            Est. 2019
          </div>
        </div>

        {/* Nav columns */}
        {footerColumns.map(({ heading, links }) => (
          <div key={heading}>
            <div className="font-atl-mono mb-3.5 text-[11px] uppercase tracking-[0.18em] text-atl-gold">
              {heading}
            </div>
            <ul className="m-0 flex list-none flex-col gap-2 p-0" role="list">
              {links.map((item) => (
                <li key={item}>
                  <a className="font-atl-serif text-[18px] text-[#d4cfc1] no-underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="font-atl-mono mt-12 flex justify-between border-t border-[#3a342d] pt-[18px] text-[11px] tracking-[0.08em] text-[#7a7466]">
        <div>© 2026 NEXT LEVEL YOU FITNESS, LLC</div>
        <div>MADE IN AKRON, OH</div>
      </div>
    </footer>
  );
}
