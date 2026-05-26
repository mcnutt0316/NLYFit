import Link from "next/link";

export default function Design2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-900 shadow-md backdrop-blur transition-colors hover:bg-white"
      >
        ← Back to designs
      </Link>
      {children}
    </div>
  );
}
