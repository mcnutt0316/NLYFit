import Link from "next/link";
import { Archivo, Archivo_Black, JetBrains_Mono } from "next/font/google";

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

export default function Design2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${archivo.variable} ${archivoBlack.variable} ${jetbrainsMono.variable} relative flex min-h-screen flex-col bg-volt-bg text-volt-ink`}
    >
      <Link
        href="/"
        className="font-volt-mono fixed left-4 top-4 z-50 rounded-sm border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur transition-colors hover:border-volt-volt/60 hover:text-volt-volt"
      >
        ← Back to designs
      </Link>
      {children}
    </div>
  );
}
