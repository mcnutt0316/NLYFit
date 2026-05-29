import Image from "next/image";

export default function Gallery() {
  return (
    <section className="border-b border-atl-divider bg-atl-paper-alt px-14 py-[110px]">
      {/* Header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <div className="font-atl-mono text-[11px] uppercase tracking-[0.18em] text-atl-rust">
            06 — Inside the Garage
          </div>
          <h2 className="font-atl-serif m-0 mt-4 text-[88px] leading-[0.98] text-atl-ink">
            The{" "}
            <span className="italic text-atl-rust">room.</span>
          </h2>
        </div>
        <p className="max-w-[280px] text-[15px] leading-[1.6] text-atl-ink-dim">
          Two power racks, sled, rower, dumbbells to 100 lbs, plenty of
          platform space. Climate controlled. Free parking.
        </p>
      </div>

      {/* 6-col / 2-row magazine grid */}
      <div className="grid grid-cols-6 grid-rows-[320px_240px] gap-4">
        {/* Wide hero image — spans 4 cols × 2 rows */}
        <div className="relative col-span-4 row-span-2">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80&auto=format&fit=crop"
            alt="Full room at golden hour"
            fill
            className="object-cover"
            sizes="66vw"
          />
        </div>

        {/* Rack detail — 2 cols × 1 row */}
        <div className="relative col-span-2">
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=80&auto=format&fit=crop"
            alt="Rack and barbell detail"
            fill
            className="object-cover"
            sizes="33vw"
          />
        </div>

        {/* Coach on floor — 1 col × 1 row */}
        <div className="relative col-span-1">
          <Image
            src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?w=1400&q=80&auto=format&fit=crop"
            alt="Coach on the floor"
            fill
            className="object-cover"
            sizes="16vw"
          />
        </div>

        {/* Stat tile — 1 col × 1 row */}
        <div className="col-span-1 flex flex-col justify-between bg-atl-ink p-5">
          <div className="font-atl-mono text-[10px] tracking-[0.14em] text-atl-gold">
            SQ FT
          </div>
          <div className="font-atl-serif text-[64px] leading-[0.9] text-atl-paper">
            1,200
          </div>
        </div>
      </div>
    </section>
  );
}
