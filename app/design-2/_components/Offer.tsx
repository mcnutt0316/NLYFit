export default function Offer() {
  return (
    <aside className="px-14" aria-label="Introductory offer">
      <div className="relative z-[5] -mt-10 overflow-hidden rounded-[28px] bg-volt-volt px-12 py-14 text-volt-bg">
        {/* darker diagonal slab on the right */}
        <div
          className="absolute right-0 top-0 h-full w-[40%] bg-volt-volt-dim [clip-path:polygon(30%_0,100%_0,100%_100%,0%_100%)]"
          aria-hidden="true"
        />

        <div className="relative grid grid-cols-[1.5fr_1fr] items-center gap-8">
          <div>
            <p className="font-volt-mono mb-3 text-[11px] uppercase tracking-[0.18em] opacity-70">
              Limited · Intro offer
            </p>
            <h2 className="font-volt-display m-0 text-[56px] leading-[0.95]">
              First two weeks free
              <br />
              with any plan.
            </h2>
            <p className="mt-3.5 max-w-[460px] text-[16px] opacity-85">
              No card on file. No commitment. Train with us for 14 days and see if
              we&apos;re a fit. Most clients sign up after week one.
            </p>
          </div>

          <div className="flex flex-col items-end gap-3">
            <button className="font-volt-display flex items-center gap-3 rounded-full bg-volt-bg px-7 py-5 text-[16px] tracking-[0.06em] text-volt-volt">
              Claim Free Weeks{" "}
              <span aria-hidden="true" className="text-lg">↗</span>
            </button>
            <p className="font-volt-mono text-[11px] uppercase tracking-[0.1em] opacity-70">
              Ends June 30, 2026
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
