import Link from "next/link";
import { Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";

// Each font exposes its own CSS variable; globals.css maps these variables
// to the iron-* Tailwind tokens (font-iron-display / body / mono).
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function Design1Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${archivo.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} relative flex min-h-screen flex-col bg-iron-bg text-iron-text`}
    >
      <Link
        href="/"
        className="font-iron-mono fixed left-4 top-4 z-50 rounded-sm border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur transition-colors hover:border-iron-orange/60 hover:text-iron-orange"
      >
        ← Back to designs
      </Link>
      {children}
    </div>
  );
}
