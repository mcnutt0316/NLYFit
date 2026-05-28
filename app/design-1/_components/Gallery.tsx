import Image from 'next/image';
import Eyebrow from './Eyebrow';

export default function Gallery() {
  return (
    <section className="border-b border-iron-line px-6 py-16 lg:px-14 lg:py-[110px]">
      <div className="flex items-end justify-between mb-14">
        <div>
          <Eyebrow num="04" label="The Garage" />
          <h2 className="font-iron-display text-5xl lg:text-6xl leading-[0.95] tracking-tight mt-5">
            No frills.{' '}
            <span className="text-iron-text-muted">Just iron.</span>
          </h2>
        </div>
        <p className="max-w-xs text-iron-text-dim text-base leading-relaxed font-iron-body">
          Two racks, sled, rower, dumbbells to 100, plenty of platform space.
          Climate-controlled. Free parking.
        </p>
      </div>

      <div className="grid grid-cols-[2fr_1fr_1fr] grid-rows-[240px_240px] gap-3">
        <figure className="row-span-2 relative border border-iron-line overflow-hidden m-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80&auto=format&fit=crop"
            fill
            sizes="(max-width:1024px) 100vw, 50vw"
            className="object-cover"
            alt="Squat rack and lifting platform"
          />
        </figure>

        <figure className="relative border border-iron-line overflow-hidden m-0">
          <Image
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&auto=format&fit=crop"
            fill
            sizes="25vw"
            className="object-cover"
            alt="Dumbbell rack detail"
          />
        </figure>

        <figure className="relative border border-iron-line overflow-hidden m-0">
          <Image
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop"
            fill
            sizes="25vw"
            className="object-cover"
            alt="Coach cueing a client"
          />
        </figure>

        <figure className="relative border border-iron-line overflow-hidden m-0">
          <Image
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=80&auto=format&fit=crop"
            fill
            sizes="25vw"
            className="object-cover"
            alt="Sled conditioning drill"
          />
        </figure>

        <figure className="relative border border-iron-line overflow-hidden m-0">
          <Image
            src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80&auto=format&fit=crop"
            fill
            sizes="25vw"
            className="object-cover"
            alt="Workout of the day whiteboard"
          />
        </figure>
      </div>
    </section>
  );
}
