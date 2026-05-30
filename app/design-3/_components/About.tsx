import Image from "next/image";

const credentials = [
  { key: "NSCA", value: "Strength & Conditioning Assoc." },
  { key: "PN-1", value: "Precision Nutrition Level 1" },
  { key: "USAW", value: "Sports Performance Coach" },
] as const;

export default function About() {
  return (
    <section className="border-b border-atl-divider bg-atl-bg-dark px-6 lg:px-14 py-[120px] text-atl-paper">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] items-center gap-16">
        {/* Left: coach portrait */}
        <div className="relative">
          <div className="relative aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=1400&q=80&auto=format&fit=crop"
              alt="Coach editorial portrait in warm tones"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-2 font-atl-mono text-[10px] tracking-[0.14em] text-atl-paper">
            FIG. 02 — THE COACH · MAY 2026
          </div>
        </div>

        {/* Right: feature copy */}
        <div>
          <div className="font-atl-mono text-[11px] uppercase tracking-[0.18em] text-atl-gold">
            03 — A Feature on the Coach
          </div>
          <h2 className="font-atl-serif mb-5 mt-5 text-[80px] leading-[1.0] text-atl-paper">
            Six years of
            <br />
            <span className="italic text-atl-gold">showing up.</span>
          </h2>
          <p className="font-atl-serif m-0 text-[21px] leading-[1.45] text-[#d4cfc1]">
            I opened NLY/Fit in a two-car garage in 2019 after watching friends
            quit one big-box gym after another. None of them were lazy. They
            just couldn&rsquo;t get a coach to give a damn.
          </p>
          <p className="font-atl-body mt-[22px] text-[16px] leading-[1.7] text-[#a8a294]">
            We do this differently — small groups, real coaching, real
            progressions. We meet you where you are and we don&rsquo;t move on
            until it actually works. The first question I ask is always the
            same:{" "}
            <em className="text-atl-gold">what do you want?</em>
          </p>

          {/* Credentials strip */}
          <div className="mt-10 grid grid-cols-3 border-t border-[#3a342d]">
            {credentials.map((c, i) => (
              <div
                key={c.key}
                className={`pt-6 ${i < 2 ? "border-r border-[#3a342d] pr-6" : ""}`}
              >
                <div className="font-atl-serif text-[28px] text-atl-gold">
                  {c.key}
                </div>
                <div className="font-atl-mono mt-2 text-[10px] uppercase tracking-[0.12em] text-[#a8a294]">
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
