import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { site } from "@/content/pt";
import { jsonLdGraph } from "@/lib/schema";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/effects/Cursor";
import Spotlight from "@/components/effects/Spotlight";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — desenvolvimento de software, IA e automações`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: true, email: true, address: true },
  // Preencha NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION no .env para validar
  // a propriedade no Google Search Console.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    // Sinaliza abrangência geográfica para buscadores regionais.
    "geo.region": `${site.location.country}-${site.location.stateCode}`,
    "geo.placename": site.location.city || site.location.state,
  },
};

export const viewport: Viewport = {
  themeColor: "#060607",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body className="bg-ink-950 font-sans text-mist-100">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        <SmoothScroll>
          <Spotlight />
          <Cursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
