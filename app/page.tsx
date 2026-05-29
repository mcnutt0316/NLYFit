import Link from "next/link";

const designs = [
  {
    slug: "design-1",
    label: "Design 1",
    description: "Industrial-dark. Bold orange. Built for serious lifters.",
  },
  {
    slug: "design-2",
    label: "Design 2",
    description: "Neon-electric. Data-driven. Wired for performance.",
  },
  {
    slug: "design-3",
    label: "Design 3",
    description: "Editorial luxury. Warm serif. Magazine-grade coaching.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-zinc-950">
      <div className="w-full max-w-5xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            NLYFit
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Pick a design to preview
          </p>
        </header>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {designs.map((design) => (
            <li key={design.slug}>
              <Link
                href={`/${design.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                    {design.label}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {design.description}
                  </p>
                </div>
                <span className="mt-8 inline-flex items-center text-sm font-medium text-zinc-900 dark:text-zinc-50">
                  View preview
                  <span
                    aria-hidden
                    className="ml-1 transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <footer className="mt-16 text-center text-sm text-zinc-500 dark:text-zinc-500">
          Preview site — final pick will be promoted to the homepage
        </footer>
      </div>
    </main>
  );
}
