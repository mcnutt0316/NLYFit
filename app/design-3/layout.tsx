import Link from "next/link";
import { Instrument_Serif, Archivo, JetBrains_Mono } from "next/font/google";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function Design3Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${instrumentSerif.variable} ${archivo.variable} ${jetbrainsMono.variable} relative flex min-h-screen flex-col bg-atl-paper text-atl-ink`}
    >
      <Link
        href="/"
        className="font-atl-serif fixed left-4 top-4 z-50 text-[16px] italic text-atl-muted no-underline transition-colors hover:text-atl-rust"
      >
        ← Back to designs
      </Link>
      {children}
    </div>
  );
}
