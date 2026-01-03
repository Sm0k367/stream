import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smoke Stream | Suno Nebula Experience",
  description: "A generative 3D audio-visual journey through the sounds of DJ Smoke Stream.",
  openGraph: {
    title: "Smoke Stream",
    description: "Interactive Suno AI Music Experience",
    images: ["https://cdn1.suno.ai/image_budKYGOsXRPSzUXI.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
