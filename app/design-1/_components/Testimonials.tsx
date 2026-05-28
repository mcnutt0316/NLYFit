import Eyebrow from './Eyebrow';

const IRON_TESTIMONIALS = [
  {
    quote: 'I lost 38 pounds in eight months. More than that — I learned how to actually train. First time it stuck.',
    name: 'Marcus T.',
    detail: 'Build · 8 months',
  },
  {
    quote: 'I came in scared of barbells. Now I deadlift 235. The coaching is no-ego and the room feels like a team.',
    name: 'Jenna R.',
    detail: 'Foundations → Build · 1yr',
  },
  {
    quote: 'We sent six employees through corporate program. Energy, morale, retention — all measurably up.',
    name: 'David K.',
    detail: 'Corporate · 12 mos',
  },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('');
}

export default function Testimonials() {
  return (
    <section className="border-b border-iron-line bg-iron-panel px-6 py-16 lg:px-14 lg:py-[110px]">
      <div className="flex items-end justify-between mb-14">
        <div>
          <Eyebrow num="03" label="Transformations" />
          <h2 className="font-iron-display text-5xl lg:text-6xl leading-[0.95] tracking-tight text-iron-paper mt-5">
            Receipts, not promises.
          </h2>
        </div>
        <p className="font-iron-mono text-xs text-iron-text-dim tracking-[0.12em] shrink-0 ml-8">
          ★ ★ ★ ★ ★ · 4.9 / 5 · 92 REVIEWS
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {IRON_TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="bg-iron-card border border-iron-line p-8 min-h-[320px] flex flex-col"
          >
            <span
              aria-hidden="true"
              className="font-iron-display text-5xl text-iron-orange leading-[0.8] select-none"
            >
              &ldquo;
            </span>

            <blockquote className="mt-4 flex-1">
              <p className="text-iron-text text-lg leading-relaxed">
                {testimonial.quote}
              </p>
            </blockquote>

            <figcaption className="mt-6 pt-5 border-t border-iron-line flex items-center gap-3.5">
              <div
                aria-hidden="true"
                className="w-11 h-11 rounded-full bg-iron-line flex items-center justify-center shrink-0"
              >
                <span className="font-iron-display text-sm text-iron-text">
                  {getInitials(testimonial.name)}
                </span>
              </div>

              <div>
                <cite className="font-iron-body font-bold text-sm text-iron-text not-italic block">
                  {testimonial.name}
                </cite>
                <p className="font-iron-mono text-[11px] text-iron-text-dim tracking-[0.08em] mt-0.5">
                  {testimonial.detail}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
