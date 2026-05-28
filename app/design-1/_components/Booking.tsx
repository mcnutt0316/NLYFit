'use client';

import { useState } from 'react';
import Eyebrow from './Eyebrow';

const DAYS = [
  { label: 'MON', date: 25 },
  { label: 'TUE', date: 26 },
  { label: 'WED', date: 27 },
  { label: 'THU', date: 28 },
  { label: 'FRI', date: 29 },
  { label: 'SAT', date: 30 },
];

const SLOTS = ['6:00A', '7:30A', '12:00P', '4:30P', '6:00P'];

const DAY_FULL_NAMES = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
];

export default function Booking() {
  const [selectedDay, setSelectedDay] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState(2);

  return (
    <section className="border-b border-iron-line bg-iron-bg px-6 py-16 lg:px-14 lg:py-[110px]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-14">

        <div>
          <Eyebrow num="05" label="Book free intro" />

          <h2 className="font-iron-display text-5xl lg:text-6xl leading-[0.95] tracking-tight text-iron-paper mt-5">
            45 minutes.<br />
            <span className="text-iron-orange">Zero pressure.</span>
          </h2>

          <p className="text-iron-text-dim text-base leading-relaxed mt-6 mb-8">
            We&apos;ll talk through what you want, walk the space, run a quick movement
            screen, and you&apos;ll leave with a clear path forward — whether or not you
            sign up.
          </p>

          <ul className="flex flex-col gap-3 font-iron-mono text-sm text-iron-text-dim">
            {[
              '2487 Industrial Pkwy · Akron, OH 44310',
              '(234) 555-0119 · text or call',
              'hello@nlyfit.com',
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <span className="text-iron-orange" aria-hidden="true">↳</span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-iron-panel border border-iron-line p-8">
          <div className="flex justify-between items-center mb-5">
            <span className="font-iron-display text-xl text-iron-text">
              Pick a time
            </span>
            <span className="font-iron-mono text-[11px] text-iron-text-dim tracking-[0.12em]">
              MAY 2026 · WEEK 21
            </span>
          </div>

          <div className="grid grid-cols-6 gap-1.5 mb-2">
            {DAYS.map((day, i) => (
              <button
                key={day.label}
                onClick={() => setSelectedDay(i)}
                className={`py-3 text-center rounded-sm font-iron-mono text-[11px] tracking-[0.08em] transition-colors ${
                  i === selectedDay
                    ? 'bg-iron-orange text-iron-bg'
                    : 'bg-iron-card text-iron-text hover:bg-iron-line'
                }`}
              >
                <span className="block">{day.label}</span>
                <span className="font-iron-display text-lg leading-none mt-1 block">
                  {day.date}
                </span>
              </button>
            ))}
          </div>

          <p className="font-iron-mono text-[11px] text-iron-text-dim tracking-[0.12em] mt-5 mb-2.5">
            {DAY_FULL_NAMES[selectedDay]} · MAY {DAYS[selectedDay].date}
          </p>

          <div className="grid grid-cols-5 gap-1.5">
            {SLOTS.map((slot, i) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(i)}
                className={`py-3.5 font-iron-mono text-xs tracking-[0.06em] rounded-sm transition-colors ${
                  i === selectedSlot
                    ? 'bg-iron-orange text-iron-bg border border-iron-orange'
                    : 'bg-transparent text-iron-text border border-iron-line hover:border-iron-text-dim'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <button className="w-full mt-7 py-[18px] bg-iron-orange text-iron-bg font-iron-body font-bold text-sm tracking-[0.12em] uppercase hover:bg-iron-orange-dim transition-colors">
            Confirm Intro Session →
          </button>
        </div>
      </div>
    </section>
  );
}
