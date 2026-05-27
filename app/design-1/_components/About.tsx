import Image from "next/image";
import Eyebrow from "./Eyebrow";

const credentials = [
  { code: "NSCA", description: "Certified Personal Trainer" },
  { code: "PN-1", description: "Precision Nutrition L1" },
  { code: "USAW", description: "Sports Performance Coach" },
] as const;

export default function About() {
  return (
    <section className="border-b border-iron-line px-6 py-16 lg:px-14 lg:py-[110px]">
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">
        <div className="relative">
          <div className="relative aspect-[4/5] border border-iron-line">
            <Image
              src="https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=1400&q=80&auto=format&fit=crop"
              fill
              sizes="(max-width:1024px) 100vw, 45vw"
              className="object-cover"
              alt="Portrait of the NLY/Fit coach in the garage gym."
            />
            <div className="absolute bottom-5 -left-5 bg-iron-bg border border-iron-orange font-iron-mono text-[11px] tracking-[0.16em] text-iron-orange px-5 py-3">
              COACH · NSCA-CPT · PN-1
            </div>
          </div>
        </div>

        <div>
          <Eyebrow num="02" label="About the coach" />

          <h2 className="mt-6 font-iron-display text-5xl lg:text-6xl leading-none tracking-tight text-iron-paper">
            Six years coaching.<br />
            One question first:<br />
            <span className="text-iron-orange">what do you want?</span>
          </h2>

          <div className="flex flex-col gap-4 mt-8">
            <p className="text-iron-text-dim text-lg leading-relaxed">
              I&apos;m not the loudest coach in town and I&apos;m not trying to be. I built NLY/Fit out of a two-car garage in 2019 because the big gyms felt like factories — programs that didn&apos;t fit, coaches who didn&apos;t know your name.
            </p>
            <p className="text-iron-text-dim text-lg leading-relaxed">
              We do it differently here. Real movement. Real progressions. We meet you where you are — first lift or thousandth — and we don&apos;t move on until it actually works.
            </p>
          </div>

          <div className="grid grid-cols-3 mt-11 border-t border-iron-line">
            {credentials.map((cred) => (
              <div
                key={cred.code}
                className="py-6 border-r border-iron-line last:border-r-0"
              >
                <p className="font-iron-display text-2xl text-iron-text">
                  {cred.code}
                </p>
                <p className="font-iron-mono text-[11px] text-iron-text-dim tracking-[0.08em] uppercase mt-1.5">
                  {cred.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
