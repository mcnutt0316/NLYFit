export default function Footer() {
  return (
    <footer className="bg-iron-bg px-6 pt-16 pb-8 lg:px-14 lg:pt-[64px] lg:pb-8">
      <div className="flex justify-between items-start mb-14">
        <div>
          <p className="font-iron-display text-[80px] leading-[0.9] tracking-tight text-iron-text">
            NLY<span className="text-iron-orange">/</span>FIT
          </p>
          <p className="font-iron-mono text-[11px] text-iron-text-dim mt-3 tracking-[0.14em] uppercase">
            NEXT LEVEL YOU FITNESS · AKRON, OH
          </p>
        </div>

        <div className="flex gap-14 font-iron-mono text-xs text-iron-text-dim tracking-[0.08em]">
          <nav aria-label="Site navigation">
            <span className="text-iron-text-muted text-[10px] tracking-[0.12em] mb-2.5 block">
              SITE
            </span>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="hover:text-iron-text transition-colors">Programs</a>
              <a href="#" className="hover:text-iron-text transition-colors">About</a>
              <a href="#" className="hover:text-iron-text transition-colors">Gallery</a>
            </div>
          </nav>

          <nav aria-label="Social media links">
            <span className="text-iron-text-muted text-[10px] tracking-[0.12em] mb-2.5 block">
              SOCIAL
            </span>
            <div className="flex flex-col gap-2.5">
              <a href="#" className="hover:text-iron-text transition-colors">Instagram</a>
              <a href="#" className="hover:text-iron-text transition-colors">TikTok</a>
              <a href="#" className="hover:text-iron-text transition-colors">YouTube</a>
            </div>
          </nav>
        </div>
      </div>

      <div className="pt-6 border-t border-iron-line flex justify-between items-center font-iron-mono text-[11px] text-iron-text-muted tracking-[0.08em]">
        <span>© 2026 NEXT LEVEL YOU FITNESS LLC</span>
        <span>MADE IN THE GARAGE</span>
      </div>
    </footer>
  );
}
