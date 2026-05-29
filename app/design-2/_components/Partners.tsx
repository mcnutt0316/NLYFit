const brands = ["ROGUE", "TITAN", "ELEIKO", "NOBULL", "WHOOP", "BARBELL APP"] as const;

export default function Partners() {
  return (
    <aside
      className="flex items-center justify-between gap-6 border-b border-t border-volt-line bg-volt-bg-alt px-14 py-8"
      aria-label="Equipment and partner brands used by our athletes"
    >
      <p className="font-volt-mono max-w-[200px] text-[11px] uppercase leading-tight tracking-[0.16em] text-volt-ink-dim">
        As used by
        <br />
        our athletes ↗
      </p>
      <ul
        className="flex flex-1 items-center justify-around gap-12 list-none m-0 p-0"
        role="list"
      >
        {brands.map((brand) => (
          <li
            key={brand}
            className="font-volt-display text-[22px] tracking-[0.04em] text-volt-ink-dim opacity-65"
          >
            {brand}
          </li>
        ))}
      </ul>
    </aside>
  );
}
