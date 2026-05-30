import Image from "next/image";

export default function Gallery() {
  return (
    <section className="border-b border-atl-divider bg-atl-paper-alt px-6 lg:px-14 py-[110px]">
      {/* Header */}
      <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
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

      {/* Magazine grid — stacks on mobile, 6-col on lg+ */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:grid-rows-[320px_240px]">
        {/* Wide hero image — mobile: full width, desktop: 4col × 2row */}
        <div className="relative h-[280px] lg:h-auto lg:col-span-4 lg:row-span-2">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80&auto=format&fit=crop"
            alt="Full room at golden hour"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
        </div>

        {/* Rack detail — mobile: full width, desktop: 2col × 1row */}
        <div className="relative h-[220px] lg:h-auto lg:col-span-2">
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=80&auto=format&fit=crop"
            alt="Rack and barbell detail"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>

        {/* Coach on floor — mobile: full width, desktop: 1col × 1row */}
        <div className="relative h-[220px] lg:h-auto lg:col-span-1">
          <Image
            src="https://images.unsplash.com/photo-1546484475-7f7bd55792da?w=1400&q=80&auto=format&fit=crop"
            alt="Coach on the floor"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 16vw"
          />
        </div>

        {/* Stat tile — desktop only */}
        <div className="hidden lg:flex lg:col-span-1 flex-col justify-between bg-atl-ink p-5">
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
